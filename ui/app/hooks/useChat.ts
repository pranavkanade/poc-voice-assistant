import { useState, useRef } from "react";

interface Message {
  role: string;
  text: string;
  isComplete: boolean;
  currentPartial?: string;
}

interface ChatResponse {
  content: string;
  role: string;
}

export const useChat = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false); // For compatibility, represents AI responding
  const [isLoading, setIsLoading] = useState(false);
  const [transcript, setTranscript] = useState<Message[]>([]);
  const abortControllerRef = useRef<AbortController | null>(null);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    setIsLoading(true);
    setIsSpeaking(true);

    // Add user message to transcript
    const userMessage: Message = {
      role: "user",
      text: message,
      isComplete: true,
    };

    setTranscript((prev) => [...prev, userMessage]);

    // Create abort controller for this request
    abortControllerRef.current = new AbortController();

    try {
      // Add assistant message placeholder
      const assistantMessage: Message = {
        role: "assistant",
        text: "",
        isComplete: false,
        currentPartial: "",
      };

      setTranscript((prev) => [...prev, assistantMessage]);

      // Prepare messages for API
      const messagesForAPI = [...transcript, userMessage].map((msg) => ({
        role: msg.role,
        content: msg.text,
      }));

      // Call your preferred chat API (OpenAI, Anthropic, etc.)
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: messagesForAPI,
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          accumulatedText += chunk;

          // Update the assistant message with streaming text
          setTranscript((prev) => {
            const newTranscript = [...prev];
            const lastMessageIndex = newTranscript.length - 1;
            const lastMessage = newTranscript[lastMessageIndex];

            if (lastMessage && lastMessage.role === "assistant") {
              newTranscript[lastMessageIndex] = {
                ...lastMessage,
                text: accumulatedText,
                isComplete: false,
                currentPartial: chunk,
              };
            }

            return newTranscript;
          });
        }
      }

      // Mark as complete
      setTranscript((prev) => {
        const newTranscript = [...prev];
        const lastMessageIndex = newTranscript.length - 1;
        const lastMessage = newTranscript[lastMessageIndex];

        if (lastMessage && lastMessage.role === "assistant") {
          newTranscript[lastMessageIndex] = {
            ...lastMessage,
            text: accumulatedText,
            isComplete: true,
            currentPartial: undefined,
          };
        }

        return newTranscript;
      });

      setIsConnected(true);
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        console.log("Request was aborted");
      } else {
        console.error("Chat error:", error);

        // Add error message
        setTranscript((prev) => {
          const newTranscript = [...prev];
          const lastMessageIndex = newTranscript.length - 1;
          const lastMessage = newTranscript[lastMessageIndex];

          if (lastMessage && lastMessage.role === "assistant") {
            newTranscript[lastMessageIndex] = {
              ...lastMessage,
              text: "Sorry, I encountered an error. Please try again.",
              isComplete: true,
              currentPartial: undefined,
            };
          }

          return newTranscript;
        });
      }
    } finally {
      setIsLoading(false);
      setIsSpeaking(false);
    }
  };

  const startCall = () => {
    // Already connected by default
    setIsConnected(true);
    setIsLoading(false);
  };

  const endCall = () => {
    setIsConnected(false);
    setIsSpeaking(false);

    // Abort any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
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

  const clearTranscript = () => {
    setTranscript([]);
  };

  const resetVapi = () => {
    setTranscript([]);
    setIsConnected(false);
    setIsSpeaking(false);
    setIsLoading(false);

    // Abort any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  return {
    isConnected,
    isSpeaking,
    isLoading,
    transcript,
    startCall,
    endCall,
    updateUserMessage,
    clearTranscript,
    resetVapi,
    sendMessage, // New method for sending chat messages
  };
};
