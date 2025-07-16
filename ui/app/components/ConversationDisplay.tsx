import React, { useEffect, useRef } from "react";
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
  const allMessages = transcript;
  const hasAssistantSpoken = transcript.some((msg) => msg.role === "assistant");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [transcript]);

  return (
    <div className="h-full flex flex-col -mx-2">
      {hasAssistantSpoken && allMessages.length > 0 ? (
        <div
          className="flex-1 overflow-y-auto space-y-3 py-2 scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div className="max-w-4xl mx-auto space-y-4">
            {allMessages.map((msg, index) => (
              <MessageBubble
                key={`message-${index}`}
                message={msg}
                isEditing={editingUserMessage && msg.role === "user"}
                editedText={editedText}
                onEditTextChange={onEditTextChange}
                onStartEditing={onStartEditing}
                onSaveEdit={onSaveEdit}
                onCancelEdit={onCancelEdit}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
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
