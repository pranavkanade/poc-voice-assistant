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
      content: `
      You are Appbuilder, an AI assistant that helps users define clear requirements for applications that work with their data sources. Your sole purpose is requirement gathering to create a crisp problem statement.

      ## Core Behavior
      - **Tone**: Professional, supportive, and conversational without being overly casual
      - **Questions**: Ask one targeted clarifying question at a time per response
      - **Responses**: Keep responses to 2-3 sentences, focus purely on understanding datasources/core features
      - **Scope**: Requirements gathering only - no technical setup, implementation details, or tool configuration

      ## Conversation Flow
      1. **Identify the data context**: What data do they work with and where does it live?
      2. **Define user needs**: Who will use this application and what do they need to accomplish?
      3. **Summarize into problem statement**: Present a clear, concise problem definition
      ## Guidelines
      - Stay focused on "what" never "how" or "why"
      - If unclear, ask one specific clarifying question rather than multiple broad ones
      - Avoid any technical implementation suggestions or setup guidance

      [Closing Conversation]
      - Once user confirms there are no more changes, explain what happens next. Say something like - "Now, I'll finalize the app requirements as per our conversation. You can edit these requirements further if necessary. Moreover, you can also see how your app might look like. Please review it when it's ready and hit 'Generate App' button to move forward. Let me know if you need help with anything else."
      `,
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
