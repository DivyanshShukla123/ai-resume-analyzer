const parseAIJson = (text) => {
  try {
    // Remove Markdown code blocks

    let cleanedText = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    // Find first JSON object

    const firstBrace = cleanedText.indexOf("{");

    // Find last JSON object

    const lastBrace = cleanedText.lastIndexOf("}");

    if (firstBrace === -1 || lastBrace === -1) {
      throw new Error("No valid JSON object found");
    }

    cleanedText = cleanedText.substring(firstBrace, lastBrace + 1);

    return JSON.parse(cleanedText);
  } catch (error) {
    throw new Error("AI returned invalid JSON");
  }
};

export default parseAIJson;
