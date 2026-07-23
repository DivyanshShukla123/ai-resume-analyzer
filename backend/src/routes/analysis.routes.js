import express from "express";
import upload from "../middleware/upload.middleware.js";
import {
  analyzeResume,
  getAnalysisById,
} from "../controllers/analysis.controller.js";

const router = express.Router();

router.post("/analyze", upload.single("resume"), analyzeResume);

router.get("/:id", getAnalysisById);

export default router;
