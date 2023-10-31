'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Profile from '@/components/Profile';

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  //Fetching prompts for individual profile
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/prompts`);
      const data = await response.json();

      setPosts(data);
    };

    if (session?.user.id) fetchPosts();
  }, []);
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const itsConfirmed = confirm(
      'Are you sure you want to delete this prompt?'
    );
    if (itsConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, { method: 'DELETE' });

        const filteredPrompts = posts.filter(
          (prompt) => prompt._id !== post._id
        );

        setPosts(filteredPrompts);
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <Profile
      name={'My'}
      desc={'Welcome to your personalized profile page'}
      handleEdit={handleEdit}
      data={posts}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
