import React from "react";
import MessageBubble from "./MessageBubble";

interface Message {
  role: string;
  text: string;
  isComplete: boolean;
  currentPartial?: string;
}

interface ConversationDisplayProps {
  transcript: Message[];
  editingUserMessage: boolean;
  editedText: string;
  onEditTextChange: (text: string) => void;
  onStartEditing: () => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
}

const ConversationDisplay: React.FC<ConversationDisplayProps> = ({
  transcript,
  editingUserMessage,
  editedText,
  onEditTextChange,
  onStartEditing,
  onSaveEdit,
  onCancelEdit,
}) => {
  const getLastTwoMessages = () => {
    if (transcript.length === 0) return [];
    if (transcript.length === 1) return [transcript[0]];
    return transcript.slice(-2);
  };

  const lastTwoMessages = getLastTwoMessages();
  const hasAssistantSpoken = transcript.some((msg) => msg.role === "assistant");

  return (
    <div className="conversation-display">
      {hasAssistantSpoken && lastTwoMessages.length > 0 ? (
        <div className="message-bubbles">
          {lastTwoMessages.map((msg, index) => (
            <MessageBubble
              key={`center-${index}`}
              message={msg}
              isEditing={editingUserMessage && msg.role === "user"}
              editedText={editedText}
              onEditTextChange={onEditTextChange}
              onStartEditing={onStartEditing}
              onSaveEdit={onSaveEdit}
              onCancelEdit={onCancelEdit}
            />
          ))}
        </div>
      ) : (
        <div className="empty-conversation">
          <h2 className="main-heading">What Do You Want To Build?</h2>
          <p className="empty-subtext">
            Your conversation will appear here once you begin speaking
          </p>
        </div>
      )}
    </div>
  );
};

export default ConversationDisplay;