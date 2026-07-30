import { CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import "../styles/KeywordSection.css";
import "../styles/results.css";

function KeywordSection({ keywords = {} }) {
  return (
    <section className="keyword-section">
      <div className="section-eyebrow">OPTIMIZATION</div>
      <h2>Keyword analysis</h2>

      <p className="section-description">
        Compare the keywords already present in your resume with the skills
        required for your target role.
      </p>

      <div className="keyword-columns">
        <KeywordGroup
          title="Present"
          icon={<CheckCircle2 size={18} />}
          keywords={keywords.present}
          className="keyword-present"
        />

        <KeywordGroup
          title="Missing"
          icon={<AlertCircle size={18} />}
          keywords={keywords.missing}
          className="keyword-missing"
        />

        <KeywordGroup
          title="Recommended"
          icon={<Sparkles size={18} />}
          keywords={keywords.recommended}
          className="keyword-recommended"
        />
      </div>
    </section>
  );
}

function KeywordGroup({ title, icon, keywords = [], className }) {
  return (
    <div className={`keyword-group ${className}`}>
      <div className="keyword-group-title">
        {icon}

        <h3>{title}</h3>
      </div>

      <div className="keyword-list">
        {keywords.map((keyword, index) => (
          <span className="keyword-pill" key={index}>
            {keyword}
          </span>
        ))}
      </div>
    </div>
  );
}

export default KeywordSection;
