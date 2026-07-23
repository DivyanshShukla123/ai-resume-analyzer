import { getModel } from "../config/gemini.js";
import { buildAnalysisPrompt } from "../utils/prompt.js";
import { parseAIJson } from "../utils/parse-json.js";

import { validateAnalysis } from "../utils/validate-analysis.js";

export const analyzeResumeWithGemini = async ({
  resumeText,
  jobDescription,
  role,
}) => {
  const prompt = buildAnalysisPrompt({
    resumeText,

    jobDescription,

    role,
  });

  const result = await geminiModel.generateContent(prompt);
  const response = result.response.text();

  const parsedResult = parseAIJson(response);

  validateAnalysis(parsedResult);

  return parsedResult;
};
