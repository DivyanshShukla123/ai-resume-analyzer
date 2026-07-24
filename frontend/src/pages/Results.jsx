import { ArrowLeft, Download, RotateCcw } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import ScoreCard from "../components/ScoreCard";
import SummaryCard from "../components/SummaryCard";
import KeywordSection from "../components/KeywordSection";
import InterviewQuestions from "../components/InterviewQuestions";
import LearningRoadmap from "../components/LearningRoadmap";
import useAnalysis from "../hooks/useAnalysis";
import "../styles/results.css";


function Results() {
  const navigate = useNavigate();
  const { analysisId } = useParams();
  const { analysis, loading, error, getAnalysis } = useAnalysis();

  useEffect(() => {
    if (analysisId) {
      getAnalysis(analysisId);
    }
  }, [analysisId]);

  if (loading) {
    return <div className="results-loading">Loading your analysis...</div>;
  }

  if (error) {
    return (
      <div className="results-error">
        <h2>Unable to load analysis</h2>

        <p>{error}</p>

        <button onClick={() => navigate("/analyze")}>Try again</button>
      </div>
    );
  }

  if (!analysis) {
    return null;
  }

  return (
    <main className="results-page">
      <header className="results-header">
        <button className="back-button" onClick={() => navigate("/analyze")}>
          <ArrowLeft size={18} />
          Analyze another resume
        </button>

        <div className="results-heading">
          <span className="section-eyebrow">AI RESUME ANALYSIS</span>

          <h1>{analysis.role}</h1>

          <p>Here's how well your resume matches this role.</p>
        </div>

        <button
          className="new-analysis-button"
          onClick={() => navigate("/analyze")}
        >
          <RotateCcw size={17} />
          New analysis
        </button>
      </header>

      <section className="score-summary-grid">
        <ScoreCard score={analysis.atsScore} />

        <SummaryCard summary={analysis.summary} />
      </section>

      <KeywordSection keywords={analysis.keywords} />

      <InterviewQuestions
        technicalQuestions={analysis.technicalQuestions}
        behavioralQuestions={analysis.behavioralQuestions}
      />

      <LearningRoadmap roadmap={analysis.roadmap} />

      <section className="improvements-section">
        <div className="section-eyebrow">FINAL RECOMMENDATIONS</div>

        <h2>How to improve your resume</h2>

        <div className="improvements-list">
          {analysis.resumeImprovements?.map((improvement, index) => (
            <div className="improvement-card" key={index}>
              <span>{improvement.section}</span>

              <p>{improvement.suggestion}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Results;
