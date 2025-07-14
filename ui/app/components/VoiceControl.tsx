import React from "react";
import { Button } from "./ui/button";
import { Mic, MicOff, Loader2 } from "lucide-react";
import { cn } from "../lib/utils";

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
    <div className="flex flex-col items-center justify-center space-y-6">
      {!isConnected ? (
        <Button
          onClick={onStartCall}
          disabled={isLoading}
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white border-0 transition-all duration-200 h-14 text-xl"
        >
          {isLoading ? (
            <span className="flex items-center px-3">
              <Loader2 className="mr-3 size-6 animate-spin" />
              Connecting...
            </span>
          ) : (
            <span className="flex items-center px-3">
              <Mic className="mr-3 size-6" />
              Start Conversation
            </span>
          )}
        </Button>
      ) : (
        <div className="flex flex-col items-center space-y-6">
          {/* Mic Indicator */}
          <div
            className={cn(
              "relative flex h-20 w-20 items-center justify-center rounded-full border-4 transition-all duration-300",
              isSpeaking
                ? "border-purple-200 bg-purple-500 animate-pulse"
                : "border-blue-200 bg-blue-500",
            )}
          >
            <Mic className="h-8 w-8 text-white" />

            {/* Pulsing ring animation */}
            <div
              className={cn(
                "absolute inset-0 rounded-full border-4 animate-ping",
                isSpeaking ? "border-purple-300" : "border-blue-300",
              )}
              style={{ animationDuration: "2s" }}
            />
          </div>

          {/* Status Text */}
          <div className="text-center space-y-2">
            <p className="text-lg font-medium text-foreground">
              {isSpeaking ? "Assistant Speaking" : "Listening"}
            </p>
            <p className="text-sm text-muted-foreground">
              {isSpeaking
                ? "The assistant is responding to you"
                : "Say something to continue the conversation"}
            </p>
          </div>

          {/* End Call Button */}
          <Button
            onClick={onEndCall}
            variant="outline"
            size="sm"
            className="gap-2 transition-all duration-200 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
          >
            <MicOff className="h-4 w-4" />
            End Call
          </Button>
        </div>
      )}
    </div>
  );
};

export default VoiceControl;
