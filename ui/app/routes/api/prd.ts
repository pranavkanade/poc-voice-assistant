import OpenAI from "openai";

export async function getPRD(conversation: string) {
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const response = await client.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content:
          "You are a product manager who creates detailed Product Requirements Documents (PRDs) based on user conversations. Analyze the conversation and create a comprehensive PRD that includes: 1) Summary, 2) Objectives, 3) Functional Requirements, 4) Technical Requirements",
      },
      {
        role: "user",
        content: `Based on the following conversation, create a detailed PRD:\n\n${conversation}`,
      },
    ],
    max_tokens: 2000,
    temperature: 0.7,
  });
  console.log(response);
  return response.choices[0].message.content;
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const userConversation = formData.get("conversation") as string;
  const prdResp = await getPRD(userConversation);
  return Response.json(prdResp);
}
