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
          {!generatingPreview ? (
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
  <div className="h-full p-3 min-h-0">
    {/* Header with time estimation */}
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <Loader2 className="h-4 w-4 text-purple-600 animate-spin" />
        <h3 className="text-base font-semibold">
          Building your application preview
        </h3>
      </div>
      <div className="text-xs text-muted-foreground bg-purple-50 dark:bg-purple-950/20 px-2 py-1 rounded-full">
        ⏱️ 30-60 seconds
      </div>
    </div>

    {/* Progress bar */}
    <div className="mb-4">
      <div className="flex justify-between text-xs text-muted-foreground mb-1">
        <span>Analyzing requirements...</span>
        <span className="animate-pulse">◉</span>
      </div>
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-[progress_20s_ease-out_infinite] origin-left"></div>
      </div>
    </div>

    <div className="h-full flex flex-col space-y-3 min-h-0">
      <div className="flex-1 relative min-h-0">
        <Card className="h-full overflow-hidden border-2 border-dashed border-purple-300/30 dark:border-purple-600/30 bg-gradient-to-br from-slate-50 to-purple-50/30 dark:from-slate-900 dark:to-purple-950/30 shadow-lg">
          <CardContent className="p-4 h-full">
            <div className="relative h-full flex items-center justify-center">
              {/* SaaS Dashboard Wireframe being built */}
              <div className="relative w-full h-full bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                {/* Dashboard frame */}
                <div className="absolute inset-0 border-2 border-slate-300 dark:border-slate-600 rounded-lg"></div>

                {/* Top Navigation Bar - appears first */}
                <div className="absolute top-3 left-3 right-3 h-12 bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-700 dark:to-pink-700 rounded animate-[fadeInSlide_1s_ease-out_0.5s_both]">
                  <div className="flex items-center justify-between h-full px-4">
                    <div className="w-24 h-4 bg-white/50 rounded animate-pulse"></div>
                    <div className="flex space-x-3">
                      <div className="w-16 h-4 bg-white/50 rounded animate-pulse delay-100"></div>
                      <div className="w-8 h-8 bg-white/50 rounded-full animate-pulse delay-200"></div>
                    </div>
                  </div>
                </div>

                {/* Sidebar - appears second */}
                <div className="absolute top-18 left-3 w-20 bottom-3 bg-slate-200 dark:bg-slate-600 rounded animate-[fadeInSlide_1s_ease-out_1.5s_both]">
                  <div className="flex flex-col items-center p-2 space-y-3 mt-3">
                    <div className="w-5 h-5 bg-slate-400 rounded animate-pulse"></div>
                    <div className="w-5 h-5 bg-slate-400 rounded animate-pulse delay-100"></div>
                    <div className="w-5 h-5 bg-slate-400 rounded animate-pulse delay-200"></div>
                    <div className="w-5 h-5 bg-slate-400 rounded animate-pulse delay-300"></div>
                    <div className="w-5 h-5 bg-slate-400 rounded animate-pulse delay-400"></div>
                  </div>
                </div>

                {/* Main Content Area - KPI Cards */}
                <div className="absolute top-18 left-26 right-3 h-16 bg-blue-100 dark:bg-blue-800 rounded animate-[fadeInSlide_1s_ease-out_2.5s_both]">
                  <div className="grid grid-cols-3 gap-2 p-2 h-full">
                    <div className="bg-blue-200 dark:bg-blue-700 rounded p-2">
                      <div className="w-12 h-2 bg-blue-400 rounded animate-pulse"></div>
                      <div className="w-8 h-3 bg-blue-300 rounded mt-2 animate-pulse delay-200"></div>
                    </div>
                    <div className="bg-green-200 dark:bg-green-700 rounded p-2">
                      <div className="w-12 h-2 bg-green-400 rounded animate-pulse delay-100"></div>
                      <div className="w-8 h-3 bg-green-300 rounded mt-2 animate-pulse delay-300"></div>
                    </div>
                    <div className="bg-yellow-200 dark:bg-yellow-700 rounded p-2">
                      <div className="w-12 h-2 bg-yellow-400 rounded animate-pulse delay-200"></div>
                      <div className="w-8 h-3 bg-yellow-300 rounded mt-2 animate-pulse delay-400"></div>
                    </div>
                  </div>
                </div>

                {/* Chart Area - appears fourth */}
                <div className="absolute top-36 left-26 right-3 h-24 bg-green-100 dark:bg-green-800 rounded animate-[fadeInSlide_1s_ease-out_3.5s_both]">
                  <div className="p-3">
                    <div className="w-20 h-3 bg-green-300 dark:bg-green-600 rounded animate-pulse mb-2"></div>
                    <div className="flex items-end space-x-2 h-16">
                      <div className="w-2 h-8 bg-green-400 rounded animate-pulse delay-100"></div>
                      <div className="w-2 h-12 bg-green-400 rounded animate-pulse delay-200"></div>
                      <div className="w-2 h-6 bg-green-400 rounded animate-pulse delay-300"></div>
                      <div className="w-2 h-14 bg-green-400 rounded animate-pulse delay-400"></div>
                      <div className="w-2 h-10 bg-green-400 rounded animate-pulse delay-500"></div>
                      <div className="w-2 h-13 bg-green-400 rounded animate-pulse delay-600"></div>
                      <div className="w-2 h-7 bg-green-400 rounded animate-pulse delay-700"></div>
                      <div className="w-2 h-11 bg-green-400 rounded animate-pulse delay-800"></div>
                    </div>
                  </div>
                </div>

                {/* Data Table - appears fifth */}
                <div className="absolute bottom-3 left-26 right-3 h-24 bg-purple-100 dark:bg-purple-800 rounded animate-[fadeInSlide_1s_ease-out_4.5s_both]">
                  <div className="p-3 space-y-2">
                    <div className="w-24 h-3 bg-purple-300 dark:bg-purple-600 rounded animate-pulse"></div>
                    <div className="space-y-2">
                      <div className="flex space-x-2">
                        <div className="w-12 h-2 bg-purple-200 dark:bg-purple-700 rounded animate-pulse"></div>
                        <div className="w-16 h-2 bg-purple-200 dark:bg-purple-700 rounded animate-pulse delay-100"></div>
                        <div className="w-8 h-2 bg-purple-200 dark:bg-purple-700 rounded animate-pulse delay-200"></div>
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-12 h-2 bg-purple-200 dark:bg-purple-700 rounded animate-pulse delay-300"></div>
                        <div className="w-16 h-2 bg-purple-200 dark:bg-purple-700 rounded animate-pulse delay-400"></div>
                        <div className="w-8 h-2 bg-purple-200 dark:bg-purple-700 rounded animate-pulse delay-500"></div>
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-12 h-2 bg-purple-200 dark:bg-purple-700 rounded animate-pulse delay-600"></div>
                        <div className="w-16 h-2 bg-purple-200 dark:bg-purple-700 rounded animate-pulse delay-700"></div>
                        <div className="w-8 h-2 bg-purple-200 dark:bg-purple-700 rounded animate-pulse delay-800"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating data points */}
                <div className="absolute top-20 left-32 w-2 h-2 bg-blue-400 rounded-full animate-[float_3s_ease-in-out_infinite]"></div>
                <div className="absolute top-24 right-12 w-2 h-2 bg-green-400 rounded-full animate-[float_3s_ease-in-out_infinite_1s]"></div>
                <div className="absolute bottom-12 left-36 w-2 h-2 bg-purple-400 rounded-full animate-[float_3s_ease-in-out_infinite_2s]"></div>
              </div>

              {/* Building status */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg border">
                <div className="flex items-center space-x-2 text-xs">
                  <Sparkles className="h-3 w-3 text-purple-500 animate-pulse" />
                  <span className="text-muted-foreground">
                    AI crafting your vision...
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status messages */}
      <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-md p-3">
        <ImageIcon className="h-3 w-3 animate-pulse" />
        <span className="animate-pulse">
          Creating visual mockup from your conversation
        </span>
      </div>
    </div>

    <style jsx>{`
      @keyframes progress {
        0% {
          width: 0%;
        }
        25% {
          width: 25%;
        }
        50% {
          width: 50%;
        }
        75% {
          width: 75%;
        }
        100% {
          width: 90%;
        }
      }

      @keyframes fadeInSlide {
        0% {
          opacity: 0;
          transform: translateY(10px) scale(0.9);
        }
        100% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      @keyframes float {
        0%,
        100% {
          transform: translateY(0) rotate(0deg);
          opacity: 0.3;
        }
        50% {
          transform: translateY(-10px) rotate(180deg);
          opacity: 1;
        }
      }
    `}</style>
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
