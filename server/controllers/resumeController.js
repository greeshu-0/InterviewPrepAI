const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { PDFParse } = require("pdf-parse");
const pool = require("../config/db");
const {
  analyzeResume,
} = require("../services/geminiService");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const parseAnalysis = (analysis) => {
  try {
    const cleanedAnalysis = analysis
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleanedAnalysis);
  } catch (error) {
    return {
      skills: [],
      projects: [],
      experience: [],
    };
  }
};

const uploadResume = (req, res) => {
  upload.single("resume")(req, res, async (err) => {
    if (err) {
      console.error("MULTER ERROR:");
      console.error(err);

      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }

    console.log("REQ.FILE:");
    console.log(req.file);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    try {
      const resumePath = req.file.path;
      const pdfBuffer = fs.readFileSync(resumePath);
      const parser = new PDFParse({ data: pdfBuffer });

      const pdfData = await parser.getText();
      await parser.destroy();

      console.log("PDF TEXT:");
      console.log(pdfData.text);

      const extractedText = pdfData.text;
      const analysis = await analyzeResume(extractedText);

      console.log("ANALYSIS:");
      console.log(analysis);

      console.log("RAW GEMINI RESPONSE:");
      console.log(analysis);

      const parsedAnalysis = parseAnalysis(analysis);

      console.log("PARSED ANALYSIS:");
      console.log(parsedAnalysis);

      const userId = req.user.id;
      await pool.query(
        "INSERT INTO resumes (user_id, resume_url, extracted_data) VALUES (?, ?, ?)",
        [
          userId,
          resumePath,
          JSON.stringify({
            rawText: extractedText,
            analysis: parsedAnalysis,
          }),
        ],
      );
      console.log("REQ.FILE:");
      console.log(req.file);

      console.log("USER:");
      console.log(req.user);
    } catch (dbError) {
      console.error("DB ERROR:");
      console.error(dbError);

      return res.status(500).json({
        success: false,
        message: "Resume uploaded, but failed to save path",
        error: dbError.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      file: req.file,
    });
  });
};

const getMyResumes = async (req, res) => {
  try {
    const userId = req.user.id;

    const [resumes] = await pool.query(
      "SELECT * FROM resumes WHERE user_id = ?",
      [userId],
    );

    res.json({
      success: true,
      resumes,
    });
  } catch (error) {
    console.error("GET MY RESUMES ERROR:");
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getResumeAnalysis = async (req, res) => {
  try {
    const userId = req.user.id;

    const [rows] = await pool.query(
      `SELECT extracted_data
       FROM resumes
       WHERE user_id = ?
       ORDER BY created_at DESC
       LIMIT 1`,
      [userId],
    );

    const extractedData = rows[0]?.extracted_data;
    const parsedData =
      typeof extractedData === "string"
        ? JSON.parse(extractedData)
        : extractedData;

    res.json({
      success: true,
      analysis: parsedData?.analysis || parsedData,
    });
  } catch (error) {
    console.error("GET RESUME ANALYSIS ERROR:");
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  uploadResume,
  getMyResumes,
  getResumeAnalysis,
};
