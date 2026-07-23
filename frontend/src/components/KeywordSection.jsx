import { Tag } from "lucide-react";
import "../styles/results.css";

function KeywordSection({ keywords = [] }) {
  return (
    <section className="result-card">
      <div className="result-card-header">
        <div>
          <span className="result-label">OPTIMIZATION</span>

          <h2>Keywords to include</h2>
        </div>

        <Tag size={20} className="result-icon" />
      </div>

      <p className="result-card-description">
        These keywords appear relevant to the target role and can improve your
        resume's ATS visibility.
      </p>

      <div className="keyword-list">
        {keywords.map((keyword, index) => (
          <span className="keyword-tag" key={index}>
            {keyword}
          </span>
        ))}
      </div>
    </section>
  );
}

export default KeywordSection;
