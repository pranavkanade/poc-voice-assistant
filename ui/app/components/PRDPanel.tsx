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
  <div className="flex flex-col items-center justify-center h-full p-4">
    <div className="relative mb-6">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-2xl blur-xl"></div>
      <Card className="relative bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-950/20 dark:to-blue-950/20 border border-emerald-200 dark:border-emerald-800 p-8 shadow-lg">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Loader2 className="h-8 w-8 text-emerald-600 animate-spin" />
            <div className="absolute inset-0 h-8 w-8 border-2 border-emerald-200 rounded-full animate-pulse"></div>
          </div>
          <div className="text-center space-y-2">
            <h4 className="text-lg font-semibold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Generating PRD...
            </h4>
            <p className="text-sm text-muted-foreground max-w-xs">
              Analyzing your conversation and creating a comprehensive product
              requirements document
            </p>
          </div>
        </div>
      </Card>
    </div>
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
  <div className="h-full p-4">
    <div className="h-full flex flex-col space-y-3">
      <div className="flex-1">
        <Textarea
          value={editedText}
          onChange={(e) => onEditText(e.target.value)}
          placeholder="Edit your PRD content here (Markdown format)..."
          className="h-full resize-none border-2 border-dashed border-muted-foreground/20 focus:border-emerald-500 focus-visible:ring-emerald-500 text-sm leading-relaxed font-mono min-h-0"
        />
      </div>
      <div className="text-xs text-muted-foreground bg-muted/50 rounded-md p-2 flex-shrink-0">
        <strong>Tip:</strong> You can use Markdown formatting for better
        structure
      </div>
    </div>
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
