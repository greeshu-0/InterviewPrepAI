function Interview() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">
        Interview Room
      </h1>

      <div className="mt-8 border p-6 rounded-xl">
        Explain JWT Authentication.
      </div>

      <textarea
        rows="8"
        placeholder="Your answer..."
        className="w-full border mt-6 p-4 rounded-xl"
      />

      <button className="mt-4 px-5 py-2 bg-green-600 rounded-lg">
        Submit Answer
      </button>
    </div>
  );
}

export default Interview;