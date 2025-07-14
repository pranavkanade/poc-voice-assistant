import React, { useState } from "react";
import Navbar from "../components/Navbar";
import VoiceControl from "../components/VoiceControl";
import ConversationDisplay from "../components/ConversationDisplay";
import TranscriptPanel from "../components/TranscriptPanel";
import PRDPanel from "../components/PRDPanel";
import PreviewPanel from "../components/PreviewPanel";
import { useVapi } from "../hooks/useVapi";
import { usePRD } from "../hooks/usePRD";
import "./home.css";

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
    <div className="app-container">
      <Navbar
        showTranscriptPanel={showTranscriptPanel}
        onToggleTranscript={toggleTranscriptPanel}
        hasTranscript={transcript.length > 0}
      />
      {!showPreview ? (
        <div
          className="main-content"
          style={{
            marginLeft: (() => {
              const hasPRD = showPRD && (prdGenerating || generatedPRD);
              const hasTranscript = showTranscriptPanel;

              if (hasPRD && hasTranscript) {
                return "calc(400px + 45vw + 4rem)";
              } else if (hasPRD) {
                return "calc(45vw + 2rem)";
              } else if (hasTranscript) {
                return "calc(400px + 2rem)";
              }
              return "0";
            })(),
            marginRight: (() => {
              const hasPreview =
                showPreview && (generatingPreview || generatedPreview);
              return hasPreview ? "calc(45vw + 2rem)" : "0";
            })(),
            paddingTop: "5rem",
          }}
        >
          <div className="content-wrapper">
            <ConversationDisplay
              transcript={transcript}
              editingUserMessage={editingUserMessage}
              editedText={editedText}
              onEditTextChange={setEditedText}
              onStartEditing={startEditing}
              onSaveEdit={handleEditSave}
              onCancelEdit={handleEditCancel}
            />

            <VoiceControl
              isConnected={isConnected}
              isLoading={isLoading}
              isSpeaking={isSpeaking}
              onStartCall={startCall}
              onEndCall={endCall}
            />
          </div>
        </div>
      ) : (
        <PreviewPanel
          showPreview={showPreview}
          generatingPreview={generatingPreview}
          generatedPreview={generatedPreview}
        />
      )}

      <PRDPanel
        showPRD={showPRD}
        showTranscriptPanel={showTranscriptPanel}
        prdGenerating={prdGenerating}
        generatedPRD={generatedPRD}
        editingPRD={editingPRD}
        editedPRDText={editedPRDText}
        onEditPRDText={handleEditPRDText}
        onStartEditingPRD={startEditingPRD}
        onSavePRDEdit={savePRDEdit}
        onCancelPRDEdit={cancelPRDEdit}
      />

      <TranscriptPanel
        showTranscriptPanel={showTranscriptPanel}
        transcript={transcript}
        onClearTranscript={handleClearTranscript}
      />
    </div>
  );
};

export default VapiWidget;
