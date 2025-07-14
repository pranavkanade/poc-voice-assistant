import OpenAI from "openai";

export async function getPreview(prd: string) {
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const response = await client.images.generate({
    model: "gpt-image-1",
    prompt: `Generate a Web app UI preview for an application described in the following PRD : ${prd}`,
  });
  // console.log(JSON.stringify(response));
  return response?.data?.[0].b64_json;
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const prd = formData.get("prd") as string;
  const previewResp = await getPreview(prd);
  return Response.json(previewResp);
}
