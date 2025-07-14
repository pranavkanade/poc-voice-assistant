import React from "react";

interface VoiceControlProps {
  isConnected: boolean;
  isLoading: boolean;
  isSpeaking: boolean;
  onStartCall: () => void;
  onEndCall: () => void;
}

const VoiceControl: React.FC<VoiceControlProps> = ({
  isConnected,
  isLoading,
  isSpeaking,
  onStartCall,
  onEndCall,
}) => {
  return (
    <div className="voice-control">
      {!isConnected ? (
        <button
          onClick={onStartCall}
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
            <button onClick={onEndCall} className="end-call-button">
              End Call
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceControl;