const isArray = (value) => Array.isArray(value);

export const validateAnalysis = (analysis) => {
  const errors = [];

  if (
    typeof analysis.atsScore !== "number" ||
    analysis.atsScore < 0 ||
    analysis.atsScore > 100
  ) {
    errors.push("atsScore must be a number between 0 and 100");
  }

  if (typeof analysis.summary !== "string") {
    errors.push("summary must be a string");
  }

  if (
    !isArray(analysis.technicalQuestions) ||
    analysis.technicalQuestions.length !== 10
  ) {
    errors.push("technicalQuestions must contain exactly 10 questions");
  }

  if (
    !isArray(analysis.behavioralQuestions) ||
    analysis.behavioralQuestions.length !== 10
  ) {
    errors.push("behavioralQuestions must contain exactly 10 questions");
  }

  if (!analysis.keywords) {
    errors.push("keywords is required");
  } else {
    if (!isArray(analysis.keywords.present)) {
      errors.push("keywords.present must be an array");
    }

    if (!isArray(analysis.keywords.missing)) {
      errors.push("keywords.missing must be an array");
    }

    if (!isArray(analysis.keywords.recommended)) {
      errors.push("keywords.recommended must be an array");
    }
  }

  if (!isArray(analysis.skillGaps)) {
    errors.push("skillGaps must be an array");
  }

  if (!isArray(analysis.roadmap)) {
    errors.push("roadmap must be an array");
  }

  if (!isArray(analysis.resumeImprovements)) {
    errors.push("resumeImprovements must be an array");
  }

  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }

  return true;
};
