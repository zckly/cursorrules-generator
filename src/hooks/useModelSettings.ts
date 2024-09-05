import { useEffect, useState } from "react";

export function useModelSettings() {
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

  return {
    selectedModel,
    setSelectedModel,
    anthropicApiKey,
    setAnthropicApiKey,
    openaiApiKey,
    setOpenaiApiKey,
    saveSettings,
  };
}
