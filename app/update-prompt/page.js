'use client';
import Form from '@/components/Form';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');

  const [submitting, setSubmitting] = useState(false);
  const [prompt, setPrompt] = useState({
    promptMessage: '',
    tag: '',
  });

  //Getting prompt
  useEffect(() => {
    const getPromptDetails = async () => {
      const resp = await fetch(`/api/prompt/${promptId}`);
      const data = await resp.json();

      setPrompt({ promptMessage: data.prompt, tag: data.tag });
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  /* const createPrompt = async (e) => {
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
  }; */
  return (
    <Form
      type='Edit'
      post={prompt}
      setPost={setPrompt}
      submitting={submitting}
      handleSubmit={() => {}}
    />
  );
};

export default EditPrompt;
