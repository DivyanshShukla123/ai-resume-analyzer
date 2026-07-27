import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
});


export const analyzeResumeAPI = async ({ resume, role, jobDescription }) => {
  const formData = new FormData();

  formData.append("resume", resume);
  formData.append("role", role);
  formData.append("jobDescription", jobDescription);

  const response = await API.post("/analysis/analyze", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const savedAnalysis =
    response.data?.data?.savedAnalysis ||
    response.data?.savedAnalysis ||
    response.data?.data;

  if (!savedAnalysis?._id) {
    console.error("Unexpected analysis response:", response.data);

    throw new Error(
      "Analysis was completed, but no analysis ID was returned by the server.",
    );
  }

  return savedAnalysis;
};


export const getAnalysisAPI = async (analysisId) => {
  if (!analysisId || analysisId === "undefined") {
    throw new Error("Invalid analysis ID.");
  }

  const response = await API.get(`/analysis/${analysisId}`);

  return (
    response.data?.data?.savedAnalysis ||
    response.data?.data ||
    response.data?.analysis
  );
};
