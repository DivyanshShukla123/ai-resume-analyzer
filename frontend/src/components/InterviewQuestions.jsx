import { ChevronDown, Code2, MessageCircle } from "lucide-react";
import { useState } from "react";
import "../styles/InterviewQuestions.css";
import "../styles/results.css";

function InterviewQuestions({
  technicalQuestions = [],
  behavioralQuestions = [],
}) {
  return (
    <section className="interview-section">
      <div className="section-eyebrow">INTERVIEW PREPARATION</div>

      <h2>Questions you should prepare for</h2>

      <p className="section-description">
        Based on your resume and the requirements of the target role.
      </p>

      <QuestionGroup
        title="Technical Questions"
        icon={<Code2 size={20} />}
        questions={technicalQuestions}
      />

      <QuestionGroup
        title="Behavioral Questions"
        icon={<MessageCircle size={20} />}
        questions={behavioralQuestions}
      />
    </section>
  );
}

function QuestionGroup({ title, icon, questions }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="question-group">
      <div className="question-group-header">
        <div className="question-group-title">
          {icon}

          <h3>{title}</h3>
        </div>

        <span>{questions.length} questions</span>
      </div>

      <div className="questions-list">
        {questions.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              className={`question-card ${isOpen ? "question-card-open" : ""}`}
              key={index}
            >
              <button
                className="question-button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span className="question-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="question-text">{item.question}</span>

                <ChevronDown
                  size={18}
                  className={isOpen ? "rotate-icon" : ""}
                />
              </button>

              {isOpen && (
                <div className="question-answer">
                  <div className="question-meta">
                    <strong>What this tests</strong>

                    <p>{item.intention}</p>
                  </div>

                  <div className="model-answer">
                    <strong>Model Answer</strong>

                    <p>{item.modelAnswer}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default InterviewQuestions;
