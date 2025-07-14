import React from "react";
import "./Navbar.css";

interface NavbarProps {
  className?: string;
  showTranscriptPanel?: boolean;
  onToggleTranscript?: () => void;
  hasTranscript?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  className = "",
  showTranscriptPanel = false,
  onToggleTranscript,
  hasTranscript = false,
}) => {
  return (
    <nav className={`navbar ${className}`}>
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1 className="brand-title">Appsmith</h1>
          <span className="brand-subtitle">Voice Assistant</span>
        </div>

        <div className="navbar-actions">
          {hasTranscript && onToggleTranscript && (
            <button
              onClick={onToggleTranscript}
              className="navbar-transcript-button"
              title={
                showTranscriptPanel ? "Hide Transcript" : "Show Transcript"
              }
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 3h18v2H3V3zm0 4h18v2H3V7zm0 4h18v2H3v-2zm0 4h18v2H3v-2zm0 4h18v2H3v-2z"
                  fill="currentColor"
                />
              </svg>
              <span>{showTranscriptPanel ? "Hide" : "Show"} Transcript</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
