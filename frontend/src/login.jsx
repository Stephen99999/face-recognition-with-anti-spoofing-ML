import { useState } from "react";
import logo from "./assets/logo.jpg";

// Custom modal component for entering name
const CustomPrompt = ({ onSubmit, onClose }) => {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (name.trim()) {
      onSubmit(name);
    } else {
      alert("❌ Error: Name is required for registration.");
    }
  };

  return (
    <div style={modalContainerStyles}>
      <div style={modalBoxStyles}>
        <h2>Enter Your Name</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyles}
        />
        <div>
          <button onClick={handleSubmit} style={buttonStyles}>
            Submit
          </button>
          <button
            onClick={onClose}
            style={{ ...buttonStyles, marginLeft: "10px" }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const Login = ({ onLoginSuccess }) => {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPromptVisible, setPromptVisible] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleRegister = async (name) => {
    try {
      setMessage("📝 Registering face... Please wait.");

      const response = await fetch("http://127.0.0.1:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name }),
      });

      const data = await response.json();
      console.log(data);
      setMessage(data.message);
      setPromptVisible(false);
    } catch (error) {
      setMessage("❌ Error: Could not connect to recognition system.");
    }
  };

  const handleLogin = async () => {
    setIsAuthenticating(true);
    setMessage("🔍 Authenticating... Please wait.");
    let attempts = 0;
    const maxAttempts = 3;
    let success = false;

    while (attempts < maxAttempts && !success) {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/recognize");
        const data = await response.json();

        await fetch("http://127.0.0.1:5000/api/acknowledge", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ success: true }),
        });

        if (data.username && data.username !== "unknown") {
          setUsername(data.username);
          setMessage(`✅ Welcome, ${data.username}!`);
          setIsAuthenticated(true);
          success = true;
          if (onLoginSuccess) {
            onLoginSuccess(data.username);
          }
          break;
        } else {
          setMessage(`❌ Attempt ${attempts + 1} failed.`);
          await new Promise((resolve) => setTimeout(resolve, 1500));
        }
      } catch (error) {
        setMessage(`⚠️ Attempt ${attempts + 1} error: Network issue.`);
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
      attempts++;
    }

    if (!success) {
      setMessage("❌ Authentication failed after 3 attempts.");
      setIsAuthenticated(false);
    }

    // Keep button disabled even after failure.
  };

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          textAlign: "center",
          marginTop: "50px",
          position: "absolute",
          right: "30px",
          top: "170px",
        }}
      >
        <h1 style={{ fontSize: "42px" }}>
          AI-Powered <br /> Face Recognition System
        </h1>

        <button
          onClick={handleLogin}
          disabled={isAuthenticating || isAuthenticated}
          style={{
            padding: "15px 25px",
            fontSize: "16px",
            marginRight: "10px",
            backgroundColor: isAuthenticated ? "green" : "#007BFF",
            color: "white",
            border: "none",
            cursor:
              isAuthenticating || isAuthenticated ? "not-allowed" : "pointer",
          }}
        >
          {isAuthenticated
            ? "✅ Logged In"
            : isAuthenticating
            ? "Authenticating..."
            : "Login with Face"}
        </button>

        <button
          onClick={() => setPromptVisible(true)}
          style={{
            padding: "15px 25px",
            fontSize: "16px",
            backgroundColor: "#28A745",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Register Face
        </button>

        <p
          style={{
            marginTop: "20px",
            fontSize: "18px",
            fontWeight: "bold",
            color: isAuthenticated ? "green" : "red",
          }}
        >
          {message}
        </p>
      </div>

      <div>
        <img
          src={logo}
          alt="Face Recognition"
          style={{ width: "100%", height: "100vh" }}
        />
      </div>

      {isPromptVisible && (
        <CustomPrompt
          onSubmit={handleRegister}
          onClose={() => setPromptVisible(false)}
        />
      )}
    </div>
  );
};

// Modal Styles
const modalContainerStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalBoxStyles = {
  backgroundColor: "#213547",
  padding: "10px",
  borderRadius: "8px",
  textAlign: "center",
  width: "300px",
};

const inputStyles = {
  padding: "10px",
  width: "80%",
  margin: "10px 0",
  border: "1px solid #ccc",
  borderRadius: "5px",
};

const buttonStyles = {
  padding: "10px 20px",
  backgroundColor: "#28A745",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default Login;
