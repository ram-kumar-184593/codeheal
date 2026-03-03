import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAnalysis } from "@/components/analysis/useAnalysis";
import AppHeader from "@/components/analysis/AppHeader";
import AppSidebar from "@/components/analysis/AppSidebar";
import { useNavigate } from "react-router-dom";

const AppLayout = () => {
  const analysis = useAnalysis();
  const { history, selectHistoryItem, deleteAnalysis, fetchHistory } = analysis;

  const [sidebarOpen, setSidebarOpen] = useState(true);

  // ✅ Fetch history once here (not in AppCore)
  useEffect(() => {
    fetchHistory();
  }, []);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#0b1120] text-white">
      <AppSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        history={history}
        onSelect={(item) => {
          selectHistoryItem(item);
          if (item.mode) {
            navigate(`/app/${item.mode}`);
          }
        }}
        onDelete={deleteAnalysis}
      />

      <main className="flex-1 flex flex-col min-h-screen">
        <AppHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="flex-1 overflow-y-auto">
          <Outlet context={analysis} />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
