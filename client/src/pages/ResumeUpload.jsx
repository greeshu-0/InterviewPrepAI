function ResumeUpload() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold">
        Upload Resume
      </h1>

      <input
        type="file"
        accept=".pdf"
        className="mt-8"
      />

      <button className="block mt-4 px-5 py-2 bg-blue-600 rounded-lg">
        Upload
      </button>
    </div>
  );
}

export default ResumeUpload;