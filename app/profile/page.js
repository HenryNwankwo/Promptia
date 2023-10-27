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
      const response = await fetch(`/api/users/${session?.user.id}/prompts`);
      const data = await response.json();
      console.log(data);

      setPosts(data);
    };

    if (session?.user.id) fetchPosts();
  }, []);
  const handleEdit = () => {};
  const handleDelete = () => {};
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
