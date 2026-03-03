// import { useEffect, useState } from "react";
// import { useOutletContext } from "react-router-dom";
// import { CodeInput } from "@/components/CodeInput";
// import ModeSelector from "@/components/mode/ModeSelector";
// import LanguageDropdown from "@/components/LanguageDropdown";
// import { AnalyzingLoader } from "@/components/AnalyzingLoader";
// import AppResults from "./AppResults";

// const AppCore = ({ forcedMode }) => {
//   const analysis = useOutletContext();

//   const {
//     isAnalyzing,
//     currentResult,
//     analyze,
//     restoredInput,
//     draftCode,
//     setDraftCode,
//   } = analysis;

//   const [mode, setMode] = useState(forcedMode);
//   const [targetLanguage, setTargetLanguage] = useState("javascript");

//   // ✅ Keep forcedMode sync (like before)
//   useEffect(() => {
//     setMode(forcedMode);
//   }, [forcedMode]);

//   return (
//     <div className="max-w-5xl mx-auto px-8 py-12 space-y-10">
//       <div className="max-w-3xl mx-auto w-full space-y-4">
//         <ModeSelector />

//         {forcedMode === "convert" && (
//           <LanguageDropdown
//             targetLanguage={targetLanguage}
//             setTargetLanguage={setTargetLanguage}
//           />
//         )}
//       </div>

//       <CodeInput
//         onSubmit={(code) => analyze(code, forcedMode, targetLanguage)}
//         isLoading={isAnalyzing}
//         mode={forcedMode}
//         restoredInput={restoredInput}
//         draftCode={draftCode}
//         setDraftCode={setDraftCode}
//       />

//       {isAnalyzing && <AnalyzingLoader />}

//       <AppResults currentResult={currentResult} isAnalyzing={isAnalyzing} />
//     </div>
//   );
// };

// export default AppCore;


import { useOutletContext, useNavigate } from "react-router-dom";
import { CodeInput } from "@/components/CodeInput";
import ModeSelector from "@/components/mode/ModeSelector";
import LanguageDropdown from "@/components/LanguageDropdown";
import { AnalyzingLoader } from "@/components/AnalyzingLoader";
import AppResults from "./AppResults";
import { useState } from "react";

const AppCore = ({ forcedMode }) => {
  const analysis = useOutletContext();
  const navigate = useNavigate();

  const {
    isAnalyzing,
    currentResult,
    analyze,
    draftCode,
    setDraftCode,
  } = analysis;

  const [targetLanguage, setTargetLanguage] = useState("javascript");

  return (
    <div className="max-w-5xl mx-auto px-8 py-12 space-y-10">

      <div className="max-w-3xl mx-auto w-full space-y-4">
        <ModeSelector
          mode={forcedMode}
          setMode={(newMode) => navigate(`/app/${newMode}`)}
        />

        {forcedMode === "convert" && (
          <LanguageDropdown
            targetLanguage={targetLanguage}
            setTargetLanguage={setTargetLanguage}
          />
        )}
      </div>

      <CodeInput
        onSubmit={(code) => analyze(code, forcedMode, targetLanguage)}
        isLoading={isAnalyzing}
        mode={forcedMode}
        draftCode={draftCode}
        setDraftCode={setDraftCode}
      />

      {isAnalyzing && <AnalyzingLoader />}

      <AppResults
        currentResult={currentResult}
        isAnalyzing={isAnalyzing}
      />
    </div>
  );
};

export default AppCore;