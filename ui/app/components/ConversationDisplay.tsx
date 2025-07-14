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
    <div className="w-full max-w-4xl mx-auto">
      {hasAssistantSpoken && lastTwoMessages.length > 0 ? (
        <div className="space-y-6">
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
        <div className="flex flex-col items-center justify-center text-center py-16 space-y-6">
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center">
                <svg
                  className="h-8 w-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 10v1a7 7 0 0 1-14 0v-1"
                  />
                  <line
                    x1="12"
                    y1="19"
                    x2="12"
                    y2="23"
                    strokeLinecap="round"
                    strokeWidth={2}
                  />
                  <line
                    x1="8"
                    y1="23"
                    x2="16"
                    y2="23"
                    strokeLinecap="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-5xl font-bold">What Do You Want To Build?</h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
              Your conversation will appear here once you begin speaking. Start
              by clicking the microphone button below.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationDisplay;
