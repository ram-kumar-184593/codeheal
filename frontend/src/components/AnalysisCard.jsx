import { Fragment, useState } from "react";
import {
  AlertTriangle,
  Bug,
  Lightbulb,
  Wrench,
  Copy,
  Check,
  Code2,
} from "lucide-react";

const severityColors = {
  low: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  high: "bg-orange-500/10 text-orange-400 border-orange-500/30",
  critical: "bg-red-500/10 text-red-400 border-red-500/30",
};

export function AnalysisCard({ result }) {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    const codeToCopy =
      result.convertedCode ||
      result.correctedCode ||
      result.correctedSourceCode;

    if (codeToCopy) {
      await navigator.clipboard.writeText(codeToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const sections = [
    {
      icon: AlertTriangle,
      title: "What Went Wrong",
      content: result?.whatWentWrong,
    },
    {
      icon: Wrench,
      title: "How to Fix",
      content: result?.howToFix,
    },
  ];

  /* ===========================
     CONVERT MODE
  ============================ */

  if (result.mode === "convert") {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Code Conversion
          </h2>

          <span className="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/70">
            {result.sourceLanguage} → {result.targetLanguage}
          </span>
        </div>

        {/* Converted Code */}
        {result.convertedCode && (
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
              <h3 className="text-sm font-semibold text-white/80">
                Converted Code
              </h3>

              <button
                onClick={copyCode}
                className="flex items-center gap-1 text-xs text-white/50 hover:text-white transition"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            <pre className="p-5 text-sm font-mono text-white/80 overflow-x-auto bg-black/30">
              {result.convertedCode}
            </pre>
          </div>
        )}

        {result.explanation && (
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
            <h3 className="text-sm font-semibold mb-3 text-white/80">
              Explanation
            </h3>

            <p className="text-sm text-white/60 whitespace-pre-wrap">
              {result.explanation}
            </p>
          </div>
        )}
      </div>
    );
  }

  /* ===========================
     EXPLAIN MODE
  ============================ */

  if (result.mode === "explain") {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
          <h3 className="text-sm font-semibold mb-3 text-white/80">
            Code Explanation
          </h3>

          <p className="text-sm text-white/60 whitespace-pre-wrap">
            {result.explanation}
          </p>
        </div>
      </div>
    );
  }

  /* ===========================
     ANALYZE MODE
  ============================ */

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 flex items-center justify-center border border-white/10">
            <Code2 className="h-4 w-4 text-indigo-400" />
          </div>

          <span className="font-mono text-sm text-white/70">
            {result.language || "Unknown"}
          </span>
        </div>

        <span
          className={`text-xs font-medium px-3 py-1 rounded-full border ${
            severityColors[result.severity] || severityColors.medium
          }`}
        >
          {(result.severity || "unknown").toUpperCase()}
        </span>
      </div>

      {/* Info Sections */}
      {sections.map(({ icon: Icon, title, content }) =>
        content ? (
          <div
            key={title}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-center gap-2 mb-3">
              <Icon className="h-4 w-4 text-indigo-400" />
              <h3 className="text-sm font-semibold text-white/80">{title}</h3>
            </div>

            <p className="text-sm text-white/60 whitespace-pre-wrap">
              {content}
            </p>
          </div>
        ) : null,
      )}

      {/* Corrected Code */}
      {result.correctedCode && (
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
            <h3 className="text-sm font-semibold text-white/80">
              Corrected Code
            </h3>

            <button
              onClick={copyCode}
              className="flex items-center gap-1 text-xs text-white/50 hover:text-white transition"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <pre className="p-5 text-sm font-mono text-white/80 overflow-x-auto bg-black/30">
            {result.correctedCode}
          </pre>
        </div>
      )}
    </div>
  );
}
