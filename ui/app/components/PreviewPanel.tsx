import React from "react";

interface PreviewPanelProps {
  showPreview: boolean;
  generatingPreview: boolean;
  generatedPreview: string | null;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({
  showPreview,
  generatingPreview,
  generatedPreview,
}) => {
  if (!showPreview || (!generatingPreview && !generatedPreview)) return null;

  return (
    <div className="preview-panel">
      <div className="prd-header">
        <h3 className="prd-title">Application Preview</h3>
      </div>
      <div className="prd-content">
        {(() => {
          if (generatingPreview) {
            return (
              <div className="prd-loading">
                <div className="loading-spinner"></div>
                <span>Generating Application Preview...</span>
              </div>
            );
          } else if (generatedPreview) {
            return (
              <img
                className="preview-image"
                src={`data:image/png;base64,${generatedPreview}`}
                alt="Application Preview"
              />
            );
          }
          return null;
        })()}
      </div>
    </div>
  );
};

export default PreviewPanel;
