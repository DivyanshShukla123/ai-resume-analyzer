import { useState } from "react";
import { analyzeResumeAPI, getAnalysisAPI } from "../api/analysisApi";

function useAnalysis() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  const analyzeResume = async (formData) => {
    try {
      setLoading(true);
      setError(null);

      const result = await analyzeResumeAPI(formData);

      setAnalysis(result);

      return result;
    } catch (error) {
      setError(
        error.response?.data?.message || "Analysis failed. Please try again.",
      );

      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getAnalysis = async (analysisId) => {
    try {
      setLoading(true);
      setError(null);

      const result = await getAnalysisAPI(analysisId);

      setAnalysis(result);
    } catch (error) {
      setError(error.response?.data?.message || "Unable to load analysis.");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,

    analysis,
    analyzeResume,
    getAnalysis,
  };
}

export default useAnalysis;
