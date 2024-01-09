import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();
  try {
    await connectToDB(); // Lambda func 이기 때문에 매번 불러줘야함
    const newPrompt = new Prompt({ creator: userId, prompt, tag });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt, { status: 201 }));
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
