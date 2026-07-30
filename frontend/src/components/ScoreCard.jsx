import { CheckCircle2, TrendingUp } from "lucide-react";
import "../styles/results.css";
import "../styles/ScoreCard.css";

function ScoreCard({ atsScore = 0 }) {
  const score = Number(atsScore) || 0;

  const scoreColor =
    score >= 80 ? "score-excellent" : score >= 60 ? "score-good" : "score-low";

  const scoreStatus =
    score >= 80
      ? "Strong match"
      : score >= 60
        ? "Good potential"
        : "Needs improvement";

  const scoreDescription =
    score >= 80
      ? "Your resume is strongly aligned with the requirements of this role."
      : score >= 60
        ? "Your resume is relevant, but a few improvements can make it stronger."
        : "Improve your role-specific skills, keywords, and resume content.";

  return (
    <section className="score-card">
      <div className="score-card-header">
        <div>
          <span className="result-label">ATS COMPATIBILITY</span>

          <h2>Resume Score</h2>
        </div>

        <TrendingUp size={20} className="result-icon" />
      </div>

      <div className="score-main">
        <div
          className={`score-circle ${scoreColor}`}
          style={{
            "--score-angle": `${(score / 100) * 360}deg`,
          }}
        >
          <div className="score-circle-inner">
            <strong>{score}</strong>

            <span>/100</span>
          </div>
        </div>

        <div className="score-message">
          <CheckCircle2 size={18} />

          <span>{scoreStatus}</span>
        </div>

        <p className="score-description">{scoreDescription}</p>
      </div>
    </section>
  );
}

export default ScoreCard;
