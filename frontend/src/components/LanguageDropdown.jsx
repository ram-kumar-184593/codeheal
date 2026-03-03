import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const languages = [
  { label: "JavaScript", value: "javascript" },
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "C", value: "c" },
  { label: "C++", value: "cpp" },
  { label: "Go", value: "go" },
  { label: "Rust", value: "rust" },
  { label: "TypeScript", value: "typescript" },
];

function LanguageDropdown({ targetLanguage, setTargetLanguage }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!ref.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const selected =
    languages.find((l) => l.value === targetLanguage)?.label ||
    "Select language";

  return (
    <div ref={ref} className="relative w-full">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="
          w-full
          px-4 py-3
          rounded-2xl
          bg-white/5
          backdrop-blur-xl
          border border-white/10
          flex items-center justify-between
          text-sm
          text-white
          hover:border-indigo-500/40
          focus:outline-none
          focus:ring-2
          focus:ring-indigo-500/40
          transition-all duration-200
        "
      >
        <span className="truncate">{selected}</span>

        <ChevronDown
          className={`w-4 h-4 text-white/50 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      <div
        className={`
          absolute w-full mt-2 z-50
          rounded-2xl
          bg-[#0b1120]/95
          backdrop-blur-xl
          border border-white/10
          shadow-2xl
          overflow-hidden
          transition-all duration-200
          ${
            open
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }
        `}
      >
        {languages.map((lang) => {
          const active = lang.value === targetLanguage;

          return (
            <button
              key={lang.value}
              onClick={() => {
                setTargetLanguage(lang.value);
                setOpen(false);
              }}
              className={`
                w-full text-left
                px-4 py-3
                text-sm
                transition
                ${
                  active
                    ? "bg-indigo-500/20 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }
              `}
            >
              {lang.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default LanguageDropdown;
