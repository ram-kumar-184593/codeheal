import { Loader2 } from "lucide-react";

export function AnalyzingLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-24 animate-in fade-in duration-500">
      {/* Glowing Orb */}
      <div className="relative mb-8">
        {/* Outer Glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 blur-2xl opacity-30 animate-pulse" />

        {/* Glass Circle */}
        <div
          className="
          relative
          h-20 w-20
          rounded-full
          border border-white/10
          bg-white/5
          backdrop-blur-xl
          flex items-center justify-center
          shadow-2xl
        "
        >
          <Loader2 className="h-9 w-9 text-indigo-400 animate-spin" />
        </div>
      </div>

      {/* Main Text */}
      <p className="text-xl font-semibold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
        Analyzing your code…
      </p>

      {/* Subtext */}
      <p className="text-sm text-white/50 mt-2 tracking-wide">
        Detecting language and identifying issues
      </p>

      {/* Subtle animated dots */}
      <div className="flex gap-1 mt-4">
        <span className="h-2 w-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <span className="h-2 w-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <span className="h-2 w-2 bg-indigo-400 rounded-full animate-bounce" />
      </div>
    </div>
  );
}
