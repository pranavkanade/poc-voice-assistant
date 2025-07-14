import React, { useState } from "react";
import Navbar from "../components/Navbar";
import VoiceControl from "../components/VoiceControl";
import ConversationDisplay from "../components/ConversationDisplay";
import TranscriptPanel from "../components/TranscriptPanel";
import PRDPanel from "../components/PRDPanel";
import PreviewPanel from "../components/PreviewPanel";
import { useVapi } from "../hooks/useVapi";
import { usePRD } from "../hooks/usePRD";

interface VapiWidgetProps {
  config?: Record<string, unknown>;
}

const VapiWidget: React.FC<VapiWidgetProps> = ({ config = {} }) => {
  const {
    isConnected,
    isSpeaking,
    isLoading,
    transcript,
    startCall,
    endCall,
    updateUserMessage,
    clearTranscript,
  } = useVapi();

  const {
    prdGenerating,
    generatedPRD,
    showPRD,
    editingPRD,
    editedPRDText,
    generatingPreview,
    generatedPreview,
    showPreview,
    startEditingPRD,
    savePRDEdit,
    cancelPRDEdit,
    handleEditPRDText,
  } = usePRD(transcript, isSpeaking, isConnected);

  const [editingUserMessage, setEditingUserMessage] = useState(false);
  const [editedText, setEditedText] = useState("");
  const [showTranscriptPanel, setShowTranscriptPanel] = useState(false);

  const handleEditSave = () => {
    updateUserMessage(editedText);
    setEditingUserMessage(false);
    setEditedText("");
  };

  const handleEditCancel = () => {
    setEditingUserMessage(false);
    setEditedText("");
  };

  const startEditing = () => {
    const userMessages = transcript.filter((msg) => msg.role === "user");
    if (userMessages.length > 0) {
      const latestUserMessage = userMessages[userMessages.length - 1];
      setEditedText(latestUserMessage.text);
      setEditingUserMessage(true);
    }
  };

  const toggleTranscriptPanel = () => {
    setShowTranscriptPanel(!showTranscriptPanel);
  };

  const handleClearTranscript = () => {
    clearTranscript();
    setShowTranscriptPanel(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-slate-950 dark:via-blue-950/30 dark:to-purple-950/20">
      {/* Navbar */}
      <Navbar
        showTranscriptPanel={showTranscriptPanel}
        onToggleTranscript={toggleTranscriptPanel}
        hasTranscript={transcript.length > 0}
      />
      <div className="flex p-4 pt-20 min-h-lvh gap-4">
        <TranscriptPanel
          showTranscriptPanel={showTranscriptPanel}
          transcript={transcript}
          onClearTranscript={handleClearTranscript}
        />
        <PRDPanel
          showPRD={showPRD}
          showTranscriptPanel={showTranscriptPanel}
          showPreview={showPreview}
          prdGenerating={prdGenerating}
          generatedPRD={generatedPRD}
          editingPRD={editingPRD}
          editedPRDText={editedPRDText}
          onEditPRDText={handleEditPRDText}
          onStartEditingPRD={startEditingPRD}
          onSavePRDEdit={savePRDEdit}
          onCancelPRDEdit={cancelPRDEdit}
        />
        <PreviewPanel
          showPreview={showPreview}
          generatingPreview={generatingPreview}
          generatedPreview={generatedPreview}
          showPRD={!!(showPRD && (prdGenerating || generatedPRD))}
        />
        {!showPreview && (
          <main className="flex items-center justify-center transition-all duration-300 flex-3/5">
            <div className="w-full max-w-4xl mx-auto space-y-8">
              {/* Conversation Display */}
              <div className="flex justify-center">
                <ConversationDisplay
                  transcript={transcript}
                  editingUserMessage={editingUserMessage}
                  editedText={editedText}
                  onEditTextChange={setEditedText}
                  onStartEditing={startEditing}
                  onSaveEdit={handleEditSave}
                  onCancelEdit={handleEditCancel}
                />
              </div>

              {/* Voice Control */}
              <div className="flex justify-center">
                <VoiceControl
                  isConnected={isConnected}
                  isLoading={isLoading}
                  isSpeaking={isSpeaking}
                  onStartCall={startCall}
                  onEndCall={endCall}
                />
              </div>
            </div>
          </main>
        )}
      </div>
    </div>
  );
};

export default VapiWidget;
