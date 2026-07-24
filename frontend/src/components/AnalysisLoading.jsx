import {
  Check,
  Circle,
  FileSearch,
  BrainCircuit,
  Map,
  Sparkles,
} from "lucide-react";

import { useEffect, useState } from "react";
import "../styles/analysisLoading.css";

const analysisSteps = [
  {
    id: 1,
    label: "Reading your resume",
    description: "Extracting your experience, skills, and education",
    icon: FileSearch,
  },
  {
    id: 2,
    label: "Comparing job requirements",
    description: "Matching your profile with the target role",
    icon: BrainCircuit,
  },
  {
    id: 3,
    label: "Generating interview questions",
    description: "Creating technical and behavioural questions",
    icon: Sparkles,
  },
  {
    id: 4,
    label: "Building your skill roadmap",
    description: "Finding skill gaps and creating your learning path",
    icon: Map,
  },
];

function AnalysisLoading() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((previousStep) => {
        if (previousStep < analysisSteps.length - 1) {
          return previousStep + 1;
        }

        return previousStep;
      });
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <main className="analysis-loading-page">
      <div className="analysis-loading-container">
        {/* Animated Icon */}

        <div className="loading-orb-wrapper">
          <div className="loading-orb-glow" />
          <div className="loading-orb">
            <Sparkles size={32} />
          </div>
        </div>

        {/* Heading */}

        <h1>
          Analyzing your
          <span className="gradient-text">career profile</span>
        </h1>

        <p className="loading-description">
          Our AI is carefully comparing your resume with the job requirements.
        </p>

        {/* Progress Steps */}

        <div className="analysis-steps">
          {analysisSteps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index < currentStep;
            const isActive = index === currentStep;

            return (
              <div
                key={step.id}
                className={`
                    analysis-step
                    ${isCompleted ? "completed" : ""}
                    ${isActive ? "active" : ""}
                  `}
              >
                {/* Step Icon */}

                <div className="analysis-step-icon">
                  {isCompleted ? (
                    <Check size={17} />
                  ) : isActive ? (
                    <Icon size={17} />
                  ) : (
                    <Circle size={14} />
                  )}
                </div>

                {/* Step Content */}

                <div className="analysis-step-content">
                  <h3>{step.label}</h3>
                  <p>{step.description}</p>
                </div>

                {/* Active Loading */}

                {isActive && (
                  <div className="step-loader">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Note */}

        <div className="analysis-loading-footer">
          <span className="status-dot" />
          This usually takes less than a minute
        </div>
      </div>
    </main>
  );
}

export default AnalysisLoading;
