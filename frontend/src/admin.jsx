import { useEffect, useState } from "react";
import logo from "./assets/logo.jpg";

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
        setError("❌ Error fetching images");
      }
    };

    fetchImages();
  }, []);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <h1 style={styles.title}>Admin Dashboard</h1>
      </header>

      {error && <p style={styles.error}>{error}</p>}

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>✅ Recognized Faces</h2>
        <div style={styles.imageGrid}>
          {logImages.length > 0 ? (
            logImages.map((image, index) => (
              <div key={index} style={styles.imageCard}>
                <img
                  src={`http://127.0.0.1:5000/api/logs/${image}`}
                  alt={`Log ${index}`}
                  style={styles.image}
                />
                <p style={styles.caption}>{image}</p>
              </div>
            ))
          ) : (
            <p style={styles.placeholder}>No recognized faces yet.</p>
          )}
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>🚩 Flagged Faces</h2>
        <div style={styles.imageGrid}>
          {flaggedImages.length > 0 ? (
            flaggedImages.map((image, index) => (
              <div key={index} style={styles.imageCard}>
                <img
                  src={`http://127.0.0.1:5000/api/logs/flagged/${image}`}
                  alt={`Flagged ${index}`}
                  style={styles.image}
                />
                <p style={styles.caption}>{image}</p>
              </div>
            ))
          ) : (
            <p style={styles.placeholder}>No flagged faces.</p>
          )}
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: "40px",
    borderBottom: "2px solid #dee2e6",
    paddingBottom: "10px",
  },
  logo: {
    height: "60px",
    marginRight: "20px",
    borderRadius: "10px",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#343a40",
  },
  section: {
    marginBottom: "40px",
  },
  sectionTitle: {
    fontSize: "24px",
    color: "#495057",
    marginBottom: "20px",
    borderBottom: "1px solid #ced4da",
    paddingBottom: "8px",
  },
  imageGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
  imageCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #dee2e6",
    borderRadius: "8px",
    padding: "10px",
    width: "200px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
    textAlign: "center",
  },
  image: {
    width: "100%",
    borderRadius: "6px",
  },
  caption: {
    fontSize: "14px",
    color: "#6c757d",
    marginTop: "8px",
    wordWrap: "break-word",
  },
  error: {
    color: "red",
    marginBottom: "20px",
    fontWeight: "bold",
  },
  placeholder: {
    fontStyle: "italic",
    color: "#adb5bd",
  },
};

export default AdminDashboard;
