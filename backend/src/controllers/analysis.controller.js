import {extractTextFromPDF} from "../services/pdf.service.js";
import { analyzeResumeWithGemini } from "../services/gemini.service.js";
import Analysis from "../models/analysis.model.js";
import mongoose from "mongoose";

export const analyzeResume = async (req, res) => {
  try {
    const { jobDescription, role } = req.body;

    //const resumeFile = req.file;

    if (!req.file) {             // req.file -> resume
      return res.status(400).json({
        success: false,
        message: "Resume PDF is required"
      });
    }

    if (!jobDescription) {
      return res.status(400).json({
        success: false,
        message: "Job description is required"
      });
    }

    if (!role) {
      return res.status(400).json({
        success: false,
        message: "Target role is required"
      });
    }

    const resumeText = await extractTextFromPDF(
      req.file.buffer
    );

    if (!resumeText || resumeText.trim().length < 80) {
      return res.status(400).json({
        success: false,
        message: "Could not extract enough text from resume"
      });
    }

    const analysis = await analyzeResumeWithGemini({
      resumeText,
      jobDescription,
      role
    });

    const savedAnalysis = await Analysis.create({
      role,
      jobDescription,

      atsScore: analysis.atsScore,
      summary: analysis.summary,

      technicalQuestions: analysis.technicalQuestions,
      behavioralQuestions: analysis.behavioralQuestions,

      keywords: analysis.keywords,
      skillGaps: analysis.skillGaps,
      roadmap: analysis.roadmap,
      resumeImprovements: analysis.resumeImprovements,
    });

    return res.status(201).json({
      success: true,
      message: "Resume analyzed successfully",
      data: {
        savedAnalysis
      },
    });

  } catch (error) {
    console.error("Resume Analysis Error:", error);

    return res.status(500).json({
      success: false,
      message: "Resume analysis failed",
      error: error.message
    });
  }
};

export const getAnalysisById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,

        message: "Invalid analysis ID",
      });
    }
    
    const analysis = await Analysis.findById(id);

    if (!analysis) {
      return res.status(404).json({
        success: false,

        message: "Analysis not found",
      });
    }

    return res.status(200).json({
      success: true,

      data: analysis,
    });
      
  } catch (error) {
    console.error("Get Analysis Error:", error);

    return res.status(500).json({
      success: false,

      message: "Could not fetch analysis",

      error: error.message,
    });
  }
};
