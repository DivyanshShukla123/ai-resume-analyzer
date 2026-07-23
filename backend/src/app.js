import express from "express";
import cors from "cors";
import analysisRoutes from "./routes/analysis.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";
const app = express();

app.use(cors({origin: "http://localhost:5173"}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.json({
    message: "AI Resume Analyzer API is running",
  });
});

app.use("/api/analysis", analysisRoutes);

app.use(errorMiddleware);

export default app;
