import Anthropic from "@anthropic-ai/sdk";

import envConfig from "src/envConfig";
export async function askClaude(question: string) {
  try {
    if (!envConfig.CLAUDE_API_KEY) {
      throw new Error("Claude API key is not configured. Please set CLAUDE_API_KEY in your environment.");
    }

    const client = new Anthropic({
      apiKey: envConfig.CLAUDE_API_KEY,
      dangerouslyAllowBrowser: true,
    });

    const message = await client.messages.create({
      model: "claude-3-sonnet-20240320",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: question,
        },
      ],
    });

    if (message.content[0].type === "text") {
      return message.content[0].text;
    } else {
      throw new Error("Unexpected response type");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
