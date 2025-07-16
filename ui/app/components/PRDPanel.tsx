import React from "react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardContent } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";
import {
  FileText,
  Edit3,
  Save,
  X,
  Loader2,
  Sparkles,
  Check,
} from "lucide-react";
import { cn } from "../lib/utils";

interface PRDPanelProps {
  showPRD: boolean;
  showTranscriptPanel: boolean;
  showPreview?: boolean;
  prdGenerating: boolean;
  generatedPRD: string | null;
  editingPRD: boolean;
  editedPRDText: string;
  onEditPRDText: (text: string) => void;
  onStartEditingPRD: () => void;
  onSavePRDEdit: () => void;
  onCancelPRDEdit: () => void;
}

const PRDPanel: React.FC<PRDPanelProps> = ({
  showPRD,
  showTranscriptPanel,
  showPreview = false,
  prdGenerating,
  generatedPRD,
  editingPRD,
  editedPRDText,
  onEditPRDText,
  onStartEditingPRD,
  onSavePRDEdit,
  onCancelPRDEdit,
}) => {
  return (
    <div
      className={cn(
        "transition-all duration-300 flex-1 h-[calc(50vh-8rem)] min-h-0",
      )}
    >
      <Card className="h-full flex flex-col shadow-sm border-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 gap-0 min-h-0">
        {/* Header */}
        <CardHeader className="flex-shrink-0 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur-md"></div>
                <div className="relative bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg p-2">
                  <FileText className="h-5 w-5 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Product Requirements Document
                </h3>
                <Badge variant="secondary" className="text-xs mt-1">
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI Generated
                </Badge>
              </div>
            </div>

            {!prdGenerating && generatedPRD && (
              <div className="flex items-center gap-2">
                {editingPRD ? (
                  <>
                    <Button
                      onClick={onSavePRDEdit}
                      size="sm"
                      className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md"
                    >
                      <Save className="h-3 w-3" />
                      Save
                    </Button>
                    <Button
                      onClick={onCancelPRDEdit}
                      variant="outline"
                      size="sm"
                      className="gap-2 shadow-sm"
                    >
                      <X className="h-3 w-3" />
                      Cancel
                    </Button>
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={onStartEditingPRD}
                      variant="outline"
                      size="sm"
                      className="gap-2 hover:bg-muted transition-colors"
                    >
                      <Edit3 className="h-3 w-3" />
                      Edit
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardHeader>

        {/* Content */}
        <CardContent className="flex-1 overflow-hidden p-0 min-h-0">
          {prdGenerating ? (
            <LoadingState />
          ) : editingPRD ? (
            <EditingState
              editedText={editedPRDText}
              onEditText={onEditPRDText}
            />
          ) : generatedPRD ? (
            <DisplayState prdContent={generatedPRD} />
          ) : (
            <SkeletonState />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const LoadingState: React.FC = () => (
  <div className="h-full flex flex-col p-3 min-h-0">
    <div className="flex items-center gap-2 mb-3 flex-shrink-0">
      <Loader2 className="h-4 w-4 text-emerald-600 animate-spin" />
      <h3 className="text-base font-semibold">
        <span className="inline-block animate-pulse mr-4">Generating PRD</span>
        <span className="inline-block animate-bounce delay-100">.</span>
        <span className="inline-block animate-bounce delay-200">.</span>
        <span className="inline-block animate-bounce delay-300">.</span>
      </h3>
    </div>
    <div className="flex-1 min-h-0 relative">
      {/* Background animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/30 via-blue-50/30 to-emerald-50/30 dark:from-emerald-950/10 dark:via-blue-950/10 dark:to-emerald-950/10 animate-pulse"></div>

      <Card className="shadow-none h-full relative z-10 bg-transparent">
        <CardContent className="p-3 h-full">
          <div className="space-y-3 h-full flex flex-col justify-start">
            {/* Title */}
            <div className="h-6 w-1/2 flex-shrink-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 rounded relative overflow-hidden animate-pulse">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent dark:via-slate-500/60"></div>
            </div>

            {/* First section */}
            <div className="space-y-2 flex-shrink-0 animate-pulse delay-200">
              <div className="h-4 w-1/4 bg-gradient-to-r from-emerald-200 via-emerald-100 to-emerald-200 dark:from-emerald-800 dark:via-emerald-700 dark:to-emerald-800 rounded relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite_0.3s] bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-emerald-500/50"></div>
              </div>
              <div className="h-3 w-full bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 rounded relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite_0.4s] bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-slate-500/40"></div>
              </div>
              <div className="h-3 w-3/4 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 rounded relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite_0.5s] bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-slate-500/40"></div>
              </div>
              <div className="h-3 w-5/6 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 rounded relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite_0.6s] bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-slate-500/40"></div>
              </div>
            </div>

            {/* Second section */}
            <div className="space-y-2 flex-shrink-0 animate-pulse delay-500">
              <div className="h-4 w-1/3 bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200 dark:from-blue-800 dark:via-blue-700 dark:to-blue-800 rounded relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite_0.8s] bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-blue-500/50"></div>
              </div>
              <div className="h-3 w-5/6 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 rounded relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite_0.9s] bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-slate-500/40"></div>
              </div>
              <div className="h-3 w-2/3 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 rounded relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite_1s] bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-slate-500/40"></div>
              </div>
              <div className="h-3 w-4/5 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 rounded relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite_1.1s] bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-slate-500/40"></div>
              </div>
            </div>

            {/* Third section */}
            <div className="space-y-2 flex-shrink-0 animate-pulse delay-700">
              <div className="h-4 w-1/4 bg-gradient-to-r from-emerald-200 via-emerald-100 to-emerald-200 dark:from-emerald-800 dark:via-emerald-700 dark:to-emerald-800 rounded relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite_1.3s] bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-emerald-500/50"></div>
              </div>
              <div className="h-3 w-full bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 rounded relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite_1.4s] bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-slate-500/40"></div>
              </div>
              <div className="h-3 w-3/4 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 rounded relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite_1.5s] bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-slate-500/40"></div>
              </div>
            </div>

            {/* Progress indicators */}
            <div className="flex space-x-1 mt-4 flex-shrink-0">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse delay-200"></div>
              <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse delay-400"></div>
              <div className="w-2 h-2 bg-emerald-200 rounded-full animate-pulse delay-600"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <style>{`
      @keyframes shimmer {
        100% {
          transform: translateX(100%);
        }
      }
    `}</style>
  </div>
);

interface EditingStateProps {
  editedText: string;
  onEditText: (text: string) => void;
}

const EditingState: React.FC<EditingStateProps> = ({
  editedText,
  onEditText,
}) => (
  <div className="h-full flex flex-col min-h-0">
    <ScrollArea className="flex-1 min-h-0">
      <div className="p-4">
        <Textarea
          value={editedText}
          onChange={(e) => onEditText(e.target.value)}
          placeholder="Edit your PRD content here (Markdown format)..."
          className="w-full min-h-[400px] border-2 border-dashed border-muted-foreground/20 focus:border-emerald-500 focus-visible:ring-emerald-500 text-sm leading-relaxed font-mono"
        />
      </div>
    </ScrollArea>
  </div>
);

interface DisplayStateProps {
  prdContent: string | null;
}

const DisplayState: React.FC<DisplayStateProps> = ({ prdContent }) => (
  <div className="h-full flex flex-col min-h-0">
    <ScrollArea className="flex-1 min-h-0">
      <div className="p-3">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-foreground bg-transparent border-0 p-0 m-0">
            {prdContent}
          </pre>
        </div>
      </div>
    </ScrollArea>
  </div>
);

const SkeletonState: React.FC = () => (
  <div className="h-full flex flex-col p-3 min-h-0 relative overflow-hidden">
    {/* Animated background gradient */}
    {/* <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 via-blue-50/40 to-purple-50/40 dark:from-emerald-950/20 dark:via-blue-950/20 dark:to-purple-950/20 animate-gradient-shift"></div> */}

    {/* Floating particles animation */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-400/30 rounded-full animate-float-slow"></div>
      <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-blue-400/40 rounded-full animate-float-medium"></div>
      <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-purple-400/30 rounded-full animate-float-fast"></div>
    </div>

    <div className="relative z-10 h-full flex flex-col min-h-0">
      {/* Exciting header */}
      <div className="flex-shrink-0 mb-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-full border border-emerald-200/50 dark:border-emerald-800/50 mb-3">
          <Sparkles className="h-4 w-4 text-emerald-600 animate-pulse" />
          <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
            Your AI-Powered PRD Awaits
          </span>
        </div>
      </div>

      {/* Preview content with examples */}
      <div className="flex-1 min-h-0 relative">
        <Card className="shadow-none h-full border-2 border-dashed border-emerald-200/50 dark:border-emerald-800/30 bg-gradient-to-br from-white/50 to-emerald-50/30 dark:from-slate-900/50 dark:to-emerald-950/20">
          <CardContent className="p-4 h-full">
            <div className="space-y-4 h-full flex flex-col justify-start">
              {/* Sample title with shimmer effect */}
              <div className="relative">
                <div className="text-sm font-bold text-emerald-700 dark:text-emerald-300 mb-1 opacity-60">
                  📋 Project Overview
                </div>
                {/* <div className="h-4 bg-gradient-to-r from-emerald-100 via-emerald-50 to-emerald-100 dark:from-emerald-900 dark:via-emerald-800 dark:to-emerald-900 rounded-md relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 dark:via-emerald-400/30 to-transparent"></div>
                </div> */}
              </div>

              {/* Sample sections */}
              <div className="space-y-3 flex-shrink-0">
                <div className="opacity-50 transform hover:opacity-70 transition-all duration-300">
                  <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1 flex items-center gap-1">
                    🎯 <span>Core Features</span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-2 w-full bg-blue-100 dark:bg-blue-900/30 rounded animate-pulse"></div>
                    <div className="h-2 w-3/4 bg-blue-100 dark:bg-blue-900/30 rounded animate-pulse delay-100"></div>
                    <div className="h-2 w-5/6 bg-blue-100 dark:bg-blue-900/30 rounded animate-pulse delay-200"></div>
                  </div>
                </div>

                <div className="opacity-40 transform hover:opacity-60 transition-all duration-300">
                  <div className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1 flex items-center gap-1">
                    👥 <span>User Stories</span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-2 w-5/6 bg-purple-100 dark:bg-purple-900/30 rounded animate-pulse"></div>
                    <div className="h-2 w-2/3 bg-purple-100 dark:bg-purple-900/30 rounded animate-pulse delay-150"></div>
                  </div>
                </div>

                <div className="opacity-30 transform hover:opacity-50 transition-all duration-300">
                  <div className="text-xs font-semibold text-orange-600 dark:text-orange-400 mb-1 flex items-center gap-1">
                    ⚡ <span>Technical Requirements</span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-2 w-4/5 bg-orange-100 dark:bg-orange-900/30 rounded animate-pulse"></div>
                    <div className="h-2 w-1/2 bg-orange-100 dark:bg-orange-900/30 rounded animate-pulse delay-75"></div>
                  </div>
                </div>
              </div>

              {/* Call to action area */}
              <div className="flex-1 flex items-end justify-center">
                <div className="text-center py-2 opacity-60">
                  <div className="flex justify-center space-x-1 mb-2">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-75"></div>
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce delay-150"></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Click the microphone to start building!
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <style>{`
      @keyframes shimmer {
        100% { transform: translateX(100%); }
      }
      @keyframes gradient-shift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
      @keyframes float-slow {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
      }
      @keyframes float-medium {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-15px) rotate(90deg); }
      }
      @keyframes float-fast {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-10px) rotate(270deg); }
      }
      .animate-gradient-shift {
        background-size: 200% 200%;
        animation: gradient-shift 8s ease infinite;
      }
      .animate-float-slow {
        animation: float-slow 6s ease-in-out infinite;
      }
      .animate-float-medium {
        animation: float-medium 4s ease-in-out infinite;
      }
      .animate-float-fast {
        animation: float-fast 3s ease-in-out infinite;
      }
      .animate-shimmer {
        animation: shimmer 2s infinite;
      }
    `}</style>
  </div>
);

export default PRDPanel;
