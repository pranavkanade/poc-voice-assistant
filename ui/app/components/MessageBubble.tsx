import React from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Edit3, Save, X, User, Bot } from "lucide-react";
import { cn } from "../lib/utils";

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
  const isUser = message.role === "user";

  return (
    <div
      className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}
    >
      <div
        className={cn("flex gap-3 max-w-[85%]", isUser && "flex-row-reverse")}
      >
        {/* Avatar */}
        <Avatar className="h-10 w-10 shrink-0">
          <AvatarFallback
            className={cn(
              "text-sm font-medium",
              isUser ? "bg-blue-600 text-white" : "bg-emerald-600 text-white",
            )}
          >
            {isUser ? (
              <User className="h-5 w-5" />
            ) : (
              <Bot className="h-5 w-5" />
            )}
          </AvatarFallback>
        </Avatar>

        {/* Message Content */}
        <div className="flex flex-col gap-2 min-w-0">
          {/* Speaker Name and Edit Button */}
          <div
            className={cn(
              "flex items-center gap-2",
              isUser && "flex-row-reverse",
            )}
          >
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {isUser ? "You" : "Assistant"}
            </span>
            {isUser && !isEditing && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onStartEditing}
                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted"
              >
                <Edit3 className="h-3 w-3" />
              </Button>
            )}
          </div>

          {/* Message Bubble */}
          {isUser && isEditing ? (
            <Card className="p-4 shadow-md border-blue-200 bg-blue-50/50 dark:bg-blue-950/20 dark:border-blue-800">
              <div className="space-y-3">
                <Textarea
                  value={editedText}
                  onChange={(e) => onEditTextChange(e.target.value)}
                  className="min-h-[80px] resize-none border-0 bg-white dark:bg-background focus-visible:ring-1 focus-visible:ring-blue-500"
                  placeholder="Edit your message..."
                  autoFocus
                />
                <div className="flex gap-2 justify-end">
                  <Button
                    onClick={onSaveEdit}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                  >
                    <Save className="h-3 w-3 mr-1" />
                    Save
                  </Button>
                  <Button
                    onClick={onCancelEdit}
                    variant="outline"
                    size="sm"
                    className="shadow-sm"
                  >
                    <X className="h-3 w-3 mr-1" />
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <div className="group">
              <Card
                className={cn(
                  "p-4 shadow-md transition-all duration-200 hover:shadow-lg",
                  isUser
                    ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white border-0"
                    : "bg-card text-card-foreground border border-border hover:border-border/80",
                )}
              >
                <div className="text-lg leading-relaxed whitespace-pre-wrap break-words">
                  {message.text}
                  {message.currentPartial && (
                    <>
                      {message.text && " "}
                      <span
                        className={cn(
                          "italic",
                          isUser ? "text-blue-100" : "text-muted-foreground",
                        )}
                      >
                        {message.currentPartial}
                      </span>
                      <SpeakingIndicator isUser={isUser} />
                    </>
                  )}
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Speaking indicator component
const SpeakingIndicator: React.FC<{ isUser: boolean }> = ({ isUser }) => (
  <span className="inline-flex items-center ml-2">
    <span className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={cn(
            "w-1 h-1 rounded-full animate-pulse",
            isUser ? "bg-blue-200" : "bg-muted-foreground",
          )}
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: "1.4s",
          }}
        />
      ))}
    </span>
  </span>
);

export default MessageBubble;
