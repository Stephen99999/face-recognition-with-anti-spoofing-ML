import { useState } from "react";
import logo from "./assets/logo.jpg"

const Login = ({onLoginSuccess}) => {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

 
  const handleRegister = async () => {
    try {
      setMessage("📝 Registering face... Please wait.");
      
      // Use prompt() to get the name from the user
      const name = prompt("Enter your name:");
      
      // Ensure name is not empty or null
      if (!name) {
        setMessage("❌ Error: Name is required for registration.");
        return;
      }
  
      // Send the name to the Flask API
      const response = await fetch("http://127.0.0.1:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name }), // Send name in request body
      });
  
      const data = await response.json();
      console.log(data);
      setMessage(data.message);
    } catch (error) {
      setMessage("❌ Error: Could not connect to recognition system.");
    }
  };
  

  const handleLogin = async () => {
    try {
      setMessage("🔍 Scanning... Please wait.");
      const response = await fetch("http://127.0.0.1:5000/api/recognize");
      const data = await response.json();
      
      await fetch("http://127.0.0.1:5000/api/acknowledge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ success: true, }),
      });

      if (data.username && data.username !== "unknown") {
        setUsername(data.username);
        setMessage(`✅ Welcome, ${data.username}!`);
        setIsAuthenticated(true);
        if (onLoginSuccess) {  // Ensure it's defined before calling
          onLoginSuccess(data.username);
        }
    
      }
       
      else {
        setUsername("");
        setMessage(data.message);
        setIsAuthenticated(false);
      }
    } catch (error) {
      setMessage("❌ Error: Could not connect to the recognition system.");
      setIsAuthenticated(false);
    }
  };
  

  return (
    <div style={{ display: "flex" }}>
      <div style={{ textAlign: "center", marginTop: "50px", position: "absolute", right: "30px", top: "170px" }}>
        <h1 style={{ fontSize: "42px" }}>AI-Powered <br />Face Recognition System</h1>

        <button
          onClick={handleLogin}
          style={{
            padding: "15px 25px",
            fontSize: "16px",
            marginRight: "10px",
            backgroundColor: isAuthenticated ? "green" : "#007BFF",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {isAuthenticated ? "✅ Logged In" : "Login with Face"}
        </button>

        <button
          onClick={handleRegister}
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

        <p style={{ marginTop: "20px", fontSize: "18px", fontWeight: "bold", color: isAuthenticated ? "green" : "red" }}>
          {message}
        </p>
      </div>

      <div>
        <img src={logo} alt="Face Recognition" style={{ width: "100%", height: "100vh" }} />
      </div>
    </div>
  );
};

export default Login;
