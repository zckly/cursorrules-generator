import { createAnthropic } from "@ai-sdk/anthropic";
import { createOpenAI } from "@ai-sdk/openai";
import { convertToCoreMessages, streamText } from "ai";
import { type Message, NotDiamond } from "notdiamond";

const notDiamond = new NotDiamond();

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, model, apiKey } = (await req.json()) as {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    messages: any[];
    model: string;
    apiKey: string;
  };

  let result;

  if (model.startsWith("claude")) {
    const anthropic = createAnthropic({ apiKey });
    result = await streamText({
      model: anthropic("claude-3-5-sonnet-20240620"),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      messages: convertToCoreMessages(messages),
    });
  } else if (model.startsWith("gpt")) {
    const openai = createOpenAI({ apiKey });
    result = await streamText({
      model: openai("gpt-4o"),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      messages: convertToCoreMessages(messages),
    });
  } else if (model === "NotDiamond") {
    const routerResult = await notDiamond.modelSelect({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      messages: messages as Message[],
      llmProviders: [
        { provider: "openai", model: "gpt-4o" },
        { provider: "anthropic", model: "claude-3-5-sonnet-20240620" },
      ],
      tradeoff: "latency",
    });

    if ("detail" in routerResult) {
      throw new Error(`NotDiamond error: ${routerResult.detail}`);
    }

    const selectedProvider = routerResult.providers[0];
    if (!selectedProvider) {
      throw new Error("No provider selected");
    }
    if (selectedProvider.provider === "openai") {
      const openai = createOpenAI({ apiKey });
      result = await streamText({
        model: openai("gpt-4o"),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        messages: convertToCoreMessages(messages),
      });
    } else if (selectedProvider.provider === "anthropic") {
      const anthropic = createAnthropic({ apiKey });
      result = await streamText({
        model: anthropic("claude-3-5-sonnet-20240620"),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        messages: convertToCoreMessages(messages),
      });
    } else {
      throw new Error(`Unsupported provider: ${selectedProvider.provider}`);
    }
  } else {
    throw new Error("Unsupported model");
  }

  return result.toDataStreamResponse();
}
