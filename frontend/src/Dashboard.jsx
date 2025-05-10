import { useState } from "react";
import { ChevronDown, LogOut } from "lucide-react";

const Dashboard = ({ username, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md border-r hidden md:block">
        <div className="px-6 py-6 border-b">
          <h1 className="text-xl font-bold text-blue-600">HealthPredict</h1>
        </div>
        <nav className="px-6 py-4 space-y-3">
          <p className="text-gray-500 text-sm uppercase font-semibold">Navigation</p>
          <button className="w-full text-left text-gray-700 hover:text-blue-600 transition font-medium">
            Dashboard
          </button>
          <button className="w-full text-left text-gray-700 hover:text-blue-600 transition font-medium">
            Predictions
          </button>
          <button className="w-full text-left text-gray-700 hover:text-blue-600 transition font-medium">
            Reports
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="flex justify-between items-center px-6 py-4 bg-blue-600 text-white shadow-md">
          <h2 className="text-2xl font-semibold">Dashboard</h2>

          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 text-lg focus:outline-none hover:opacity-90 transition"
            >
              {username}
              <ChevronDown size={18} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg w-44 z-10">
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 px-4 py-3 w-full text-left hover:bg-gray-100 transition"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-8 overflow-y-auto bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Welcome, {username}!
              </h3>
              <p className="text-gray-600">
                This is your professional dashboard. Use the navigation menu to
                access prediction tools, view reports, and manage your account.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
