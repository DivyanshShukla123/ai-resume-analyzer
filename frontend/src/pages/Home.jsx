import {
  ArrowRight,
  BrainCircuit,
  FileText,
  Target,
  TrendingUp,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import "../styles/home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <main className="home-page">

      <section className="hero-section">

        <div className="hero-glow hero-glow-one"></div>

        <div className="hero-glow hero-glow-two"></div>

        <div className="container hero-container">
          <div className="hero-content fade-up">
            <div className="section-label">
              <BrainCircuit size={14} />
              AI-powered career intelligence
            </div>

            <h1 className="hero-title">
              Turn your resume into
              <br />
              your
              <span className="gradient-text">interview advantage.</span>
            </h1>

            <p className="hero-description">
              Get a clear picture of how your resume matches your dream role.
              Discover your ATS score, prepare for interviews, identify missing
              skills, and follow a personalized learning roadmap.
            </p>

            <div className="hero-actions">
              <button
                className="btn btn-primary hero-button"
                onClick={() => navigate("/analyze")}
              >
                Analyze my resume
                <ArrowRight size={18} />
              </button>

              <span className="hero-note">
                No account required · Free to try
              </span>
            </div>
          </div>


          <div className="hero-visual float">
            <div className="analysis-preview glass-card">
              <div className="preview-header">
                <div>
                  <span className="preview-label">RESUME ANALYSIS</span>

                  <h3>Software Engineer</h3>
                </div>

                <div className="preview-score">
                  87
                  <span>/100</span>
                </div>
              </div>

              <div className="score-progress">
                <div className="score-progress-fill"></div>
              </div>

              <div className="preview-items">
                <div className="preview-item">
                  <div className="preview-item-icon">
                    <Target size={16} />
                  </div>

                  <div>
                    <strong>Strong role match</strong>

                    <span>12 relevant skills detected</span>
                  </div>
                </div>

                <div className="preview-item">
                  <div className="preview-item-icon">
                    <FileText size={16} />
                  </div>

                  <div>
                    <strong>Interview ready</strong>

                    <span>20 personalized questions</span>
                  </div>
                </div>

                <div className="preview-item">
                  <div className="preview-item-icon">
                    <TrendingUp size={16} />
                  </div>

                  <div>
                    <strong>Growth roadmap</strong>

                    <span>3 skills to strengthen</span>
                  </div>
                </div>
              </div>

              <div className="preview-tags">
                <span>React</span>

                <span>Node.js</span>

                <span>MongoDB</span>

                <span>REST APIs</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="features-section">
        <div className="container">
          <div className="features-header">
            <p className="section-label">Everything you need</p>

            <h2>
              From resume upload
              <br />
              to
              <span className="gradient-text">career clarity.</span>
            </h2>
          </div>

          <div className="features-grid">
            <FeatureCard
              icon={<Target size={22} />}
              title="ATS Score"
              description="Understand how well your resume matches the job description and where you stand."
            />

            <FeatureCard
              icon={<BrainCircuit size={22} />}
              title="Interview Questions"
              description="Practice 10 technical and 10 behavioral questions tailored to your experience."
            />

            <FeatureCard
              icon={<TrendingUp size={22} />}
              title="Skill Roadmap"
              description="Discover missing skills and get a personalized roadmap to become job-ready."
            />
          </div>
        </div>
      </section>


      <section className="cta-section">
        <div className="container">
          <div className="cta-card glass-card">
            <div>
              <p className="section-label">Your next opportunity starts here</p>

              <h2>
                Ready to see where
                <br />
                you stand?
              </h2>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => navigate("/analyze")}
            >
              Get started
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>

      <h3>{title}</h3>

      <p>{description}</p>
    </div>
  );
}

export default Home;
