import React, { useState } from "react";
import { Shield, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
    navigate('/login');
  };

  const styles = {
    container: {
      minHeight: '100vh',
      width: '100vw',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #e0e7ff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    backgroundDecorations: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
      pointerEvents: 'none'
    },
    decoration1: {
      position: 'absolute',
      top: '-5rem',
      right: '-5rem',
      width: '15rem',
      height: '15rem',
      background: 'rgba(59, 130, 246, 0.1)',
      borderRadius: '50%',
      filter: 'blur(40px)'
    },
    decoration2: {
      position: 'absolute',
      bottom: '-5rem',
      left: '-5rem',
      width: '15rem',
      height: '15rem',
      background: 'rgba(99, 102, 241, 0.1)',
      borderRadius: '50%',
      filter: 'blur(40px)'
    },
    decoration3: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '18rem',
      height: '18rem',
      background: 'rgba(6, 182, 212, 0.05)',
      borderRadius: '50%',
      filter: 'blur(60px)'
    },
    cardWrapper: {
      position: 'relative',
      zIndex: 10,
      width: '100%',
      maxWidth: '28rem',
      opacity: 0,
      transform: 'translateY(30px) scale(0.95)',
      animation: 'cardSlideIn 0.8s ease forwards'
    },
    mainCard: {
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(20px)',
      borderRadius: '1.5rem',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      padding: '2rem',
      transition: 'all 0.7s ease',
      cursor: 'default'
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem'
    },
    iconContainer: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '4rem',
      height: '4rem',
      background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
      borderRadius: '1rem',
      marginBottom: '1rem',
      boxShadow: '0 10px 25px rgba(37, 99, 235, 0.3)'
    },
    title: {
      fontSize: '1.875rem',
      fontWeight: '700',
      background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '0.5rem',
      margin: '0 0 0.5rem 0'
    },
    subtitle: {
      color: '#64748b',
      fontSize: '0.875rem',
      fontWeight: '500',
      margin: '0'
    },
    welcomeSection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem 0',
      textAlign: 'center',
      opacity: 0,
      transform: 'translateY(20px)',
      animation: 'fadeInUp 0.8s ease 0.3s forwards'
    },
    welcomeTitle: {
      fontSize: '2.5rem',
      fontWeight: '700',
      background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '1.5rem',
      margin: '0 0 1.5rem 0'
    },
    loginButton: {
      width: '100%',
      padding: '1rem',
      borderRadius: '1rem',
      fontWeight: '600',
      color: '#ffffff',
      fontSize: '1.125rem',
      transition: 'all 0.3s ease',
      transform: 'translateY(0)',
      cursor: 'pointer',
      border: 'none',
      background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
      boxShadow: '0 4px 15px rgba(37, 99, 235, 0.4)',
      opacity: 0,
      animation: 'fadeInUp 0.8s ease 0.6s forwards'
    },
    loginButtonHover: {
      background: 'linear-gradient(135deg, #1d4ed8 0%, #4338ca 100%)',
      boxShadow: '0 20px 40px rgba(59, 130, 246, 0.25)',
      transform: 'translateY(-2px)'
    },
    loginButtonDisabled: {
      background: 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)',
      cursor: 'not-allowed',
      transform: 'translateY(0)',
      boxShadow: 'none'
    },
    loadingSpinner: {
      width: '1.25rem',
      height: '1.25rem',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      borderTop: '2px solid #ffffff',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginRight: '0.5rem'
    },
    loadingContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem'
    },
    securitySection: {
      marginTop: '2rem',
      paddingTop: '1.5rem',
      borderTop: '1px solid #e2e8f0'
    },
    securityFeatures: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1.5rem',
      fontSize: '0.75rem',
      color: '#64748b',
      flexWrap: 'wrap'
    },
    securityItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem'
    },
    footer: {
      marginTop: '1.5rem',
      textAlign: 'center'
    },
    footerText: {
      fontSize: '0.75rem',
      color: '#64748b',
      margin: '0 0 0.25rem 0'
    },
    footerSubtext: {
      fontSize: '0.75rem',
      color: '#94a3b8',
      margin: '0'
    },
    helpCard: {
      marginTop: '1.5rem',
      background: 'rgba(255, 255, 255, 0.6)',
      backdropFilter: 'blur(20px)',
      borderRadius: '1rem',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      padding: '1rem'
    },
    helpContent: {
      textAlign: 'center'
    },
    helpTitle: {
      fontSize: '0.875rem',
      color: '#64748b',
      fontWeight: '500',
      marginBottom: '0.5rem',
      margin: '0 0 0.5rem 0'
    },
    helpLinks: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '1rem',
      fontSize: '0.75rem'
    },
    helpLink: {
      color: '#2563eb',
      textDecoration: 'none',
      fontWeight: '500',
      transition: 'color 0.2s ease',
      cursor: 'pointer',
      background: 'none',
      border: 'none'
    },
    separator: {
      color: '#94a3b8'
    }
  };

  const animations = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    @keyframes cardSlideIn {
      0% { 
        opacity: 0; 
        transform: translateY(30px) scale(0.95); 
      }
      100% { 
        opacity: 1; 
        transform: translateY(0) scale(1); 
      }
    }
    
    @keyframes fadeInUp {
      0% { 
        opacity: 0; 
        transform: translateY(20px); 
      }
      100% { 
        opacity: 1; 
        transform: translateY(0); 
      }
    }
  `;

  return (
    <>
      <style>{animations}</style>
      <div style={styles.container}>
        <div style={styles.backgroundDecorations}>
          <div style={styles.decoration1}></div>
          <div style={styles.decoration2}></div>
          <div style={styles.decoration3}></div>
        </div>

        <div style={styles.cardWrapper}>
          <div 
            style={styles.mainCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 35px 60px -12px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.2)';
            }}
          >
            <div style={styles.header}>
              <div style={styles.iconContainer}>
                <Shield style={{ width: '2rem', height: '2rem', color: '#ffffff' }} />
              </div>
              <h1 style={styles.title}>BritSecure Bank</h1>
              <p style={styles.subtitle}>Secure Banking Portal</p>
            </div>

            <div style={styles.welcomeSection}>
              <h2 style={styles.welcomeTitle}>Welcome to the Admin Page</h2>
              <button
                onClick={handleLogin}
                disabled={loading}
                style={{
                  ...styles.loginButton,
                  ...(loading ? styles.loginButtonDisabled : {})
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    Object.assign(e.currentTarget.style, styles.loginButtonHover);
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(37, 99, 235, 0.4)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                {loading ? (
                  <div style={styles.loadingContainer}>
                    <div style={styles.loadingSpinner}></div>
                    <span>Authenticating...</span>
                  </div>
                ) : (
                  'Sign In Securely'
                )}
              </button>
            </div>

            <div style={styles.securitySection}>
              <div style={styles.securityFeatures}>
                <div style={styles.securityItem}>
                  <CheckCircle style={{ width: '1rem', height: '1rem', color: '#10b981' }} />
                  <span>256-bit SSL</span>
                </div>
                <div style={styles.securityItem}>
                  <CheckCircle style={{ width: '1rem', height: '1rem', color: '#10b981' }} />
                  <span>2FA Protected</span>
                </div>
                <div style={styles.securityItem}>
                  <CheckCircle style={{ width: '1rem', height: '1rem', color: '#10b981' }} />
                  <span>FDIC Insured</span>
                </div>
              </div>
            </div>

            <div style={styles.footer}>
              <p style={styles.footerText}>© 2025 BritSecure Bank. All rights reserved.</p>
              <p style={styles.footerSubtext}>Protected by advanced encryption technology</p>
            </div>
          </div>

          <div style={styles.helpCard}>
            <div style={styles.helpContent}>
              <p style={styles.helpTitle}>Need Help?</p>
              <div style={styles.helpLinks}>
                <button 
                  style={styles.helpLink}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#1d4ed8';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#2563eb';
                  }}
                >
                  Reset Password
                </button>
                <span style={styles.separator}>•</span>
                <button 
                  style={styles.helpLink}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#1d4ed8';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#2563eb';
                  }}
                >
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;