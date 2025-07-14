import React from "react";

interface MessageBubbleProps {
  message: {
    role: string;
    text: string;
    isComplete: boolean;
    currentPartial?: string;
  };
  isEditing: boolean;
  editedText: string;
  onEditTextChange: (text: string) => void;
  onStartEditing: () => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isEditing,
  editedText,
  onEditTextChange,
  onStartEditing,
  onSaveEdit,
  onCancelEdit,
}) => {
  return (
    <div className={`message-bubble ${message.role}`}>
      <div className="message-header">
        <span className="speaker-name">
          {message.role === "user" ? "You" : "Assistant"}
        </span>
        {message.role === "user" && !isEditing && (
          <button
            onClick={onStartEditing}
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

      {message.role === "user" && isEditing ? (
        <div className="edit-container">
          <textarea
            value={editedText}
            onChange={(e) => onEditTextChange(e.target.value)}
            className="edit-input"
            autoFocus
          />
          <div className="edit-buttons">
            <button onClick={onSaveEdit} className="btn-save">
              Save
            </button>
            <button onClick={onCancelEdit} className="btn-cancel">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="message-content">
          {message.text}
          {message.currentPartial && (
            <>
              {message.text && " "}
              <span className="partial-text">
                {message.currentPartial}
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
  );
};

export default MessageBubble;