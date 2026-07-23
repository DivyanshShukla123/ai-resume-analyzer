import pdf from "pdf-parse";

async function extractTextFromPDF(buffer) {
  const data = await pdf(buffer);
  return data.text;
}

export { extractTextFromPDF };
  
// const resumeText = await extractTextFromPDF(req.file.buffer);
