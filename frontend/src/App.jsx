import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./login";
import Dashboard from "./Dashboard";
import AdminDashboard from "./AdminDashboard"

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
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/dashboard" element={user ? <Dashboard username={user} onLogout={handleLogout} /> : <Navigate to="/" />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
