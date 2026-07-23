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
    return <main className="results-loading">Loading your analysis...</main>;
  }

  if (error) {
    return (
      <main className="results-error">
        <h2>Unable to load analysis</h2>

        <p>{error}</p>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/analyze")}
        >
          Try again
        </button>
      </main>
    );
  }

  if (!analysis) {
    return null;
  }

  return (
    <main className="results-page">
      <div className="container">
        /* HEADER */

        <header className="results-header">
          <button className="back-button" onClick={() => navigate("/analyze")}>
            <ArrowLeft size={17} />
            Analyze another resume
          </button>

          <div className="results-title-row">
            <div>
              <span className="result-label">AI RESUME ANALYSIS</span>

              <h1>{analysis.role}</h1>

              <p>Here's how well your resume matches this role.</p>
            </div>

            <div className="results-actions">
              <button className="btn btn-secondary">
                <Download size={16} />
                Export report
              </button>

              <button
                className="btn btn-primary"
                onClick={() => navigate("/analyze")}
              >
                <RotateCcw size={16} />
                New analysis
              </button>
            </div>
          </div>
        </header>

        /* SCORE + SUMMARY */

        <div className="results-top-grid">
          <ScoreCard
            atsScore={analysis.atsScore}
            scoreBreakdown={analysis.scoreBreakdown}
          />

          <SummaryCard
            summary={analysis.summary}
            strengths={analysis.strengths}
            missingSkills={analysis.missingSkills}
          />
        </div>

        /* KEYWORDS */

        <KeywordSection keywords={analysis.keywords} />

        /* QUESTIONS */

        <InterviewQuestions
          technicalQuestions={analysis.technicalQuestions}
          behaviouralQuestions={analysis.behaviouralQuestions}
        />

        /* ROADMAP */

        <LearningRoadmap roadmap={analysis.roadmap} />

        /* SUGGESTIONS */

        {analysis.suggestions?.length > 0 && (
          <section className="suggestions-card">
            <span className="result-label">FINAL RECOMMENDATIONS</span>

            <h2>How to improve your resume</h2>

            <div className="suggestions-list">
              {analysis.suggestions.map((suggestion, index) => (
                <div key={index} className="suggestion-item">
                  <span>{index + 1}</span>

                  <p>{suggestion}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default Results;
