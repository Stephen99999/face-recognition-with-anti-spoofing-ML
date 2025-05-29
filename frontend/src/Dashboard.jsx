import { useState } from "react";
import { 
  ChevronDown, 
  LogOut, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Activity,
  BarChart3,
  FileText,
  Download,
  Eye,
  Calendar,
  CreditCard,
  Bell
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import './Dashboard.css';

const Dashboard = ({ username , onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");

  const navItems = ["Dashboard", "Predictions", "Reports"];

  // Sample data for the dashboard
  const dashboardStats = [
    { title: "Total Users", value: "12,847", change: "+12%", icon: Users, color: "blue" },
    { title: "Revenue", value: "$847,293", change: "+8.2%", icon: DollarSign, color: "green" },
    { title: "Fraud Alerts", value: "23", change: "-15%", icon: AlertTriangle, color: "red" },
    { title: "Success Rate", value: "98.7%", change: "+0.3%", icon: CheckCircle, color: "emerald" }
  ];

  const recentTransactions = [
    { id: "TXN001", user: "John Smith", amount: "$2,540", status: "completed", risk: "low" },
    { id: "TXN002", user: "Sarah Johnson", amount: "$890", status: "pending", risk: "medium" },
    { id: "TXN003", user: "Mike Davis", amount: "$15,200", status: "flagged", risk: "high" },
    { id: "TXN004", user: "Emma Wilson", amount: "$445", status: "completed", risk: "low" },
    { id: "TXN005", user: "Robert Brown", amount: "$3,200", status: "completed", risk: "low" }
  ];

  const predictions = [
    { type: "Fraud Detection", accuracy: "94.2%", status: "active", lastUpdated: "2 hours ago" },
    { type: "Risk Assessment", accuracy: "91.8%", status: "active", lastUpdated: "1 hour ago" },
    { type: "Credit Scoring", accuracy: "96.5%", status: "training", lastUpdated: "30 minutes ago" },
    { type: "Anomaly Detection", accuracy: "89.3%", status: "inactive", lastUpdated: "1 day ago" }
  ];

  const reports = [
    { name: "Monthly Fraud Report", date: "May 2025", size: "2.4 MB", status: "ready" },
    { name: "Risk Assessment Summary", date: "May 2025", size: "1.8 MB", status: "ready" },
    { name: "Customer Analytics", date: "April 2025", size: "3.2 MB", status: "ready" },
    { name: "Compliance Report", date: "Q1 2025", size: "4.1 MB", status: "generating" }
  ];

  const renderDashboardContent = () => (
    <div className="dashboard-content">
      {/* Stats Cards */}
      <div className="stats-grid">
        {dashboardStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`stat-card ${stat.color}`}
          >
            <div className="stat-icon">
              <stat.icon size={24} />
            </div>
            <div className="stat-content">
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-title">{stat.title}</p>
              <span className={`stat-change ${stat.change.startsWith('+') ? 'positive' : 'negative'}`}>
                {stat.change} from last month
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts and Activity */}
      <div className="dashboard-grid">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="chart-card"
        >
          <h3 className="card-title">Transaction Volume</h3>
          <div className="chart-placeholder">
            <BarChart3 size={48} className="chart-icon" />
            <p>Interactive chart would be rendered here</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="activity-card"
        >
          <h3 className="card-title">Recent Transactions</h3>
          <div className="transaction-list">
            {recentTransactions.map((tx, index) => (
              <div key={tx.id} className="transaction-item">
                <div className="transaction-info">
                  <span className="transaction-id">{tx.id}</span>
                  <span className="transaction-user">{tx.user}</span>
                </div>
                <div className="transaction-details">
                  <span className="transaction-amount">{tx.amount}</span>
                  <span className={`transaction-status ${tx.status}`}>{tx.status}</span>
                  <span className={`risk-badge ${tx.risk}`}>{tx.risk} risk</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );

  const renderPredictionsContent = () => (
    <div className="predictions-content">
      <div className="section-header">
        <h3>ML Model Performance</h3>
        <button className="primary-button">
          <Activity size={16} />
          Retrain Models
        </button>
      </div>

      <div className="predictions-grid">
        {predictions.map((pred, index) => (
          <motion.div
            key={pred.type}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="prediction-card"
          >
            <div className="prediction-header">
              <h4 className="prediction-title">{pred.type}</h4>
              <span className={`status-badge ${pred.status}`}>{pred.status}</span>
            </div>
            <div className="prediction-metrics">
              <div className="metric">
                <span className="metric-label">Accuracy</span>
                <span className="metric-value">{pred.accuracy}</span>
              </div>
              <div className="metric">
                <span className="metric-label">Last Updated</span>
                <span className="metric-value">{pred.lastUpdated}</span>
              </div>
            </div>
            <div className="prediction-actions">
              <button className="secondary-button">Configure</button>
              <button className="secondary-button">View Details</button>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="prediction-insights"
      >
        <h3 className="card-title">Model Insights</h3>
        <div className="insights-grid">
          <div className="insight-item">
            <Shield className="insight-icon" />
            <div>
              <h4>Fraud Prevention</h4>
              <p>Blocked 847 suspicious transactions this month, saving $2.1M</p>
            </div>
          </div>
          <div className="insight-item">
            <TrendingUp className="insight-icon" />
            <div>
              <h4>Risk Trends</h4>
              <p>Overall risk exposure decreased by 12% compared to last quarter</p>
            </div>
          </div>
          <div className="insight-item">
            <CheckCircle className="insight-icon" />
            <div>
              <h4>Model Health</h4>
              <p>All critical models are performing within acceptable parameters</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderReportsContent = () => (
    <div className="reports-content">
      <div className="section-header">
        <h3>Generated Reports</h3>
        <button className="primary-button">
          <FileText size={16} />
          Generate New Report
        </button>
      </div>

      <div className="reports-grid">
        {reports.map((report, index) => (
          <motion.div
            key={report.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="report-card"
          >
            <div className="report-icon">
              <FileText size={32} />
            </div>
            <div className="report-info">
              <h4 className="report-title">{report.name}</h4>
              <div className="report-meta">
                <span className="report-date">
                  <Calendar size={14} />
                  {report.date}
                </span>
                <span className="report-size">{report.size}</span>
              </div>
              <span className={`report-status ${report.status}`}>
                {report.status === 'ready' ? <CheckCircle size={14} /> : <Activity size={14} />}
                {report.status}
              </span>
            </div>
            <div className="report-actions">
              {report.status === 'ready' && (
                <>
                  <button className="icon-button" title="View">
                    <Eye size={16} />
                  </button>
                  <button className="icon-button" title="Download">
                    <Download size={16} />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="report-templates"
      >
        <h3 className="card-title">Report Templates</h3>
        <div className="templates-grid">
          <div className="template-item">
            <div className="template-icon">
              <Shield size={24} />
            </div>
            <div>
              <h4>Security Audit</h4>
              <p>Comprehensive security assessment and compliance report</p>
              <button className="secondary-button">Generate</button>
            </div>
          </div>
          <div className="template-item">
            <div className="template-icon">
              <TrendingUp size={24} />
            </div>
            <div>
              <h4>Performance Analytics</h4>
              <p>System performance metrics and optimization recommendations</p>
              <button className="secondary-button">Generate</button>
            </div>
          </div>
          <div className="template-item">
            <div className="template-icon">
              <Users size={24} />
            </div>
            <div>
              <h4>User Behavior</h4>
              <p>Customer interaction patterns and engagement analysis</p>
              <button className="secondary-button">Generate</button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return renderDashboardContent();
      case "Predictions":
        return renderPredictionsContent();
      case "Reports":
        return renderReportsContent();
      default:
        return renderDashboardContent();
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1 className="brand-title">BritSecure Banking</h1>
        </div>
        <nav className="nav-menu">
          <p className="nav-heading">Navigation</p>
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setActiveTab(item)}
              className={`nav-button ${activeTab === item ? "active" : ""}`}
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

          <div className="navbar-actions">
            <button className="notification-button">
              <Bell size={18} />
              <span className="notification-badge">3</span>
            </button>

            {/* User Dropdown */}
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
                    <button onClick={onLogout} className="dropdown-item">
                      <LogOut size={16} /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="dashboard-body">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="content-wrapper"
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;