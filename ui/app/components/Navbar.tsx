import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { FileText } from "lucide-react";

interface NavbarProps {
  className?: string;
  showTranscriptPanel?: boolean;
  onToggleTranscript?: () => void;
  hasTranscript?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  className = "",
  showTranscriptPanel = false,
  onToggleTranscript,
  hasTranscript = false,
}) => {
  return (
    <nav
      className={`fixed h-16 top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${className}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Appbuilder
              </h1>
              <Badge variant="secondary" className="text-xs font-medium">
                Voice Assistant
              </Badge>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {hasTranscript && onToggleTranscript && (
              <Button
                variant={showTranscriptPanel ? "default" : "outline"}
                size="sm"
                onClick={onToggleTranscript}
                className="gap-2"
              >
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {showTranscriptPanel ? "Hide" : "Show"} Transcript
                </span>
                <span className="sm:hidden">Transcript</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
