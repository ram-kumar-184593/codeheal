import { useState, useCallback } from "react";
import axios from "@/lib/axios";
import { toast } from "@/hooks/useToast";

export function useAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentResult, setCurrentResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [restoredInput, setRestoredInput] = useState("");
  const [draftCode, setDraftCode] = useState("");

  /* =========================
     ANALYZE
  ========================= */
  const analyze = useCallback(
    async (code, mode = "analyze", targetLanguage = null) => {
      console.log("Sending analyze request:", {
        code,
        mode,
        targetLanguage,
      });
      if (!code.trim()) {
        toast({
          title: "Empty input",
          description: "Please paste some code or an error message.",
          variant: "destructive",
        });
        return;
      }

      setIsAnalyzing(true);
      setCurrentResult(null);

      try {
        const response = await axios.post("/analyze", {
          inputText: code,
          mode: mode,
          targetLanguage: targetLanguage,
        });

        const data = response.data;

        if (!data.success) {
          throw new Error(data.error || "Analysis failed");
        }

        console.log("RESULT FROM BACKEND:", data.result);
        // Show AI result
        setCurrentResult(data.result);

        // 🔥 Always re-fetch from Mongo to keep structure correct
        await fetchHistory();
      } catch (err) {
        console.error("Frontend error:", err);

        toast({
          title: "Analysis failed",
          description:
            err.response?.data?.error || err.message || "Something went wrong.",
          variant: "destructive",
        });
      } finally {
        setIsAnalyzing(false);
      }
    },
    [],
  );

  /* =========================
     FETCH HISTORY
  ========================= */
  const fetchHistory = useCallback(async () => {
    const token = localStorage.getItem("token");

    // Guest mode → no history
    if (!token) {
      setHistory([]);
      return;
    }

    try {
      const response = await axios.get(`${API}/analyze`);

      if (response.data.success) {
        setHistory(response.data.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch history:", err);
    }
  }, []);

  /* =========================
     DELETE ANALYSIS
  ========================= */
  const deleteAnalysis = async (id) => {
    if (!id || id === "undefined") {
      console.error("Invalid delete ID:", id);
      return;
    }

    try {
      await axios.delete(`${API}/analyze/${id}`);

      // Remove instantly from UI
      setHistory((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  //SELECT HISTORY ITEM
const selectHistoryItem = useCallback((item) => {
  if (item.result) {
    setCurrentResult(item.result);
  }
  if (item.inputText) {
    setDraftCode(item.inputText);
  }
}, []);

  /* =========================
     RESET STATE (Logout etc.)
  ========================= */
  const resetAnalysisState = () => {
    setHistory([]);
    setCurrentResult(null);
  };

  return {
    isAnalyzing,
    currentResult,
    history,
    analyze,
    selectHistoryItem,
    fetchHistory,
    deleteAnalysis,
    resetAnalysisState,
    restoredInput,
    draftCode,
    setDraftCode,
  };
}
