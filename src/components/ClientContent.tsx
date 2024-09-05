"use client";

import { useEffect, useState } from "react";
import RepoList from "./RepoList";
import { SettingsDialog } from "./SettingsDialog";

export default function ClientContent() {
  const [selectedModel, setSelectedModel] =
    useState<string>("claude-3-5-sonnet");
  const [anthropicApiKey, setAnthropicApiKey] = useState<string>("");
  const [openaiApiKey, setOpenaiApiKey] = useState<string>("");

  useEffect(() => {
    const savedModel = localStorage.getItem("selectedModel");
    const savedAnthropicKey = localStorage.getItem("anthropicApiKey");
    const savedOpenAIKey = localStorage.getItem("openaiApiKey");

    if (savedModel) setSelectedModel(savedModel);
    if (savedAnthropicKey) setAnthropicApiKey(savedAnthropicKey);
    if (savedOpenAIKey) setOpenaiApiKey(savedOpenAIKey);
  }, []);

  const saveSettings = () => {
    localStorage.setItem("selectedModel", selectedModel);
    localStorage.setItem("anthropicApiKey", anthropicApiKey);
    localStorage.setItem("openaiApiKey", openaiApiKey);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-between gap-2">
        <h1 className="text-lg tracking-tight">.cursorrules generator</h1>
        <SettingsDialog
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          anthropicApiKey={anthropicApiKey}
          setAnthropicApiKey={setAnthropicApiKey}
          openaiApiKey={openaiApiKey}
          setOpenaiApiKey={setOpenaiApiKey}
          saveSettings={saveSettings}
        />
      </div>
      <RepoList
        selectedModel={selectedModel}
        anthropicApiKey={anthropicApiKey}
        openaiApiKey={openaiApiKey}
      />
    </>
  );
}
