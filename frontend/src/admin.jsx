import { useEffect, useState } from "react";
import logo from "./assets/logo.jpg"

const AdminDashboard = () => {
  const [logImages, setLogImages] = useState([]);
  const [flaggedImages, setFlaggedImages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/logs");
        const data = await response.json();
        setLogImages(data.log || []);
        setFlaggedImages(data.flagged || []);
      } catch (err) {
        setError("Error fetching images");
      }
    };

    fetchImages();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2>Recognized Faces</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {logImages.map((image, index) => (
          <img key={index} src={`http://127.0.0.1:5000/api/logs/${image}`} alt={image} width="200" />
        ))}
      </div>

      <h2>Flagged Faces</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {flaggedImages.map((image, index) => (
          <img key={index} src={`http://127.0.0.1:5000/api/logs/flagged/${image}`} alt={image} width="200" />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
