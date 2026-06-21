const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
  },
});

const analyzeResume = async (resumeText) => {
  const prompt = `
Analyze this resume and return ONLY valid JSON.

Format:
{
  "skills": [],
  "projects": [],
  "experience": []
}

Resume:
${resumeText}
`;

  const result = await model.generateContent(prompt);

  return result.response.text();
};

module.exports = {
  analyzeResume,
};
