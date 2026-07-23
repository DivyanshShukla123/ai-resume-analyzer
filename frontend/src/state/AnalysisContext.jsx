import { createContext, useState } from "react";

export const AnalysisContext = createContext();

export const AnalysisProvider = ({ children }) => {
  const [analysis, setAnalysis] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  return (
    <AnalysisContext.Provider
      value={{
        analysis,
        setAnalysis,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
};
