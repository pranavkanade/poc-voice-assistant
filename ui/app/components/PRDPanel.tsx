import React from "react";

interface PRDPanelProps {
  showPRD: boolean;
  showTranscriptPanel: boolean;
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
  prdGenerating,
  generatedPRD,
  editingPRD,
  editedPRDText,
  onEditPRDText,
  onStartEditingPRD,
  onSavePRDEdit,
  onCancelPRDEdit,
}) => {
  if (!showPRD || (!prdGenerating && !generatedPRD)) return null;

  return (
    <div
      className="prd-panel"
      style={{
        left: showTranscriptPanel ? "calc(400px + 4rem)" : "2rem",
        right: "auto",
      }}
    >
      <div className="prd-header">
        <h3 className="prd-title">Product Requirements Document</h3>
        {!prdGenerating && generatedPRD && (
          <div className="prd-header-buttons">
            {editingPRD ? (
              <>
                <button onClick={onSavePRDEdit} className="prd-save-button">
                  Save
                </button>
                <button
                  onClick={onCancelPRDEdit}
                  className="prd-cancel-button"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button onClick={onStartEditingPRD} className="prd-edit-button">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                    fill="currentColor"
                  />
                </svg>
                Edit
              </button>
            )}
          </div>
        )}
      </div>
      <div className="prd-content">
        {(() => {
          console.log(
            "PRD Render - prdGenerating:",
            prdGenerating,
            "generatedPRD:",
            !!generatedPRD,
            "editingPRD:",
            editingPRD,
          );
          if (prdGenerating) {
            return (
              <div className="prd-loading">
                <div className="loading-spinner"></div>
                <span>Generating PRD...</span>
              </div>
            );
          } else if (editingPRD) {
            return (
              <textarea
                className="prd-edit-textarea"
                value={editedPRDText}
                onChange={(e) => onEditPRDText(e.target.value)}
                placeholder="Edit your PRD content here (Markdown format)..."
              />
            );
          } else {
            return <pre className="prd-text">{generatedPRD}</pre>;
          }
        })()}
      </div>
    </div>
  );
};

export default PRDPanel;