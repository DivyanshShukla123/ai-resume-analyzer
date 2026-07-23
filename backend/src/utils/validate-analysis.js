const isArray = (value) => Array.isArray(value);

export const validateAnalysis = (analysis) => {
  const errors = [];

  if (typeof analysis.atsScore !== "number") {
    errors.push("atsScore must be a number");
  }

  if (!analysis.scoreBreakdown) {
    errors.push("scoreBreakdown is missing");
  }

  if (!isArray(analysis.technicalQuestions)) {
    errors.push("technicalQuestions must be an array");
  }

  if (!isArray(analysis.behaviouralQuestions)) {
    errors.push("behaviouralQuestions must be an array");
  }

  if (!isArray(analysis.roadmap)) {
    errors.push("roadmap must be an array");
  }

  if (!isArray(analysis.keywords)) {
    errors.push("keywords must be an array");
  }

  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }

  return true;
};
