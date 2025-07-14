import type { Route } from "./+types/home";
import React, { useState, useEffect } from "react";
import Vapi from "@vapi-ai/web";

const apiKey: string = "6a1cc0d7-d71f-4ef3-a9dc-74bb0f88e342";
const assistantId: string = "225496a9-74f9-49b5-8fb0-326e9550f427";

interface VapiWidgetProps {
  config?: Record<string, unknown>;
}

const VapiWidget: React.FC<VapiWidgetProps> = ({ config = {} }) => {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<
    Array<{
      role: string;
      text: string;
      isComplete: boolean;
      currentPartial?: string;
    }>
  >([]);
  const [instruction, setInstruction] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const vapiInstance = new Vapi(apiKey);
    setVapi(vapiInstance);

    // Event listeners
    vapiInstance.on("call-start", () => {
      console.log("Call started");
      setIsConnected(true);
      setIsLoading(false);
    });

    vapiInstance.on("call-end", () => {
      console.log("Call ended");
      setIsConnected(false);
      setIsSpeaking(false);
    });

    vapiInstance.on("speech-start", () => {
      console.log("Assistant started speaking");
      setIsSpeaking(true);
    });

    vapiInstance.on("speech-end", () => {
      console.log("Assistant stopped speaking");
      setIsSpeaking(false);
    });

    vapiInstance.on("message", (message) => {
      console.log("Message received:", message);
      if (message.type === "transcript") {
        const isComplete = message.transcriptType === "final";

        setTranscript((prev) => {
          const newTranscript = [...prev];
          const lastMessageIndex = newTranscript.length - 1;
          const lastMessage = newTranscript[lastMessageIndex];

          if (lastMessage && lastMessage.role === message.role) {
            // Same speaker - continue the current turn
            if (isComplete) {
              // Final transcript - add to accumulated text for this turn
              const accumulatedText =
                lastMessage.text +
                (lastMessage.text ? " " : "") +
                message.transcript;
              newTranscript[lastMessageIndex] = {
                role: message.role,
                text: accumulatedText,
                isComplete: true,
                currentPartial: undefined,
              };
            } else {
              // Partial transcript - show as currently being spoken
              newTranscript[lastMessageIndex] = {
                ...lastMessage,
                isComplete: false,
                currentPartial: message.transcript,
              };
            }
          } else {
            // Different speaker or first message - start new turn
            newTranscript.push({
              role: message.role,
              text: isComplete ? message.transcript : "",
              isComplete: isComplete,
              currentPartial: isComplete ? undefined : message.transcript,
            });
          }

          return newTranscript;
        });
      }
    });

    vapiInstance.on("error", (error) => {
      console.error("Vapi error:", error);
    });

    return () => {
      vapiInstance?.stop();
    };
  }, [apiKey]);

  const startCall = () => {
    if (vapi) {
      setIsLoading(true);
      if (instruction.trim()) {
        vapi.start(assistantId, {
          firstMessage: instruction,
        });
      } else {
        vapi.start(assistantId);
      }
    }
  };

  const endCall = () => {
    if (vapi) {
      vapi.stop();
    }
  };

  return (
    <div className="app-container">
      {/* Main Content Area */}
      <div className="main-content">
        <div className="content-wrapper">
          {/* Header */}
          <div className="header">
            <h1 className="app-title">Voice Assistant</h1>
            <p className="app-subtitle">
              Add instructions and start a conversation with your AI assistant
            </p>
          </div>

          {/* Instruction Input */}
          <div className="instruction-section">
            <label className="instruction-label">Add Instruction</label>
            <div className="input-wrapper">
              <textarea
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
                placeholder="Enter your instruction here..."
                className="instruction-input"
                rows={4}
              />
            </div>
          </div>

          {/* Voice Control */}
          <div className="voice-control">
            {!isConnected ? (
              <button
                onClick={startCall}
                className="mic-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="loading-spinner"></div>
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2C10.34 2 9 3.34 9 5V11C9 12.66 10.34 14 12 14C13.66 14 15 12.66 15 11V5C15 3.34 13.66 2 12 2Z"
                        fill="currentColor"
                      />
                      <path
                        d="M19 11C19 15.4183 15.4183 19 11 19V17C14.3137 17 17 14.3137 17 11H19Z"
                        fill="currentColor"
                      />
                      <path
                        d="M5 11C5 14.3137 7.68629 17 11 17V19C6.58172 19 3 15.4183 3 11H5Z"
                        fill="currentColor"
                      />
                      <path d="M11 22H13V19H11V22Z" fill="currentColor" />
                    </svg>
                    <span>Start Conversation</span>
                  </>
                )}
              </button>
            ) : (
              <div className="call-active">
                <div
                  className={`mic-indicator ${isSpeaking ? "speaking" : "listening"}`}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2C10.34 2 9 3.34 9 5V11C9 12.66 10.34 14 12 14C13.66 14 15 12.66 15 11V5C15 3.34 13.66 2 12 2Z"
                      fill="currentColor"
                    />
                    <path
                      d="M19 11C19 15.4183 15.4183 19 11 19V17C14.3137 17 17 14.3137 17 11H19Z"
                      fill="currentColor"
                    />
                    <path
                      d="M5 11C5 14.3137 7.68629 17 11 17V19C6.58172 19 3 15.4183 3 11H5Z"
                      fill="currentColor"
                    />
                    <path d="M11 22H13V19H11V22Z" fill="currentColor" />
                  </svg>
                </div>
                <div className="call-status">
                  <span className="status-text">
                    {isSpeaking ? "Assistant Speaking" : "Listening"}
                  </span>
                  <button onClick={endCall} className="end-call-button">
                    End Call
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Transcript Panel */}
      <div className="transcript-panel">
        <div className="transcript-header">
          <h3 className="transcript-title">Transcript</h3>
          {transcript.length > 0 && (
            <button onClick={() => setTranscript([])} className="clear-button">
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
                  <div className="message-content">
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

      <style>{`
        .app-container {
          display: flex;
          height: 100vh;
          font-family:
            -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif;
          background: #ffffff;
          color: #1f2937;
        }

        .main-content {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem;
          min-height: 0;
        }

        .content-wrapper {
          width: 100%;
          max-width: 600px;
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        .header {
          text-align: center;
          margin-bottom: 1rem;
        }

        .app-title {
          font-size: 2.5rem;
          font-weight: 300;
          margin: 0 0 0.5rem 0;
          color: #111827;
          letter-spacing: -0.025em;
        }

        .app-subtitle {
          font-size: 1rem;
          margin: 0;
          color: #6b7280;
          font-weight: 400;
        }

        .instruction-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .instruction-label {
          color: #374151;
          font-size: 1rem;
          font-weight: 500;
          text-align: center;
        }

        .input-wrapper {
          position: relative;
        }

        .instruction-input {
          width: 100%;
          padding: 1rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 1rem;
          line-height: 1.5;
          resize: vertical;
          background: #ffffff;
          outline: none;
          transition: border-color 0.2s ease;
          font-family: inherit;
          min-height: 120px;
        }

        .instruction-input:focus {
          border-color: #374151;
        }

        .instruction-input::placeholder {
          color: #9ca3af;
        }

        .voice-control {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 1rem;
        }

        .mic-button {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: #111827;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 1rem 1.5rem;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s ease;
          font-family: inherit;
        }

        .mic-button:hover {
          background: #374151;
        }

        .mic-button:active {
          background: #1f2937;
        }

        .mic-button:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }

        .mic-button:disabled:hover {
          background: #9ca3af;
        }

        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .call-active {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .mic-indicator {
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #10b981;
          border-radius: 50%;
          color: white;
          transition: background-color 0.3s ease;
          border: 3px solid #d1fae5;
        }

        .mic-indicator.speaking {
          background: #ef4444;
          border-color: #fee2e2;
          animation: pulse 1.5s ease-in-out infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
          }
        }

        .call-status {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .status-text {
          color: #374151;
          font-size: 1rem;
          font-weight: 500;
        }

        .end-call-button {
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s ease;
          font-family: inherit;
        }

        .end-call-button:hover {
          background: #dc2626;
        }

        .transcript-panel {
          width: 400px;
          background: #f9fafb;
          border-left: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
        }

        .transcript-header {
          padding: 1.5rem;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #ffffff;
        }

        .transcript-title {
          margin: 0;
          font-size: 1.125rem;
          font-weight: 600;
          color: #111827;
        }

        .clear-button {
          background: transparent;
          color: #6b7280;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          padding: 0.25rem 0.75rem;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .clear-button:hover {
          background: #f3f4f6;
          color: #374151;
        }

        .transcript-content {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem;
          background: #ffffff;
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          text-align: center;
          color: #6b7280;
        }

        .empty-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          opacity: 0.6;
        }

        .empty-text {
          font-size: 1rem;
          font-weight: 500;
          margin: 0 0 0.5rem 0;
          color: #374151;
        }

        .empty-subtext {
          font-size: 0.875rem;
          margin: 0;
          opacity: 0.8;
        }

        .messages {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .message {
          display: flex;
        }

        .message.user {
          justify-content: flex-end;
        }

        .message.assistant {
          justify-content: flex-start;
        }

        .message-content {
          max-width: 85%;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .message-text {
          padding: 0.75rem 1rem;
          border-radius: 8px;
          font-size: 0.875rem;
          line-height: 1.4;
          word-wrap: break-word;
        }

        .user .message-text {
          background: #111827;
          color: white;
        }

        .assistant .message-text {
          background: #f3f4f6;
          color: #111827;
          border: 1px solid #e5e7eb;
        }

        .message-meta {
          font-size: 0.75rem;
          color: #9ca3af;
          padding: 0 0.5rem;
          font-weight: 500;
        }

        .user .message-meta {
          text-align: right;
        }

        .assistant .message-meta {
          text-align: left;
        }

        .message.partial .message-text {
          position: relative;
        }

        .speaking-indicator {
          display: inline-flex;
          align-items: center;
          margin-left: 8px;
        }

        .speaking-indicator span {
          height: 4px;
          width: 4px;
          background: currentColor;
          border-radius: 50%;
          display: inline-block;
          margin: 0 1px;
          opacity: 0.4;
          animation: speaking 1.4s infinite ease-in-out;
        }

        .speaking-indicator span:nth-child(1) {
          animation-delay: 0s;
        }

        .speaking-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .speaking-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes speaking {
          0%, 60%, 100% {
            opacity: 0.4;
          }
          30% {
            opacity: 1;
          }
        }

        .partial-indicator {
          color: #10b981;
          font-size: 0.7rem;
        }

        .partial-text {
          opacity: 0.8;
          font-style: italic;
        }

        .empty-message {
          opacity: 0.6;
          font-style: italic;
          color: #6b7280;
        }

        /* Scrollbar styling */
        .transcript-content::-webkit-scrollbar {
          width: 6px;
        }

        .transcript-content::-webkit-scrollbar-track {
          background: transparent;
        }

        .transcript-content::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 3px;
        }

        .transcript-content::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }

        /* Responsive design */
        @media (max-width: 1024px) {
          .transcript-panel {
            width: 350px;
          }
        }

        @media (max-width: 768px) {
          .app-container {
            flex-direction: column;
          }

          .transcript-panel {
            width: 100%;
            height: 40vh;
            border-left: none;
            border-top: 1px solid #e5e7eb;
          }

          .main-content {
            flex: 1;
            padding: 1.5rem;
          }

          .app-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default VapiWidget;
