"use client";

import { useChat } from "ai/react";
import { useState } from "react";
import { generateRulesPrompt } from "~/lib/prompts/generateRules";
import { api } from "~/trpc/react";
import { useToast } from "../hooks/use-toast";
import { useModelSettings } from "../hooks/useModelSettings"; // Add this import
import GeneratedRules from "./GeneratedRules";
import { useLocalStorage } from "./hooks/useLocalStorage";

interface Repo {
  id: number;
  name: string;
  full_name: string;
}

interface RepoListProps {
  selectedModel: string;
  // Remove anthropicApiKey and openaiApiKey from props
}

export default function RepoList({ selectedModel }: RepoListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);
  const reposPerPage = 10;
  const [rulesCache, setRulesCache] = useLocalStorage<Record<string, string>>(
    "generatedRules",
    {},
  );

  const { toast } = useToast();
  const { anthropicApiKey, openaiApiKey } = useModelSettings();
  const { data, isLoading, error } = api.github.getRepos.useQuery({
    page: currentPage,
    perPage: reposPerPage,
    searchTerm,
  });

  const {
    append,
    messages,
    isLoading: isChatLoading,
    setMessages,
  } = useChat({
    api: "/api/chat",
    body: {
      model: selectedModel,
      apiKey: selectedModel.startsWith("claude")
        ? anthropicApiKey
        : openaiApiKey,
    },
  });

  const fetchRepoContents = api.github.getRepoContents.useMutation();

  const handleGenerateAnother = () => {
    setSelectedRepo(null);
  };

  const handleRepoClick = async (repo: Repo) => {
    setSelectedRepo(repo);

    // Check if API key is set
    if (selectedModel.startsWith("claude") && !anthropicApiKey) {
      toast({
        title: "Error",
        description:
          "Anthropic API key is not set. Please set it in the settings.",
        variant: "destructive",
      });
      return;
    } else if (selectedModel.startsWith("gpt") && !openaiApiKey) {
      toast({
        title: "Error",
        description:
          "OpenAI API key is not set. Please set it in the settings.",
        variant: "destructive",
      });
      return;
    }

    // Check if rules exist in cache
    if (rulesCache[repo.full_name]) {
      setMessages([
        {
          id: "cached",
          role: "assistant",
          content: rulesCache[repo.full_name] ?? "",
        },
      ]);
      return;
    }

    // Fetch repo contents and generate rules only if not in cache
    const contents = await fetchRepoContents.mutateAsync({
      fullName: repo.full_name,
    });

    let packageInfo = "";
    if (contents.packageFile) {
      packageInfo = `
      Package file: ${contents.packageFile.name}
      Package file contents:
      ${contents.packageFile.content}`;
    }

    const prompt = generateRulesPrompt(contents, packageInfo);

    await append(
      {
        role: "user",
        content: prompt,
      },
      {
        body: {
          apiKey: selectedModel.startsWith("claude")
            ? anthropicApiKey
            : openaiApiKey,
        },
      },
    );
  };

  const handleRulesGenerated = (repoName: string, rules: string) => {
    setRulesCache((prev) => ({ ...prev, [repoName]: rules }));
  };

  if (isLoading) return <div>Loading repositories...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const totalPages = data?.totalCount
    ? Math.ceil(data?.totalCount / reposPerPage)
    : 1;

  // Use data.repos directly instead of the repos state
  const repoList = data?.repos ?? [];

  return (
    <div className="w-full max-w-xl">
      {!selectedRepo && (
        <>
          <h2 className="mb-4 font-bold">
            Choose a repository to generate rules for
          </h2>
          <input
            type="text"
            placeholder="Search repositories..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="mb-4 w-full rounded-lg border p-2"
          />
          <p className="mb-2 text-sm text-gray-500">
            Total repositories: {data?.totalCount}
          </p>
          <ul className="space-y-2">
            {repoList.map((repo) => (
              <li
                key={repo.id}
                className="cursor-pointer rounded-lg bg-white/10 p-3 text-sm hover:bg-white/20"
                onClick={() => handleRepoClick(repo)}
              >
                {repo.full_name}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col items-center">
            <div className="flex w-full justify-between">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="rounded bg-blue-500 px-4 py-2 text-white disabled:bg-gray-400"
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="rounded bg-blue-500 px-4 py-2 text-white disabled:bg-gray-400"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
      {selectedRepo && (
        <GeneratedRules
          repo={selectedRepo}
          messages={messages}
          onGenerateAnother={handleGenerateAnother}
          onRulesGenerated={handleRulesGenerated}
        />
      )}
    </div>
  );
}
