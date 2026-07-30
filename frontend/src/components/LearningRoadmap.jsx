import { BookOpen, Clock, ExternalLink } from "lucide-react";
import "../styles/LearningRoadmap.css";
import "../styles/results.css";

function LearningRoadmap({ roadmap = [] }) {
  return (
    <section className="roadmap-section">
      <div className="section-eyebrow">PERSONALIZED PLAN</div>
      <h2>Your learning roadmap</h2>

      <p className="section-description">
        A structured path to close your skill gaps and become a stronger
        candidate.
      </p>

      <div className="roadmap-list">
        {roadmap.map((item, index) => (
          <div className="roadmap-card" key={index}>
            <div className="roadmap-number">
              {String(index + 1).padStart(2, "0")}
            </div>

            <div className="roadmap-content">
              <div className="roadmap-header">
                <h3>{item.skill}</h3>

                {item.duration && (
                  <span className="roadmap-duration">
                    <Clock size={15} />

                    {item.duration}
                  </span>
                )}
              </div>

              {item.topics?.length > 0 && (
                <div className="roadmap-topics">
                  <h4>Topics to learn</h4>

                  <ul>
                    {item.topics.map((topic, topicIndex) => (
                      <li key={topicIndex}>{topic}</li>
                    ))}
                  </ul>
                </div>
              )}

              {item.resources?.length > 0 && (
                <div className="roadmap-resources">
                  <h4>
                    <BookOpen size={16} />
                    Recommended resources
                  </h4>

                  <ul>
                    {item.resources.map((resource, resourceIndex) => (
                      <li key={resourceIndex}>{resource}</li>
                    ))}
                  </ul>
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
