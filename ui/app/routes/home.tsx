import React, { useState } from "react";
import Navbar from "../components/Navbar";
import ChatInput from "../components/ChatInput";
import ConversationDisplay from "../components/ConversationDisplay";
import TranscriptPanel from "../components/TranscriptPanel";
import PRDPanel from "../components/PRDPanel";
import PreviewPanel from "../components/PreviewPanel";
import { useChat } from "../hooks/useChat";
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
    resetVapi,
    sendMessage,
  } = useChat();

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
    regeneratePreview,
    resetApplication,
    isGeneratingFinalPreview,
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

  const reset = () => {
    setEditedText("");
    setEditingUserMessage(false);
    setShowTranscriptPanel(false);

    resetApplication();
    resetVapi();
  };

  return (
    <div className="min-h-screen max-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-slate-950 dark:via-blue-950/30 dark:to-purple-950/20">
      {/* Navbar */}
      <Navbar
        showTranscriptPanel={showTranscriptPanel}
        onToggleTranscript={toggleTranscriptPanel}
        hasTranscript={transcript.length > 0}
        reset={reset}
      />
      <div className="flex p-2 pt-20 h-screen gap-4">
        <TranscriptPanel
          showTranscriptPanel={showTranscriptPanel}
          transcript={transcript}
          onClearTranscript={handleClearTranscript}
        />
        <main className="flex flex-col h-full flex-2/5 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
          {/* Conversation Display */}
          <div className="flex-1 overflow-hidden p-3 px-4">
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

          {/* Chat Input - Fixed at bottom */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-3">
            <ChatInput
              isConnected={isConnected}
              isLoading={isLoading}
              isSpeaking={isSpeaking}
              onStartCall={startCall}
              onEndCall={endCall}
              onSendMessage={sendMessage}
              transcript={transcript}
            />
          </div>
        </main>
        <div className="flex flex-col gap-4 flex-3/5">
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
            onRegeneratePreview={regeneratePreview}
            onResetApplication={reset}
            isGeneratingFinalPreview={isGeneratingFinalPreview}
          />
        </div>
      </div>
    </div>
  );
};

export default VapiWidget;
