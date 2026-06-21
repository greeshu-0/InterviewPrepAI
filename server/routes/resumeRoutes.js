const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  uploadResume,
  getMyResumes,
  getResumeAnalysis,
} = require("../controllers/resumeController");

router.post("/upload", authMiddleware, uploadResume);
router.get("/my-resumes", authMiddleware, getMyResumes);
router.get("/analysis", authMiddleware, getResumeAnalysis);

module.exports = router;
