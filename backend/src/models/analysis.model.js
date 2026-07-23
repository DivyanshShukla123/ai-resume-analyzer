import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    question: String,
    intention: String,
    modelAnswer: String,
  },
  { _id: false },
);

const skillGapSchema = new mongoose.Schema(
  {
    skill: String,
    importance: String,
    reason: String,
  },
  { _id: false },
);

const roadmapSchema = new mongoose.Schema(
  {
    skill: String,
    duration: String,
    topics: [String],
    resources: [String],
  },
  { _id: false },
);

const improvementSchema = new mongoose.Schema(
  {
    section: String,
    suggestion: String,
  },
  { _id: false },
);

const analysisSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
    },

    jobDescription: {
      type: String,
      required: true,
    },

    atsScore: {
      type: Number,
      required: true,
    },

    summary: String,

    technicalQuestions: [questionSchema],

    behavioralQuestions: [questionSchema],

    keywords: {
      present: [String],
      missing: [String],
      recommended: [String],
    },

    skillGaps: [skillGapSchema],

    roadmap: [roadmapSchema],

    resumeImprovements: [improvementSchema],

    createdAt: {
      type: Date,
      default: Date.now,
      expires: 86400,
    },
  },
  {
    timestamps: true,
  },
);

const Analysis = mongoose.model("Analysis", analysisSchema);

export default Analysis;
