import { connectToDB } from '@/utils/db';

export const POST = async (req) => {
  const { userID, prompt, tag } = await req.json();

  try {
    await connectToDB();
  } catch (error) {
    console.log(error);
  }
};
