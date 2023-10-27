'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Profile from '@/components/profile';

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  //Fetching prompts for individual profile
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        `/api/users/prompt${session?.user.id}/prompts`
      );
      const data = await response.json();

      setPosts(data);
    };

    if (session?.user.id) fetchPosts();
  }, []);
  const handleEdit = () => {};
  const handleDelete = () => {};
  return (
    <Profile
      name={''}
      desc={''}
      handleEdit={handleEdit}
      data={posts}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
