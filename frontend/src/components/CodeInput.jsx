import { useState, useEffect } from "react";
import { Send, Terminal, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CodeInput({
  onSubmit,
  isLoading,
  mode,
  restoredInput,
  draftCode,
  setDraftCode,
}) {
  // const [code, setCode] = useState("");

  // useEffect(() => {
  //   if (restoredInput) {
  //     setCode(restoredInput);
  //   }
  // }, [restoredInput]);
  useEffect(() => {
    if (restoredInput) {
      setDraftCode(restoredInput);
    }
  }, [restoredInput]);

  const handleSubmit = () => {
    if (draftCode.trim()) {
      onSubmit(draftCode);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const modeLabelMap = {
    analyze: "Analyze",
    convert: "Convert",
    explain: "Explain",
    optimize: "Optimize",
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div
        className="
        relative
        rounded-2xl
        border border-white/10
        bg-white/5
        backdrop-blur-xl
        shadow-2xl
        transition-all duration-300
        hover:shadow-indigo-500/10
      "
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10">
          <Terminal className="h-4 w-4 text-indigo-400" />
          <span className="text-xs font-mono text-white/60 tracking-wide">
            Paste code, error, or stack trace — any language
          </span>
        </div>

        {/* Textarea */}
        <textarea
          value={draftCode}
          onChange={(e) => setDraftCode(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`// Paste your code or error here...

Examples:
- A Python traceback
- A JavaScript TypeError
- A SQL query that won't run
- Any code snippet with a bug`}
          className="
            w-full
            min-h-[240px]
            p-5
            bg-transparent
            font-mono
            text-sm
            text-white
            placeholder:text-white/30
            resize-y
            focus:outline-none
            focus:ring-0
          "
          disabled={isLoading}
        />

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-white/10 bg-black/20 rounded-b-2xl">
          <span className="text-xs text-white/50">
            Enter to {modeLabelMap[mode].toLowerCase()} • Shift+Enter for new
            line
          </span>

          <Button
            onClick={handleSubmit}
            disabled={isLoading || !draftCode.trim()}
            className="
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-indigo-500
              to-purple-500
              hover:from-indigo-600
              hover:to-purple-600
              text-white
              shadow-lg
              transition-all
              duration-200
              hover:scale-[1.03]
              active:scale-[0.97]
            "
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {modeLabelMap[mode]}…
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                {modeLabelMap[mode]}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
