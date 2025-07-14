import React from "react";

interface Message {
  role: string;
  text: string;
  isComplete: boolean;
  currentPartial?: string;
}

interface TranscriptPanelProps {
  showTranscriptPanel: boolean;
  transcript: Message[];
  onClearTranscript: () => void;
}

const TranscriptPanel: React.FC<TranscriptPanelProps> = ({
  showTranscriptPanel,
  transcript,
  onClearTranscript,
}) => {
  if (!showTranscriptPanel) return null;

  return (
    <div
      className={`transcript-panel ${showTranscriptPanel ? "transcript-panel-open" : ""}`}
      style={{ left: "2rem", right: "auto" }}
    >
      <div className="transcript-header">
        <h3 className="transcript-title">Transcript</h3>
        {transcript.length > 0 && (
          <button
            onClick={onClearTranscript}
            className="clear-button"
          >
            Clear
          </button>
        )}
      </div>

      <div className="transcript-content">
        {transcript.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">💬</div>
            <p className="empty-text">Your conversation will appear here</p>
            <p className="empty-subtext">
              Start talking to see the transcript
            </p>
          </div>
        ) : (
          <div className="messages">
            {transcript.map((msg, i) => (
              <div
                key={i}
                className={`message ${msg.role === "user" ? "user" : "assistant"} ${msg.currentPartial ? "partial" : ""}`}
              >
                <div className="msg-container">
                  <div className="message-text">
                    {msg.text && <span>{msg.text}</span>}
                    {msg.currentPartial && (
                      <>
                        {msg.text && " "}
                        <span className="partial-text">
                          {msg.currentPartial}
                        </span>
                        <span className="speaking-indicator">
                          <span></span>
                          <span></span>
                          <span></span>
                        </span>
                      </>
                    )}
                    {!msg.text && !msg.currentPartial && (
                      <span className="empty-message">Starting...</span>
                    )}
                  </div>
                  <div className="message-meta">
                    {msg.role === "user" ? "You" : "Assistant"}
                    {msg.currentPartial && (
                      <span className="partial-indicator">
                        {" "}
                        • speaking...
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TranscriptPanel;