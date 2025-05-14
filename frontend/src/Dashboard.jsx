import { useState } from "react";
import { ChevronDown, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./Dashboard.css"; // Link to external CSS

const Dashboard = ({ username, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");

  const navItems = ["Dashboard", "Predictions", "Reports"];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1 className="brand-title">HealthPredict</h1>
        </div>
        <nav className="nav-menu">
          <p className="nav-heading">Navigation</p>
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setActiveTab(item)}
              className={`nav-button ${
                activeTab === item ? "active" : ""
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        {/* Navbar */}
        <header className="navbar">
          <motion.h2
            className="navbar-title"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {activeTab}
          </motion.h2>

          {/* Dropdown */}
          <div className="user-dropdown">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="user-button"
            >
              {username}
              <ChevronDown size={18} />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="dropdown-menu"
                >
                  <button
                    onClick={onLogout}
                    className="dropdown-item"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="dashboard-body">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="dashboard-card"
          >
            <h3 className="dashboard-welcome">Welcome, {username}!</h3>
            <p className="dashboard-text">
              You are currently viewing the <strong>{activeTab}</strong> section. Use the
              sidebar to explore prediction tools, generate reports, and manage your data
              seamlessly.
            </p>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
