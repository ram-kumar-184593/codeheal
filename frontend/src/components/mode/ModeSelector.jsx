import { useNavigate, useLocation } from "react-router-dom";

const modes = [
  { label: "Analyze Error", value: "analyze" },
  { label: "Convert Code", value: "convert" },
  { label: "Explain Code", value: "explain" },
  { label: "Optimize Code", value: "optimize" },
];

export default function ModeSelector() {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract current mode from URL
  const currentMode = location.pathname.split("/").pop();

  return (
    <div className="w-full flex justify-center mb-8">
      <div
        className="
          relative
          flex flex-wrap
          gap-2
          p-2
          rounded-2xl
          bg-white/5
          backdrop-blur-xl
          border border-white/10
          shadow-xl
        "
      >
        {modes.map((item) => {
          const active = currentMode === item.value;

          return (
            <button
              key={item.value}
              onClick={() => navigate(`/app/${item.value}`)}
              className={`
                relative
                px-4 py-2
                text-sm
                rounded-xl
                transition-all
                duration-300
                font-medium
                tracking-wide
                ${active ? "text-white" : "text-white/60 hover:text-white"}
              `}
            >
              {active && (
                <span
                  className="
                    absolute inset-0
                    rounded-xl
                    bg-gradient-to-r
                    from-indigo-500
                    to-purple-500
                    opacity-90
                    -z-10
                    shadow-lg
                  "
                />
              )}

              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}