import { useEffect, useState } from "react";
import axios from "axios";

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/resume/my-resumes",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setResumes(response.data.resumes);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a resume first");
      return;
    }

    const formData = new FormData();

    formData.append("resume", file);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/resume/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert(response.data.message);
      fetchResumes();
    } catch (error) {
      console.error(error);

      alert("Upload Failed");
    }
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold">Upload Resume</h1>

      <form onSubmit={handleSubmit} className="mt-8">
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          type="submit"
          className="block mt-4 px-5 py-2 bg-blue-600 rounded-lg"
        >
          Upload
        </button>
      </form>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">My Uploaded Resumes</h2>

        {resumes.length === 0 ? (
          <p>No resumes uploaded yet.</p>
        ) : (
          <div className="space-y-3">
            {resumes.map((resume) => (
              <div key={resume.id} className="p-4 border rounded-lg">
                <p>Resume #{resume.id}</p>

                <a
                  href={`http://localhost:5000/${resume.resume_url.replace(/\\/g, "/")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 underline"
                >
                  Open Resume
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumeUpload;
