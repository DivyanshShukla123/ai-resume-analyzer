import { useRef, useState } from "react";
import { AlertCircle, FileText, Upload, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAnalysis from "../hooks/useAnalysis";
import "../styles/analyze.css";
import AnalysisLoading from "../components/AnalysisLoading";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_DESCRIPTION_LENGTH = 10000;

function Analyze() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const { analyzeResume, loading, error: apiError } = useAnalysis();

  const [resume, setResume] = useState(null);
  const [role, setRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const [isDragging, setIsDragging] = useState(false);
  const [formError, setFormError] = useState("");

                        /* FILE VALIDATION */   

  const validateFile = (file) => {
    if (!file) {
      return "Please select a file.";
    }

    if (file.type !== "application/pdf") {
      return "Only PDF files are allowed.";
    }

    if (file.size > MAX_FILE_SIZE) {
      return "Resume must be smaller than 5 MB.";
    }

    return null;
  };

                        /*SELECT FILE */

  const handleFileSelect = (file) => {
    const validationError = validateFile(file);

    if (validationError) {
      setFormError(validationError);

      return;
    }

    setResume(file);

    setFormError("");
  };

                              /* INPUT CHANGE */

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    handleFileSelect(file);
  };

                         /* DRAG EVENTS */

  const handleDragOver = (event) => {
    event.preventDefault();

    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];

    handleFileSelect(file);
  };

          /*Remove file*/

  const handleRemoveFile = (event) => {
    event.stopPropagation();
    setResume(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

                     /* FORM SUBMISSION */

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    if (!resume) {
      setFormError("Please upload your resume.");
      return;
    }

    if (!role.trim()) {
      setFormError("Please enter your target role.");
      return;
    }

    if (!jobDescription.trim()) {
      setFormError("Please enter the job description.");
      return;
    }

    if (jobDescription.trim().length < 50) {
      setFormError("Job description should contain at least 50 characters.");
      return;
    }

    try {
      const data = await analyzeResume({
        resume,
        role: role.trim(),
        jobDescription: jobDescription.trim(),
      });

      navigate(`/results/${data._id}`);
    } catch (error) {
      console.error("Analysis failed:", error);
    }
  };

  const displayedError = formError || apiError;

  if (loading) {
    return <AnalysisLoading />;
  }
  
  return (
    <main className="analyze-page">
      <div className="container">
        {/* HEADER */}

        <header className="analyze-header fade-up">
          <div className="section-label">
            <FileText size={14} />
            Resume analysis
          </div>

          <h1>
            Find out how ready
            <br />
            you are for your
            <span className="gradient-text">dream role.</span>
          </h1>

          <p>
            Upload your resume and add the job description. Our AI will analyze
            the match and create a personalized preparation plan for you.
          </p>
        </header>

        {/* FORM */}

        <form className="analyze-form-wrapper fade-up" onSubmit={handleSubmit}>
          {/* TOP GRID */}

          <div className="analyze-top-grid">
            {/* RESUME UPLOAD */}

            <div className="form-field">
              <label className="form-label">
                <span>Resume PDF</span>

                <span className="form-label-required">Required</span>
              </label>

              <div
                className={`
                  upload-zone
                  ${isDragging ? "dragging" : ""}
                  ${resume ? "has-file" : ""}
                `}
                onClick={() => {
                  if (!resume) {
                    fileInputRef.current?.click();
                  }
                }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {!resume ? (
                  <>
                    <div className="upload-icon">
                      <Upload size={24} />
                    </div>

                    <h3>Drop your resume here</h3>

                    <p>
                      or click to browse
                      <br />
                      PDF only · Maximum 5 MB
                    </p>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={handleFileChange}
                    />
                  </>
                ) : (
                  <div className="file-preview">
                    <div className="file-icon">
                      <FileText size={20} />
                    </div>

                    <div className="file-details">
                      <p className="file-name">{resume.name}</p>

                      <p className="file-size">
                        {(resume.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>

                    <button
                      type="button"
                      className="remove-file"
                      onClick={handleRemoveFile}
                      aria-label="Remove resume"
                    >
                      <X size={17} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* ROLE */}

            <div className="form-field">
              <label className="form-label">
                <span>Target role</span>

                <span className="form-label-required">Required</span>
              </label>

              <input
                className="form-input"
                type="text"
                placeholder="e.g. MERN Stack Developer"
                value={role}
                onChange={(event) => setRole(event.target.value)}
              />
            </div>
          </div>

          {/* JOB DESCRIPTION */}

          <div className="form-field job-description-field">
            <label className="form-label">
              <span>Job description</span>

              <span className="form-label-required">Required</span>
            </label>

            <textarea
              className="form-textarea"
              placeholder="Paste the complete job description here. The more details you provide, the more accurate your analysis will be."
              value={jobDescription}
              maxLength={MAX_DESCRIPTION_LENGTH}
              onChange={(event) => setJobDescription(event.target.value)}
            />

            <div className="textarea-footer">
              <span>
                Include responsibilities, requirements, and qualifications
              </span>

              <span className="character-count">
                {jobDescription.length}

                {" / "}

                {MAX_DESCRIPTION_LENGTH}
              </span>
            </div>
          </div>

          {/* ERROR */}

          {displayedError && (
            <div className="form-error">
              <AlertCircle size={17} />

              <span>{displayedError}</span>
            </div>
          )}

          {/* SUBMIT */}

          <div className="analyze-submit-area">
            <p className="analyze-submit-note">
              Your analysis is securely processed and automatically deleted
              after 24 hours.
            </p>

            <button
              type="submit"
              className="btn btn-primary analyze-submit-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  Analyzing...
                </>
              ) : (
                <>
                  Analyze my resume
                  <Upload size={17} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Analyze;
