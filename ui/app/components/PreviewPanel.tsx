import React from "react";
import { Card, CardHeader, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Monitor,
  Loader2,
  Sparkles,
  ImageIcon,
  Check,
  Share,
  Heart,
} from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";

interface PreviewPanelProps {
  showPreview: boolean;
  generatingPreview: boolean;
  generatedPreview: string | null;
  showPRD?: boolean;
  onRegeneratePreview: () => void;
  onResetApplication: () => void;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({
  showPreview,
  generatingPreview,
  generatedPreview,
  onRegeneratePreview,
  onResetApplication,
  showPRD = false,
}) => {
  return (
    <div
      className={cn(
        "transition-all duration-300 flex-1 h-[calc(50vh-8rem)] min-h-0",
      )}
    >
      <Card className="h-full flex flex-col shadow-sm border-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 min-h-0 gap-0">
        {/* Header */}
        <CardHeader className="flex-shrink-0 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur-md"></div>
                <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-2">
                  <Monitor className="h-5 w-5 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Application Preview
                </h3>
                <Badge variant="secondary" className="text-xs mt-1">
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI Generated
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>

        {/* Content */}
        <CardContent className="flex-1 overflow-hidden p-0 relative min-h-0">
          {generatingPreview ? (
            <LoadingState />
          ) : generatedPreview ? (
            <PreviewDisplay preview={generatedPreview} />
          ) : (
            <SkeletonState />
          )}
          <div className="flex items-center justify-center gap-4 absolute bottom-0 right-4 shadow-2xl z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <Button
              onClick={onRegeneratePreview}
              variant="outline"
              size="lg"
              className="gap-2 hover:bg-blue-50 hover:border-blue-300 transition-colors"
            >
              <Sparkles className="size-4" />
              Regenerate Preview
            </Button>
            <Button
              // onClick={onResetApplication}
              size="lg"
              variant="secondary"
              color="pink"
              className="gap-2 bg-pink-100 hover:bg-pink-200 text-pink-700 shadow-md"
            >
              <Heart className="size-5" />
              Share
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const LoadingState: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full p-4 flex-3/5">
    <div className="relative mb-6">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl"></div>
      <Card className="relative bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-200 dark:border-purple-800 p-8 shadow-lg">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Loader2 className="h-8 w-8 text-purple-600 animate-spin" />
            <div className="absolute inset-0 h-8 w-8 border-2 border-purple-200 rounded-full animate-pulse"></div>
          </div>
          <div className="text-center space-y-2">
            <h4 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Generating Application Preview...
            </h4>
            <p className="text-sm text-muted-foreground max-w-xs">
              Creating a visual mockup of your application based on the product
              requirements
            </p>
          </div>
        </div>
      </Card>
    </div>
  </div>
);

interface PreviewDisplayProps {
  preview: string;
}

const PreviewDisplay: React.FC<PreviewDisplayProps> = ({ preview }) => (
  <div className="h-full p-3 min-h-0">
    <div className="h-full flex flex-col space-y-3 min-h-0">
      <div className="flex-1 relative min-h-0">
        <Card className="h-full overflow-hidden border-2 border-dashed border-muted-foreground/20 bg-gradient-to-br from-slate-50 to-purple-50/30 dark:from-slate-900 dark:to-purple-950/30 shadow-lg">
          <CardContent className="p-0 h-full">
            <div className="relative h-full flex items-center justify-center">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-50/50 to-pink-50/50 dark:from-transparent dark:via-purple-950/20 dark:to-pink-950/20"></div>

              {/* Preview Image */}
              <div className="relative z-10 max-w-full max-h-full p-2">
                <div className="relative rounded-lg overflow-hidden shadow-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  <img
                    src={`data:image/png;base64,${preview}`}
                    alt="Application Preview"
                    className="w-full h-auto max-h-[calc(40vh-100px)] object-contain"
                  />

                  {/* Overlay for better visibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>
                </div>
              </div>

              {/* Corner decorations */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-purple-300 dark:border-purple-600 rounded-tl-lg"></div>
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-purple-300 dark:border-purple-600 rounded-tr-lg"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-purple-300 dark:border-purple-600 rounded-bl-lg"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-purple-300 dark:border-purple-600 rounded-br-lg"></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer info */}
      <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground bg-muted/50 rounded-md p-3">
        <ImageIcon className="h-3 w-3" />
        <span>
          This is a generated mockup based on your conversation and requirements
        </span>
      </div>
    </div>
  </div>
);

const SkeletonState: React.FC = () => (
  <div className="h-full p-3 min-h-0">
    <h3 className="text-base font-semibold mb-3">
      Your preview will show up here...
    </h3>
    <Card className="border-2 border-dashed border-muted-foreground/20 min-h-0">
      <CardContent className="flex p-3 min-h-0 gap-4">
        <Skeleton className="h-64 w-32 rounded-lg" />
        <div className="flex flex-col gap-4 flex-1">
          <div className="flex gap-4">
            <Skeleton className="h-14 w-full rounded-lg" />
            <Skeleton className="h-14 w-full rounded-lg" />
            <Skeleton className="h-14 w-full rounded-lg" />
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-32 w-full rounded-lg" />
            <Skeleton className="h-32 w-full rounded-lg" />
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default PreviewPanel;
