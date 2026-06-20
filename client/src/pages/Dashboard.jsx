import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="min-h-screen p-8">

      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">
          Welcome {user?.name}
        </h1>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-8">
        <div className="border p-6 rounded-xl">
          Total Interviews
        </div>

        <div className="border p-6 rounded-xl">
          Average Score
        </div>

        <div className="border p-6 rounded-xl">
          Best Score
        </div>

        <div className="border p-6 rounded-xl">
          Weak Areas
        </div>
      </div>

    </div>
  );
}

export default Dashboard;