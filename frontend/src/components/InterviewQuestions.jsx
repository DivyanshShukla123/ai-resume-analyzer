import { ChevronDown, Code2, MessageCircle } from "lucide-react";
import { useState } from "react";
import "../styles/results.css";

function InterviewQuestions({
  technicalQuestions = [],

  behaviouralQuestions = [],
}) {
  return (
    <section className="questions-section">
      <div className="section-heading">
        <span className="result-label">INTERVIEW PREPARATION</span>

        <h2>Questions you should prepare for</h2>

        <p>Based on your resume and the requirements of the target role.</p>
      </div>

      <QuestionGroup
        title="Technical questions"
        icon={<Code2 size={19} />}
        questions={technicalQuestions}
      />

      <QuestionGroup
        title="Behavioural questions"
        icon={<MessageCircle size={19} />}
        questions={behaviouralQuestions}
      />
    </section>
  );
}

function QuestionGroup({
  title,
  icon,
  questions,
}) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="question-group">
      <div className="question-group-header">
        <div className="question-group-title">
          <div className="question-group-icon">{icon}</div>

          <h3>{title}</h3>
        </div>

        <span className="question-count">{questions.length} questions</span>
      </div>

      <div className="questions-list">
        {questions.map((item, index) => {
          const isOpen = openIndex === index;

          const question = typeof item === "string" ? item : item.question;

          return (
            <div
              className={`
                  question-item
                  ${isOpen ? "open" : ""}
                `}
              key={index}
            >
              <button
                className="question-button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span className="question-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="question-text">{question}</span>

                <ChevronDown
                  size={18}
                  className={`
                      question-chevron
                      ${isOpen ? "rotated" : ""}
                    `}
                />
              </button>

              {isOpen && (
                <div className="question-details">
                  {item.topic && <span>Topic: {item.topic}</span>}

                  {item.difficulty && (
                    <span>Difficulty: {item.difficulty}</span>
                  )}

                  {item.focus && <span>Focus: {item.focus}</span>}
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
