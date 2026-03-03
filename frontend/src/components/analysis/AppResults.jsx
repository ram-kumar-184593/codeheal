import { AnalysisCard } from "@/components/AnalysisCard";

const AppResults = ({ currentResult, isAnalyzing }) => {
  if (!currentResult || isAnalyzing) return null;

  if (currentResult.mode === "analyze") {
    return <AnalysisCard result={currentResult} />;
  }

  if (currentResult.mode === "explain") {
    return (
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-xl">
        <h2 className="text-lg font-semibold mb-3">Code Explanation</h2>
        <p className="text-sm text-white/80">
          {currentResult.explanation}
        </p>
      </div>
    );
  }

  if (currentResult.mode === "optimize") {
    return (
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-xl space-y-4">
        <h2 className="text-lg font-semibold">Optimized Code</h2>
        <pre className="bg-black/40 border border-white/10 p-4 rounded-xl text-sm overflow-x-auto">
          {currentResult.optimizedCode}
        </pre>
        <p className="text-sm text-white/60">
          {currentResult.improvements}
        </p>
      </div>
    );
  }

  if (currentResult.mode === "convert") {
    return (
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-xl space-y-4">
        <h2 className="text-lg font-semibold">Converted Code</h2>
        <pre className="bg-black/40 border border-white/10 p-4 rounded-xl text-sm overflow-x-auto">
          {currentResult.convertedCode}
        </pre>
      </div>
    );
  }

  return null;
};

export default AppResults;