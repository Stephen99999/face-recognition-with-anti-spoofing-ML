import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./login";
import Dashboard from "./Dashboard";
import AdminDashboard from "./AdminDashboard";
import Home from "./home";

const App = () => {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (username) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* ✅ Home route */}
        
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/dashboard" element={user ? <Dashboard username={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
