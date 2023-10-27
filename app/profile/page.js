'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Profile from '@/components/profile';

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  //Fetching prompts for individual profile
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/prompts`);
      const data = await response.json();
      console.log(data);

      setPosts(data);
    };

    if (session?.user.id) fetchPosts();
  }, []);
  const handleEdit = () => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = () => {
    router.push(`/delete-prompt?id=${post._id}`);
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
