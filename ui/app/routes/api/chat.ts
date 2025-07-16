import OpenAI from "openai";

import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

export async function action({ request }: { request: Request }) {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response("Invalid messages format", { status: 400 });
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Convert messages to OpenAI format
    const openAIMessages: ChatCompletionMessageParam[] = messages.map(
      (msg: any) => ({
        role: msg.role === "user" ? ("user" as const) : ("assistant" as const),
        content: msg.content,
      }),
    );

    // Add system message for context
    const systemMessage: ChatCompletionMessageParam = {
      role: "system" as const,
      content:
        "You are a helpful AI assistant that helps users build applications. You are knowledgeable about software development, product management, and can help users define their requirements and create applications. Be concise but thorough in your responses.",
    };

    const response = await client.chat.completions.create({
      model: "gpt-4",
      messages: [systemMessage, ...openAIMessages],
      max_tokens: 2000,
      temperature: 0.7,
      stream: true,
    });

    // Create a readable stream for the response
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              controller.enqueue(new TextEncoder().encode(content));
            }
          }
          controller.close();
        } catch (error) {
          console.error("Streaming error:", error);
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
