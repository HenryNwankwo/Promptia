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

// DELETE (delete)
