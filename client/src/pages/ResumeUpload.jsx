import { useEffect, useState } from "react";
import axios from "axios";

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    fetchResumes();
    fetchAnalysis();
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

  const fetchAnalysis = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/resume/analysis",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setAnalysis(response.data.analysis);
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
      fetchAnalysis();
    } catch (error) {
      console.error(error);

      alert("Upload Failed");
    }
  };

  const renderAnalysisItems = (items, emptyMessage) => {
    if (!Array.isArray(items) || items.length === 0) {
      return <p className="text-gray-500">{emptyMessage}</p>;
    }

    return (
      <ul className="list-disc pl-5 space-y-2">
        {items.map((item, index) => {
          if (typeof item === "string") {
            return <li key={`${item}-${index}`}>{item}</li>;
          }

          const title = item.title || item.name || item.role || "Item";
          const description =
            item.description || item.summary || item.details || "";

          return (
            <li key={`${title}-${index}`}>
              <span className="font-medium">{title}</span>
              {description && (
                <p className="text-gray-500 mt-1">{description}</p>
              )}
            </li>
          );
        })}
      </ul>
    );
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

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Resume Analysis</h2>

        {!analysis ? (
          <p>No analysis available yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            <div className="p-4 border rounded-lg">
              <h3 className="font-bold mb-3">Skills</h3>

              {renderAnalysisItems(analysis.skills, "No skills found.")}
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="font-bold mb-3">Projects</h3>

              {renderAnalysisItems(analysis.projects, "No projects found.")}
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="font-bold mb-3">Experience</h3>

              {renderAnalysisItems(
                analysis.experience,
                "No experience found.",
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumeUpload;
