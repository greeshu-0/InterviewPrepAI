const multer = require("multer");
const path = require("path");
const pool = require("../config/db");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

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
      const userId = req.user.id;
      await pool.query(
        "INSERT INTO resumes (user_id, resume_url) VALUES (?, ?)",
        [userId, resumePath],
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

module.exports = {
  uploadResume,
  getMyResumes,
};
