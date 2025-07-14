import { useState, useRef, useCallback, useEffect } from "react";
import { redirect } from "react-router";

interface Message {
  role: string;
  text: string;
  isComplete: boolean;
  currentPartial?: string;
}

export const usePRD = (
  transcript: Message[],
  isSpeaking: boolean,
  isConnected: boolean,
) => {
  const [prdGenerating, setPrdGenerating] = useState(false);
  const [generatedPRD, setGeneratedPRD] = useState<string | null>(null);
  const [showPRD, setShowPRD] = useState(false);
  const [editingPRD, setEditingPRD] = useState(false);
  const [editedPRDText, setEditedPRDText] = useState("");
  const [generatingPreview, setGeneratingPreview] = useState(false);
  const [generatedPreview, setGeneratedPreview] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  const submitPRD = useCallback(async () => {
    let abortController: AbortController | null = null;
    try {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        setPrdGenerating(false);
        console.log("Cancelled previous PRD request");
      }

      abortController = new AbortController();
      abortControllerRef.current = abortController;

      const conversation = transcript
        .slice(0, transcript.length - 1)
        .map(
          (msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.text}`,
        )
        .join("\n");

      if (!conversation.trim()) {
        console.log("No conversation to submit");
        return;
      }

      console.log("Starting PRD generation - setting loading to true");
      setPrdGenerating(true);
      setShowPRD(true);
      const formData = new FormData();
      formData.append("conversation", conversation);

      const response = await fetch("/api/prd", {
        method: "POST",
        body: formData,
        signal: abortController.signal,
      });

      if (response.ok) {
        const prdData = await response.json();
        console.log("PRD generated successfully:", prdData);
        console.log("Setting generated PRD and clearing loading state");
        setGeneratedPRD(prdData);
        setShowPRD(true);
        setPrdGenerating(false);
      } else {
        console.error("Failed to generate PRD:", response.statusText);
        console.log("PRD generation failed - clearing loading state");
        setPrdGenerating(false);
      }
    } catch (error: any) {
      if (error?.name === "AbortError") {
        console.log("PRD request was cancelled");
      } else {
        console.error("Error submitting PRD request:", error);
      }
    } finally {
      if (abortController && abortControllerRef.current === abortController) {
        abortControllerRef.current = null;
      }
    }
  }, [transcript]);

  const generatePreview = useCallback(async () => {
    try {
      setGeneratingPreview(true);
      setShowPreview(true);
      const formData = new FormData();
      formData.append("prd", generatedPRD as string);

      const response = await fetch("/api/preview", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const previewData = await response.json();
        console.log("Preview generated successfully:", previewData);
        setGeneratedPreview(previewData);
        setShowPreview(true);
      } else {
        console.error("Failed to generate preview:", response.statusText);
        redirect("?preview_error=true");
      }
    } catch (error) {
      console.error("Error generating preview:", error);
    } finally {
      setGeneratingPreview(false);
    }
  }, [generatedPRD]);

  useEffect(() => {
    if (transcript.length - 1 >= 2 && isSpeaking && !prdGenerating) {
      submitPRD();
    }
  }, [transcript.length, isSpeaking, submitPRD, prdGenerating]);

  useEffect(() => {
    if (!isConnected && !prdGenerating && !!generatedPRD) {
      console.log("Preview generation started!");
      generatePreview();
    }
  }, [isConnected, prdGenerating, generatedPRD, generatePreview]);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
    };
  }, []);

  const startEditingPRD = () => {
    setEditedPRDText(generatedPRD || "");
    setEditingPRD(true);
  };

  const savePRDEdit = () => {
    setGeneratedPRD(editedPRDText);
    setEditingPRD(false);
    setEditedPRDText("");
  };

  const cancelPRDEdit = () => {
    setEditingPRD(false);
    setEditedPRDText("");
  };

  const handleEditPRDText = (text: string) => {
    setEditedPRDText(text);
  };

  return {
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
  };
};
