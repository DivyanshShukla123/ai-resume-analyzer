export const buildAnalysisPrompt = ({ resumeText, jobDescription, role }) => {
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

The JSON must follow EXACTLY this structure:

{
  "atsScore": 0,

  "scoreBreakdown": {
    "skillsMatch": 0,
    "experienceMatch": 0,
    "keywordMatch": 0,
    "formatting": 0
  },

  "summary": "",

  "strengths": [],

  "missingSkills": [
    {
      "skill": "",
      "importance": "High",
      "reason": ""
    }
  ],

  "keywords": [],

  "technicalQuestions": [
    {
      "question": "",
      "topic": "",
      "difficulty": "Easy"
    }
  ],

  "behaviouralQuestions": [
    {
      "question": "",
      "focus": ""
    }
  ],

  "roadmap": [
    {
      "step": 1,
      "title": "",
      "duration": "",
      "description": "",
      "topics": []
    }
  ],

  "suggestions": []
}

STRICT RULES:

1. atsScore must be a number from 0 to 100.

2. Every scoreBreakdown value must be between 0 and 100.

3. Generate EXACTLY 10 technical questions.

4. Generate EXACTLY 10 behavioural questions.

5. Technical questions must be based on:
   - the target role
   - the job description
   - technologies mentioned in the resume
   - technologies missing from the resume but required by the job

6. Behavioural questions must be relevant to the candidate's
   experience, projects, education, and target role.

7. Generate relevant ATS keywords from the job description.

8. Identify important skills that are missing or weak in the resume.

9. Create a practical learning roadmap based specifically
   on the missingSkills.

10. Do not invent experience, companies, projects, or achievements.

11. Return valid JSON only.
`;
};
