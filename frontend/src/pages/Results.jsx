import { ArrowLeft, RotateCcw } from "lucide-react";
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
    return (
      <main className="results-page">
        <div className="results-state">
          <div className="loading-spinner"></div>
          <h2>Analyzing your resume...</h2>
          <p>We are preparing your personalized career insights.</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="results-page">
        <div className="results-state results-state-error">
          <h2>Unable to load analysis</h2>
          <p>{error}</p>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/analyze")}
          >
            Analyze another resume
          </button>
        </div>
      </main>
    );
  }

  if (!analysis) {
    return (
      <main className="results-page">
        <div className="results-state">
          <h2>No analysis found</h2>
          <p>We couldn't find the requested resume analysis.</p>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/analyze")}
          >
            Start a new analysis
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="results-page">
      <div className="results-container">
        {/* HEADER */}

        <header className="results-header">
          <button className="back-button" onClick={() => navigate("/analyze")}>
            <ArrowLeft size={18} />
            Analyze another resume
          </button>

          <div className="results-title-row">
            <div>
              <span className="section-eyebrow">AI RESUME ANALYSIS</span>

              <h1>{analysis.role}</h1>

              <p>Here's how well your resume matches this role.</p>
            </div>

            <div className="results-actions">
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/analyze")}
              >
                <RotateCcw size={17} />
                New analysis
              </button>
            </div>
          </div>
        </header>

        {/* SCORE + SUMMARY */}

        <section className="results-top-grid">
          <ScoreCard
            atsScore={analysis.atsScore}
            scoreBreakdown={analysis.scoreBreakdown}
          />

          <SummaryCard
            summary={analysis.summary}
            strengths={analysis.strengths || []}
            missingSkills={analysis.skillGaps || []}
          />
        </section>

        {/* KEYWORDS */}

        <KeywordSection keywords={analysis.keywords} />

        {/* QUESTIONS */}

        <InterviewQuestions
          technicalQuestions={analysis.technicalQuestions || []}
          behavioralQuestions={analysis.behavioralQuestions || []}
        />

        {/* ROADMAP */}

        <LearningRoadmap roadmap={analysis.roadmap || []} />

        {/* RESUME IMPROVEMENTS */}

        <section className="suggestions-card">
          <div className="section-eyebrow">FINAL RECOMMENDATIONS</div>

          <h2>How to improve your resume</h2>

          <div className="suggestions-list">
            {analysis.resumeImprovements?.map((improvement, index) => (
              <div className="suggestion-item" key={index}>
                <div className="suggestion-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div>
                  <h3>{improvement.section}</h3>

                  <p>{improvement.suggestion}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Results;