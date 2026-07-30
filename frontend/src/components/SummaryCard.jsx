import { CheckCircle2, AlertTriangle } from "lucide-react";
import "../styles/SummaryCard.css";
import "../styles/results.css";

function SummaryCard({ summary, strengths = [], missingSkills = [] }) {
  return (
    <section className="summary-card">
      <div className="result-card-header">
        <div>
          <span className="result-label">AI INSIGHTS</span>

          <h2>Profile overview</h2>
        </div>
      </div>

      <p className="summary-text">{summary}</p>

      <div className="insights-grid">
        <div className="insight-column">
          <h3>
            <CheckCircle2 size={17} />
            Your strengths
          </h3>

          <ul>
            {strengths.map((strength, index) => (
              <li key={index}>{strength}</li>
            ))}
          </ul>
        </div>

        <div className="insight-column">
          <h3>
            <AlertTriangle size={17} />
            Skills to improve
          </h3>

          <ul>
            {missingSkills.map((item, index) => (
              <li key={index}>
                {typeof item === "string" ? item : item.skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default SummaryCard;
