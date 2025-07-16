import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Send, Loader2, MessageCircle } from "lucide-react";
import { cn } from "../lib/utils";

interface ChatInputProps {
  isConnected: boolean;
  isLoading: boolean;
  isSpeaking: boolean;
  onStartCall: () => void;
  onEndCall: () => void;
  onSendMessage?: (message: string) => void;
  transcript?: Array<{
    role: string;
    text: string;
    isComplete: boolean;
    currentPartial?: string;
  }>;
}

const ChatInput: React.FC<ChatInputProps> = ({
  isConnected,
  isLoading,
  isSpeaking,
  onStartCall,
  onEndCall,
  onSendMessage,
  transcript = [],
}) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto to get the correct scrollHeight
      textareaRef.current.style.height = "auto";
      // Set height to match content, with a reasonable max
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = 200; // Max height in pixels
      textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
      textareaRef.current.style.overflowY =
        scrollHeight > maxHeight ? "auto" : "hidden";
    }
  }, [message]);

  // Auto-start chat when component mounts
  useEffect(() => {
    if (!isConnected && !isLoading) {
      onStartCall();
    }
  }, [isConnected, isLoading, onStartCall]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && onSendMessage && !isLoading) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {!isConnected && isLoading ? (
        // Loading state
        <div className="flex flex-col items-center justify-center space-y-4 py-8">
          <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center">
            <Loader2 className="h-6 w-6 text-white animate-spin" />
          </div>
          <span className="text-sm text-muted-foreground">
            Initializing chat...
          </span>
        </div>
      ) : (
        // Chat interface
        <div className="w-full max-w-3xl mx-auto">
          {/* Chat input form */}
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
            <form onSubmit={handleSubmit} className="relative">
              <div className="relative group">
                <textarea
                  ref={textareaRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    isSpeaking
                      ? "AI is thinking..."
                      : "Describe what you want to build... (Press Enter to send, Shift+Enter for new line)"
                  }
                  className="w-full resize-none rounded-2xl border-0 bg-transparent px-4 py-4 pr-14 text-base focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed min-h-[72px] transition-all duration-200 placeholder:text-gray-500 dark:placeholder:text-gray-400 overflow-hidden"
                  disabled={isLoading}
                  rows={1}
                  style={{ height: "72px" }}
                  autoFocus
                />
                <div className="absolute right-3 bottom-3 flex items-center space-x-2">
                  {isSpeaking && (
                    <div className="flex items-center space-x-1 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                      <div className="flex space-x-1">
                        <div
                          className="w-1 h-1 bg-gray-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="w-1 h-1 bg-gray-500 rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        ></div>
                        <div
                          className="w-1 h-1 bg-gray-500 rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                      </div>
                    </div>
                  )}
                  <Button
                    type="submit"
                    size="sm"
                    disabled={!message.trim() || isLoading || isSpeaking}
                    className="bg-black hover:bg-gray-800 disabled:bg-gray-300 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black border-0 transition-all duration-200 h-8 w-8 rounded-lg p-0 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Send className="h-3.5 w-3.5" />
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInput;
