import { BookOpen, Clock, CheckCircle2 } from "lucide-react";
import "../styles/results.css";

function LearningRoadmap({ roadmap = [] }) {
  return (
    <section className="roadmap-section">
      <div className="section-heading">
        <span className="result-label">PERSONALIZED PLAN</span>

        <h2>Your learning roadmap</h2>

        <p>
          A structured path to close your skill gaps and become a stronger
          candidate.
        </p>
      </div>

      <div className="roadmap">
        {roadmap.map((item, index) => (
          <div className="roadmap-item" key={index}>
            <div className="roadmap-number">
              {String(item.step || index + 1).padStart(2, "0")}
            </div>

            <div className="roadmap-line" />

            <div className="roadmap-content">
              <div className="roadmap-content-header">
                <div>
                  <h3>{item.title}</h3>

                  {item.duration && (
                    <span className="roadmap-duration">
                      <Clock size={13} />

                      {item.duration}
                    </span>
                  )}
                </div>

                <BookOpen size={19} className="result-icon" />
              </div>

              {item.description && <p>{item.description}</p>}

              {item.topics && (
                <div className="roadmap-topics">
                  {item.topics.map((topic, topicIndex) => (
                    <span key={topicIndex}>
                      <CheckCircle2 size={13} />

                      {topic}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default LearningRoadmap;
