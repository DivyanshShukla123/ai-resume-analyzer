import { CheckCircle2, TrendingUp } from "lucide-react";

import "../styles/results.css";

function ScoreCard({ atsScore = 0, scoreBreakdown = {} }) {
  const {
    skillsMatch = 0,
    experienceMatch = 0,
    keywordMatch = 0,
    formatting = 0,
  } = scoreBreakdown;

  const scoreColor =
    atsScore >= 80
      ? "score-excellent"
      : atsScore >= 60
        ? "score-good"
        : "score-low";

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
          className={`
            score-circle
            ${scoreColor}
          `}
        >
          <div className="score-circle-inner">
            <strong>{atsScore}</strong>    

            <span>/100</span>
          </div>
        </div>

        <div className="score-message">
          <CheckCircle2 size={18} />

          <span>
            {atsScore >= 80
              ? "Strong match"
              : atsScore >= 60
                ? "Good potential"
                : "Needs improvement"}
          </span>
        </div>
      </div>

      <div className="score-breakdown">
        <ScoreItem label="Skills match" value={skillsMatch} />
        <ScoreItem label="Experience match" value={experienceMatch} />
        <ScoreItem label="Keyword match" value={keywordMatch} />
        <ScoreItem label="Formatting" value={formatting} />
      </div>
    </section>
  );
}

function ScoreItem({ label, value }) {
  return (
    <div className="score-item">
      <div className="score-item-header">
        <span>{label}</span>

        <strong>{value}%</strong>
      </div>

      <div className="score-progress">
        <div
          className="score-progress-fill"
          style={{
            width: `${value}%`,
          }}
        />
      </div>
    </div>
  );
}

export default ScoreCard;
