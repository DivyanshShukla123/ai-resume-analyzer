import { GoogleGenerativeAI } from "@google/generative-ai";

let model;

function getModel() {
  if (!model) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
  }
  return model;
}

export default getModel;
