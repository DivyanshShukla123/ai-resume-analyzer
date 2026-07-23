import { Sparkles } from "lucide-react";

import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="brand">
          <div className="brand-icon">
            <Sparkles size={18} />
          </div>

          <span>
            Resume
            <span className="brand-highlight">Analyzer</span>
          </span>
        </a>

        <div className="navbar-right">
          <span className="navbar-status">
            <span className="status-dot"></span>
            AI-powered analysis
          </span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
