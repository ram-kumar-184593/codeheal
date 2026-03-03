import { Link, useNavigate } from "react-router-dom";
import { Zap, PanelLeft, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useAnalysis } from "@/components/analysis/useAnalysis";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AppHeader = ({ sidebarOpen, setSidebarOpen }) => {
  const { user, signOut } = useAuth();
  const { resetAnalysisState } = useAnalysis();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    resetAnalysisState();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 h-16 flex items-center justify-between px-8 backdrop-blur-xl bg-white/5 border-b border-white/10">

      {!sidebarOpen && (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:bg-white/10"
          onClick={() => setSidebarOpen(true)}
        >
          <PanelLeft className="h-4 w-4 text-white/70" />
        </Button>
      )}

      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
          <Zap className="h-4 w-4 text-white" />
        </div>
        <h1 className="text-xl font-semibold tracking-tight">
          Code
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Heal
          </span>
        </h1>
      </div>

      <div className="ml-auto flex items-center gap-2">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-sm font-semibold shadow-lg">
                {user.name?.charAt(0).toUpperCase()}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button variant="outline" size="sm" asChild>
            <Link to="/login">Sign In</Link>
          </Button>
        )}
      </div>
    </header>
  );
};

export default AppHeader;