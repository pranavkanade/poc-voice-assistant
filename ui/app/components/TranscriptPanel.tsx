import React from "react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardContent } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Trash2, MessageCircle, User, Bot } from "lucide-react";
import { cn } from "../lib/utils";

interface Message {
  role: string;
  text: string;
  isComplete: boolean;
  currentPartial?: string;
}

interface TranscriptPanelProps {
  showTranscriptPanel: boolean;
  transcript: Message[];
  onClearTranscript: () => void;
}

const TranscriptPanel: React.FC<TranscriptPanelProps> = ({
  showTranscriptPanel,
  transcript,
  onClearTranscript,
}) => {
  if (!showTranscriptPanel) return null;

  return (
    <div
      className={cn(
        "transition-transform duration-300 ease-in-out flex-1/6",
        showTranscriptPanel ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <Card className="h-full flex flex-col border-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
        {/* Header */}
        <CardHeader className="flex-shrink-0 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">
                Transcript
              </h3>
            </div>
            {transcript.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={onClearTranscript}
                className="gap-2 hover:bg-destructive hover:text-destructive-foreground transition-colors"
              >
                <Trash2 className="h-3 w-3" />
                Clear
              </Button>
            )}
          </div>
          <Separator className="mt-4" />
        </CardHeader>

        {/* Content */}
        <CardContent className="flex-1 overflow-hidden p-0">
          {transcript.length === 0 ? (
            <EmptyState />
          ) : (
            <ScrollArea className="h-full px-6 pb-6">
              <div className="space-y-4">
                {transcript.map((msg, index) => (
                  <TranscriptMessage
                    key={index}
                    message={msg}
                    isLast={index === transcript.length - 1}
                  />
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const EmptyState: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full text-center p-6">
    <div className="relative mb-6">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
      <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-4">
        <MessageCircle className="h-8 w-8 text-white" />
      </div>
    </div>
    <h4 className="text-lg font-semibold text-foreground mb-2">
      Your conversation will appear here
    </h4>
    <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
      Start talking to see the transcript of your conversation with the AI
      assistant
    </p>
  </div>
);

interface TranscriptMessageProps {
  message: Message;
  isLast: boolean;
}

const TranscriptMessage: React.FC<TranscriptMessageProps> = ({
  message,
  isLast,
}) => {
  const isUser = message.role === "user";
  const hasPartial = message.currentPartial;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Avatar className="h-7 w-7">
          <AvatarFallback
            className={cn(
              "text-xs",
              isUser ? "bg-blue-500 text-white" : "bg-emerald-500 text-white",
            )}
          >
            {isUser ? (
              <User className="h-3 w-3" />
            ) : (
              <Bot className="h-3 w-3" />
            )}
          </AvatarFallback>
        </Avatar>
        <Badge
          variant={isUser ? "default" : "secondary"}
          className={cn(
            "text-xs font-medium",
            isUser
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-emerald-500 hover:bg-emerald-600 text-white",
          )}
        >
          {isUser ? "You" : "Assistant"}
        </Badge>
        {hasPartial && (
          <Badge
            variant="outline"
            className="text-xs bg-amber-50 text-amber-700 border-amber-200"
          >
            Speaking...
          </Badge>
        )}
      </div>

      <Card
        className={cn(
          "p-3 text-sm transition-all duration-200",
          isUser
            ? "bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800"
            : "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-800",
          hasPartial && "shadow-md border-amber-300 dark:border-amber-600",
        )}
      >
        <div className="text-foreground leading-relaxed">
          {message.text && (
            <span className="whitespace-pre-wrap break-words">
              {message.text}
            </span>
          )}
          {hasPartial && (
            <>
              {message.text && " "}
              <span className="italic text-muted-foreground">
                {message.currentPartial}
              </span>
              <SpeakingIndicator />
            </>
          )}
          {!message.text && !hasPartial && (
            <span className="italic text-muted-foreground">Starting...</span>
          )}
        </div>
      </Card>

      {!isLast && <div className="h-2" />}
    </div>
  );
};

const SpeakingIndicator: React.FC = () => (
  <span className="inline-flex items-center ml-2">
    <span className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1 h-1 bg-amber-500 rounded-full animate-pulse"
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: "1.4s",
          }}
        />
      ))}
    </span>
  </span>
);

export default TranscriptPanel;
