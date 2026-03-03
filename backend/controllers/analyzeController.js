const Analysis = require("../models/Analysis");
const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.OPENAI_API_KEY,
});

function extractValidJSON(text) {
  if (!text) return null;

  try {
    // STEP 1: Extract JSON inside ```json ... ```
    const jsonBlockMatch = text.match(/```json\s*([\s\S]*?)\s*```/i);

    if (jsonBlockMatch && jsonBlockMatch[1]) {
      const cleanJSON = jsonBlockMatch[1].trim();

      return JSON.parse(cleanJSON);
    }

    // STEP 2: fallback — extract from first { to last }
    const first = text.indexOf("{");
    const last = text.lastIndexOf("}");

    if (first !== -1 && last !== -1) {
      const cleanJSON = text.substring(first, last + 1);

      return JSON.parse(cleanJSON);
    }
  } catch (err) {
    console.error("JSON parse failed:", err.message);
    console.log("RAW:", text);

    return null;
  }

  return null;
}

// -----------------------------------------
// MAIN CONTROLLER
// -----------------------------------------
exports.handleAnalysis = async (req, res) => {
  try {
    const { inputText, mode = "analyze", targetLanguage = null } = req.body;

    if (!inputText) {
      return res.status(400).json({
        success: false,
        error: "inputText is required",
      });
    }

    // -----------------------------------------
    // MODE-SPECIFIC PROMPT
    // -----------------------------------------
    let systemPrompt = "";

    if (mode === "analyze") {
      systemPrompt = `
You are a professional code error analyzer.

Return ONLY valid JSON. No text outside JSON.

JSON structure:

{
  "mode": "analyze",
  "language": "",
  "severity": "low | medium | high",
  "issueDetected": "",
  "whatWentWrong": "",
  "whyItHappened": "",
  "howToFix": "",
  "correctedCode": ""
}

Rules:

• Always detect errors
• Always fill issueDetected
• Always fill howToFix
• Always provide correctedCode
• If no errors, explain why code is correct
`;
    } else if (mode === "convert") {
      systemPrompt = `
You are an EXPERT code debugger and code converter.

STRICT TASK ORDER (follow EXACTLY):

STEP 1 — Detect the source language.

STEP 2 — Detect ALL syntax or logical errors in the source code.

STEP 3 — Create the equivalent BROKEN version in the target language (${targetLanguage}).
This must contain the SAME mistake translated into the target language.

STEP 4 — Fix the original source code.

STEP 5 — Convert the FIXED source code into CLEAN, correct ${targetLanguage} code.

STEP 6 — Provide short explanation.


CRITICAL RULES:  
 - ALWAYS convert even if no errors exist. 
 - NEVER return the original code unchanged. 
 - targetLanguage MUST be exactly "${targetLanguage}" 
 - convertedCode MUST be valid ${targetLanguage} 
 - codeWithError MUST show equivalent broken version in target language
 - correctedSourceCode MUST be fixed source version 
 - convertedCode MUST be converted from correctedSourceCode


RETURN ONLY VALID JSON:

{
  "mode": "convert",
  "sourceLanguage": "",
  "targetLanguage": "${targetLanguage}",
  "errorDetected": true,
  "sourceError": {
    "description": "",
    "codeWithError": ""
  },
  "targetErrorEquivalent": {
    "description": "",
    "codeWithError": ""
  },
  "correctedSourceCode": "",
  "convertedCode": "",
  "explanation": ""
}
`;
    } else if (mode === "explain") {
      systemPrompt = `
You are a professional code explainer.

CRITICAL RULES:

Return ONLY valid JSON.
Do NOT return markdown.
Do NOT return explanation outside JSON.

Return EXACT structure:

{
  "mode": "explain",
  "language": "",
  "explanation": ""
}

Explain clearly and professionally.

`;
    } else if (mode === "optimize") {
      systemPrompt = `
You are a professional code optimizer.

STRICT RULES:
- Return ONLY raw JSON.
- Do NOT wrap in markdown.
- Do NOT include explanation outside JSON.
- Do NOT include backticks.
- No extra text.

Return EXACTLY this structure:

{
  "mode": "optimize",
  "language": "<detected language>",
  "optimizedCode": "<optimized code>",
  "improvements": "<what was improved and why>"
}
`;
    }
    // -----------------------------------------
    // CALL GROQ
    // -----------------------------------------
    let aiResponse = "";

    try {
      const completion = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        temperature: 0,
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: inputText,
          },
        ],
      });

      aiResponse = completion?.choices?.[0]?.message?.content || "";
    } catch (error) {
      console.error("GROQ API FAILED:", error.message);

      return res.status(500).json({
        success: false,
        error: "Groq API failed",
      });
    }

    // SAFETY CHECK

    if (!aiResponse) {
      console.error("Empty AI response");

      return res.status(500).json({
        success: false,
        error: "AI returned empty response",
      });
    }
   

    // -----------------------------------------
    // EXTRACT JSON SAFELY
    // -----------------------------------------
    const parsed = extractValidJSON(aiResponse);

    if (!parsed) {
      console.error("Failed to extract JSON");
      console.log("RAW:", aiResponse);

      return res.status(500).json({
        success: false,
        error: "AI returned invalid JSON",
      });
    }

    // -----------------------------------------
    // FORCE CONVERSION VALIDATION (SAFE FIX)
    // -----------------------------------------
    if (mode === "convert") {
      // ensure target language always correct
      parsed.targetLanguage = targetLanguage;

      // ensure convertedCode exists
      if (!parsed.convertedCode || parsed.convertedCode.trim() === "") {
        parsed.convertedCode = parsed.correctedSourceCode || inputText;
      }

      // ensure correctedSourceCode exists
      if (
        !parsed.correctedSourceCode ||
        parsed.correctedSourceCode.trim() === ""
      ) {
        parsed.correctedSourceCode = inputText;
      }

      // ensure sourceError exists
      if (!parsed.sourceError) {
        parsed.sourceError = {
          description: "Error detected in source code",
          codeWithError: inputText,
        };
      }

      // ensure targetErrorEquivalent exists
      if (!parsed.targetErrorEquivalent) {
        parsed.targetErrorEquivalent = {
          description: parsed.sourceError.description || "Equivalent error",
          codeWithError: parsed.convertedCode || inputText,
        };
      }

      // ensure errorDetected exists
      if (parsed.errorDetected === undefined) {
        parsed.errorDetected = true;
      }
    }

    // -----------------------------------------
    // SAVE TO DATABASE
    // -----------------------------------------
    // if (req.user) {
    //   try {
    //     const analysis = new Analysis({
    //       user: req.user.id,

    //       inputText,

    //       detectedLanguage:
    //         parsed.language || parsed.sourceLanguage || "unknown",

    //       correctedCode:
    //         parsed.correctedCode ||
    //         parsed.correctedSourceCode ||
    //         parsed.convertedCode ||
    //         parsed.optimizedCode ||
    //         "",

    //       shortExplanation:
    //         parsed.whatWentWrong ||
    //         parsed.issueDetected ||
    //         parsed.explanation ||
    //         parsed.improvements ||
    //         "",

    //       mode: mode,

    //       result: parsed,
    //     });

    //     await analysis.save();
    //   } catch (dbErr) {
    //     console.error("Mongo save error:", dbErr);
    //   }
    // }


    // -----------------------------------------
// OPTIONAL SAVE (Guest Mode Support)
// -----------------------------------------
const jwt = require("jsonwebtoken");

let userId = null;

const authHeader = req.headers.authorization;

if (authHeader) {
  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    userId = decoded.id;
  } catch (err) {
    userId = null; // invalid token = guest
  }
}

if (userId) {
  try {
    const analysis = new Analysis({
      user: userId,

      inputText,

      detectedLanguage:
        parsed.language || parsed.sourceLanguage || "unknown",

      correctedCode:
        parsed.correctedCode ||
        parsed.correctedSourceCode ||
        parsed.convertedCode ||
        parsed.optimizedCode ||
        "",

      shortExplanation:
        parsed.whatWentWrong ||
        parsed.issueDetected ||
        parsed.explanation ||
        parsed.improvements ||
        "",

      mode: mode,

      result: parsed,
    });

    await analysis.save();
  } catch (dbErr) {
    console.error("Mongo save error:", dbErr);
  }
}
    // -----------------------------------------
    // RETURN RESULT
    // -----------------------------------------

    return res.status(200).json({
      success: true,
      result: {
        ...parsed,
        mode: mode, // move this AFTER spread
      },
    });
  } catch (err) {
    console.error("Analysis controller error:", err);

    return res.status(500).json({
      success: false,

      error: "Server error during analysis",
    });
  }
};
