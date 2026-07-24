export const buildAnalysisPrompt = ({
  resumeText,
  jobDescription,
  role,
}) => {
  return `
You are an expert ATS resume analyzer, technical interviewer,
behavioral interviewer, and career mentor.

Analyze the resume against the target role and job description.

TARGET ROLE:
${role}

JOB DESCRIPTION:
${jobDescription}

RESUME:
${resumeText}

Return ONLY valid JSON.
Do not return markdown.
Do not use code fences.
Do not write any explanation outside the JSON.

Use EXACTLY this structure:

{
  "atsScore": 0,

  "summary": "",

  "technicalQuestions": [
    {
      "question": "",
      "intention": "",
      "modelAnswer": ""
    }
  ],

  "behavioralQuestions": [
    {
      "question": "",
      "intention": "",
      "modelAnswer": ""
    }
  ],

  "keywords": {
    "present": [],
    "missing": [],
    "recommended": []
  },

  "skillGaps": [
    {
      "skill": "",
      "importance": "",
      "reason": ""
    }
  ],

  "roadmap": [
    {
      "skill": "",
      "duration": "",
      "topics": [],
      "resources": []
    }
  ],

  "resumeImprovements": [
    {
      "section": "",
      "suggestion": ""
    }
  ]
}

STRICT RULES:

1. atsScore must be a number between 0 and 100.

2. Generate EXACTLY 10 technical questions.

3. Generate EXACTLY 10 behavioral questions.

4. Each technical question must contain:
   question, intention, and modelAnswer.

5. Each behavioral question must contain:
   question, intention, and modelAnswer.

6. keywords.present must contain keywords already found
   in the resume.

7. keywords.missing must contain important job-related keywords
   absent from the resume.

8. keywords.recommended must contain keywords the candidate
   should consider adding if genuinely relevant.

9. skillGaps must identify important skills missing or weak
   compared to the target job.

10. roadmap must be directly based on the identified skill gaps.

11. Every roadmap item must contain:
    skill, duration, topics, and resources.

12. Do not invent experience, companies, projects,
    achievements, or technologies for the candidate.

13. Return valid JSON only.
`;
};

