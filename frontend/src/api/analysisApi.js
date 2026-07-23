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

  return response.data;
};


export const getAnalysisAPI = async (analysisId) => {
  const response = await API.get(`/analysis/${analysisId}`);

  return response.data;
};
