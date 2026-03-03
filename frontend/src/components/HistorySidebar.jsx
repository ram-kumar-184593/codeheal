import { Clock, Code2, Trash2 } from "lucide-react";

export function HistorySidebar({ history, onSelect, onDelete }) {
  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-16 px-6 text-center">
        <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
          <Clock className="h-8 w-8 text-white/30 mx-auto mb-3" />
          <p className="text-sm text-white/60">No history yet</p>
          <p className="text-xs text-white/40 mt-1">
            Your analyses will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 p-3">
      {history.map((item) => (
        <div
          key={item._id}
          onClick={() => onSelect(item)}
          className="
            group
            p-4
            rounded-xl
            border border-white/5
            bg-white/5
            backdrop-blur-lg
            hover:bg-white/10
            hover:border-white/10
            transition-all duration-200
            cursor-pointer
            shadow-sm
            hover:shadow-lg
          "
        >
          <div className="flex items-start justify-between gap-3">
            {/* LEFT CONTENT */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Code2 className="h-4 w-4 text-indigo-400 shrink-0" />

                <p className="text-xs font-semibold truncate text-white/90">
                  {item.shortExplanation || "Analysis"}
                </p>
              </div>

              <p className="text-xs text-white/50 font-mono truncate">
                {item.inputText}
              </p>

              <p className="text-[10px] text-white/30 mt-2">
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleString()
                  : ""}
              </p>
            </div>

            {/* DELETE BUTTON */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(item._id);
              }}
              className="
                opacity-0
                group-hover:opacity-100
                transition
                p-1.5
                rounded-md
                hover:bg-red-500/10
                text-red-400
                shrink-0
              "
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
