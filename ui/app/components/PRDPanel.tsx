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
  <div className="h-full flex flex-col p-3 min-h-0">
    <h3 className="text-base font-semibold mb-3 flex-shrink-0">
      Your PRD will show up here...
    </h3>
    <div className="flex-1 min-h-0">
      <Card className="shadow-none h-full">
        <CardContent className="p-3 h-full">
          <div className="space-y-3 h-full flex flex-col justify-start">
            {/* Title */}
            <Skeleton className="h-6 w-1/2 flex-shrink-0" />

            {/* First section */}
            <div className="space-y-2 flex-shrink-0">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-3/4" />
            </div>

            {/* Second section */}
            <div className="space-y-2 flex-shrink-0">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-3 w-5/6" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default PRDPanel;
