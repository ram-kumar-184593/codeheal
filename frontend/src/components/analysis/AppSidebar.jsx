import { PanelLeftClose } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HistorySidebar } from "@/components/HistorySidebar";

const AppSidebar = ({
  sidebarOpen,
  setSidebarOpen,
  history,
  onSelect,
  onDelete,
}) => {
  return (
    <aside
      className={`
        ${sidebarOpen ? "w-72" : "w-0"}
        transition-all duration-300 overflow-hidden
        backdrop-blur-xl bg-white/5
        border-r border-white/10
        shadow-2xl flex-shrink-0
      `}
    >
      <div className="w-72 h-full flex flex-col">
        <div className="px-5 py-5 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-wide text-white/70 uppercase">
            History
          </h2>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 hover:bg-white/10"
            onClick={() => setSidebarOpen(false)}
          >
            <PanelLeftClose className="h-4 w-4 text-white/70" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <HistorySidebar
            history={history}
            onSelect={onSelect}
            onDelete={onDelete}
          />
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;