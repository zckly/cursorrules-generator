import { type Message } from "ai";
import React, { useEffect, useState } from "react";

interface GeneratedRulesProps {
  repo: { full_name: string };
  messages: Message[];
  isLoading: boolean;
  onGenerateAnother: () => void;
  onRulesGenerated: (repoName: string, rules: string) => void;
}

const GeneratedRules: React.FC<GeneratedRulesProps> = ({
  repo,
  messages,
  isLoading,
  onGenerateAnother,
  onRulesGenerated,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const generatedRules =
    messages[messages.length - 1]?.role === "assistant"
      ? messages[messages.length - 1]?.content
      : "";

  const handleCopy = () => {
    if (!generatedRules) return;
    void navigator.clipboard.writeText(generatedRules);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  useEffect(() => {
    if (generatedRules) {
      onRulesGenerated(repo.full_name, generatedRules);
    }
  }, [generatedRules, repo.full_name, onRulesGenerated]);

  return (
    <div className="mt-8">
      {!isLoading && (
        <>
          <h3 className="mb-2 font-bold">
            Generated .cursorrules for {repo.full_name}
          </h3>
          <button
            className="mt-2 rounded bg-gray-700 px-4 py-2 text-sm"
            onClick={onGenerateAnother}
          >
            Generate another
          </button>
        </>
      )}
      <div className="relative mt-4 rounded bg-gray-900 p-4">
        <button
          onClick={handleCopy}
          className="absolute right-2 top-2 rounded bg-gray-700 px-2 py-1 text-xs text-white hover:bg-gray-600"
        >
          {isCopied ? "Copied!" : "Copy"}
        </button>
        <div className="whitespace-pre-wrap text-sm text-white">
          {generatedRules ?? "No rules generated yet."}
        </div>
      </div>
    </div>
  );
};

export default GeneratedRules;
