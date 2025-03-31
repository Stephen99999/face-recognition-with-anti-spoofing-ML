import { useState } from "react";
import { ChevronDown, LogOut } from "lucide-react";

const Dashboard = ({ username, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-blue-600 text-white shadow-md">
        <h2 className="text-2xl font-semibold">Dashboard</h2>

        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 text-lg focus:outline-none hover:opacity-80 transition"
          >
            {username}
            <ChevronDown size={18} />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-lg w-40 overflow-hidden">
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-3 w-full text-left hover:bg-gray-100 transition"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="flex flex-1 justify-center items-center">
        <h3 className="text-2xl font-medium text-gray-800">Welcome, {username}!</h3>
      </div>
    </div>
  );
};

export default Dashboard;