import { useState, useEffect, useRef } from "react";
import Vapi from "@vapi-ai/web";

const apiKey: string = "6a1cc0d7-d71f-4ef3-a9dc-74bb0f88e342";
const assistantId: string = "225496a9-74f9-49b5-8fb0-326e9550f427";

interface Message {
  role: string;
  text: string;
  isComplete: boolean;
  currentPartial?: string;
}

export const useVapi = () => {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [transcript, setTranscript] = useState<Message[]>([]);

  useEffect(() => {
    const vapiInstance = new Vapi(apiKey);
    setVapi(vapiInstance);

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
            if (isComplete) {
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
              newTranscript[lastMessageIndex] = {
                ...lastMessage,
                isComplete: false,
                currentPartial: message.transcript,
              };
            }
          } else {
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
  }, []);

  const startCall = () => {
    if (vapi) {
      setIsLoading(true);
      vapi.start(assistantId);
    }
  };

  const endCall = () => {
    if (vapi) {
      vapi.stop();
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

  return {
    vapi,
    isConnected,
    isSpeaking,
    isLoading,
    transcript,
    startCall,
    endCall,
    updateUserMessage,
    clearTranscript,
  };
};