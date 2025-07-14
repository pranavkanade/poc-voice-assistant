import React, { useState, useEffect } from "react";
import Vapi from "@vapi-ai/web";
import "./home.css";

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

  const [isLoading, setIsLoading] = useState(false);
  const [editingUserMessage, setEditingUserMessage] = useState(false);
  const [editedText, setEditedText] = useState("");
  const [showTranscriptPanel, setShowTranscriptPanel] = useState(false);

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
      vapi.start(assistantId);
    }
  };

  const updateUserMessage = (newText: string) => {
    setTranscript((prev) => {
      const newTranscript = [...prev];
      const userMessages = newTranscript.filter((msg) => msg.role === "user");
      if (userMessages.length > 0) {
        const latestUserIndex = newTranscript.lastIndexOf(
          userMessages[userMessages.length - 1],
        );
        newTranscript[latestUserIndex] = {
          ...newTranscript[latestUserIndex],
          text: newText,
        };
      }
      return newTranscript;
    });
  };

  const handleEditSave = () => {
    updateUserMessage(editedText);
    setEditingUserMessage(false);
    setEditedText("");
  };

  const handleEditCancel = () => {
    setEditingUserMessage(false);
    setEditedText("");
  };

  const startEditing = () => {
    const userMessages = transcript.filter((msg) => msg.role === "user");
    if (userMessages.length > 0) {
      const latestUserMessage = userMessages[userMessages.length - 1];
      setEditedText(latestUserMessage.text);
      setEditingUserMessage(true);
    }
  };

  // Get last two messages for center display
  const getLastTwoMessages = () => {
    if (transcript.length === 0) return [];
    if (transcript.length === 1) return [transcript[0]];
    return transcript.slice(-2);
  };

  const lastTwoMessages = getLastTwoMessages();
  const hasAssistantSpoken = transcript.some((msg) => msg.role === "assistant");

  const endCall = () => {
    if (vapi) {
      vapi.stop();
    }
  };

  const toggleTranscriptPanel = () => {
    setShowTranscriptPanel(!showTranscriptPanel);
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
              Your conversation with the AI assistant
            </p>
          </div>

          {/* Conversation Display */}
          <div className="conversation-display">
            {hasAssistantSpoken && lastTwoMessages.length > 0 ? (
              <div className="message-bubbles">
                {lastTwoMessages.map((msg, index) => (
                  <div
                    key={`center-${index}`}
                    className={`message-bubble ${msg.role}`}
                  >
                    <div className="message-header">
                      <span className="speaker-name">
                        {msg.role === "user" ? "You" : "Assistant"}
                      </span>
                      {msg.role === "user" && !editingUserMessage && (
                        <button
                          onClick={startEditing}
                          className="edit-icon"
                          title="Edit message"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                              fill="currentColor"
                            />
                          </svg>
                        </button>
                      )}
                    </div>

                    {msg.role === "user" && editingUserMessage ? (
                      <div className="edit-container">
                        <textarea
                          value={editedText}
                          onChange={(e) => setEditedText(e.target.value)}
                          className="edit-input"
                          autoFocus
                        />
                        <div className="edit-buttons">
                          <button onClick={handleEditSave} className="btn-save">
                            Save
                          </button>
                          <button
                            onClick={handleEditCancel}
                            className="btn-cancel"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="message-content">
                        {msg.text}
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
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-conversation">
                <div className="empty-icon">🎤</div>
                <p className="empty-text">Start your conversation</p>
                <p className="empty-subtext">
                  Your conversation will appear here once you begin speaking
                </p>
              </div>
            )}
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

      {/* Transcript Toggle Button */}
      {transcript.length > 0 && (
        <button
          onClick={toggleTranscriptPanel}
          className="transcript-toggle-button"
          title={showTranscriptPanel ? "Hide Transcript" : "Show Transcript"}
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

      {/* Transcript Panel */}
      {showTranscriptPanel && (
        <div
          className={`transcript-panel ${showTranscriptPanel ? "transcript-panel-open" : ""}`}
        >
          <div className="transcript-header">
            <h3 className="transcript-title">Transcript</h3>
            {transcript.length > 0 && (
              <button
                onClick={() => {
                  setTranscript([]);
                  setShowTranscriptPanel(false);
                }}
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
      )}
    </div>
  );
};

export default VapiWidget;
