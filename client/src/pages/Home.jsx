import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-5 border-b border-slate-800">
        <h1 className="text-2xl font-bold">InterviewPrep AI</h1>

        <div className="flex gap-3 flex-wrap">
          <div className="flex gap-3 flex-wrap">
            {user ? (
              <>
                <span className="px-4 py-2">Welcome {user.name}</span>

                <Link
                  to="/dashboard"
                  className="px-4 py-2 bg-slate-800 rounded-lg"
                >
                  Dashboard
                </Link>
                <Link
                  to="/resume"
                  className="px-4 py-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition"
                >
                  Resume
                </Link>

                <Link
                  to="/interview"
                  className="px-4 py-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition"
                >
                  Interview
                </Link>

                <Link
                  to="/results"
                  className="px-4 py-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition"
                >
                  Results
                </Link>

                <Link
                  to="/history"
                  className="px-4 py-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition"
                >
                  History
                </Link>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 border rounded-lg">
                  Login
                </Link>

                <Link to="/signup" className="px-4 py-2 bg-blue-600 rounded-lg">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 mt-24">
        <h1 className="text-5xl md:text-6xl font-bold max-w-5xl">
          Ace Your Placements with AI-Powered Mock Interviews
        </h1>

        <p className="text-gray-400 text-lg mt-6 max-w-3xl">
          Upload your resume, generate personalized interview questions, receive
          AI-powered feedback, and track your progress throughout your placement
          preparation journey.
        </p>

        <Link
          to="/signup"
          className="mt-10 px-8 py-4 bg-blue-600 rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto mt-24 px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Features</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-900 p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Resume Analysis</h3>

            <p className="text-gray-400">
              Upload your resume and get AI-powered insights on skills,
              projects, strengths, and improvement areas.
            </p>
          </div>

          <div className="bg-slate-900 p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Mock Interviews</h3>

            <p className="text-gray-400">
              Practice technical, behavioral, and project-based interview
              questions tailored to your profile.
            </p>
          </div>

          <div className="bg-slate-900 p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">
              Performance Tracking
            </h3>

            <p className="text-gray-400">
              Analyze scores, identify weak areas, and monitor your progress
              through detailed analytics.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-24 py-8 text-center text-gray-500 border-t border-slate-800">
        © 2026 InterviewPrep AI
      </footer>
    </div>
  );
}

export default Home;
