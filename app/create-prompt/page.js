'use client';
import Form from '@/components/Form';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [prompt, setPrompt] = useState({
    promptMessage: '',
    tag: '',
  });

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const resp = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: prompt.promptMessage,
          userID: session?.user.id,
          tag: prompt.tag,
        }),
      });
      if (resp.ok) {
        router.push('/');
      }
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type='Create'
      post={prompt}
      setPost={setPrompt}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
