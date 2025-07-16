import React from "react";
import { MessageCircle } from "lucide-react";

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
        <div className="flex flex-col items-center justify-center text-center py-12 space-y-8">
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                <MessageCircle className="h-9 w-9 text-white" />
              </div>
            </div>
            <div className="space-y-3">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                What Do You Want To Build?
              </h2>
              <p className="text-muted-foreground text-base max-w-lg mx-auto leading-relaxed">
                Describe your application idea and I'll help you create a
                detailed product requirements document and preview.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationDisplay;
