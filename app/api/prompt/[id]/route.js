// GET (read)

import Prompt from '@/models/prompt';
import { connectToDB } from '@/utils/db';

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const onePrompt = await Prompt.findById(params.id).populate('creator');

    if (!onePrompt) return new Response('Prompt not found!', { status: 404 });

    return new Response(JSON.stringify(onePrompt), { status: 200 });
  } catch (err) {
    return new Response('Failed to fetch prompt', { status: 500 });
  }
};

// PATCH (update)
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt)
      return new Response('Prompt not found! ', { status: 404 });

    //updating prompt
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (err) {
    return new Response('Failed to update prompt! ', { status: 500 });
  }
};

// DELETE (delete)
