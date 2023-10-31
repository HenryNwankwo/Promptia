'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Profile from '@/components/profile';

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const [userPosts, setUserPosts] = useState([]);
  const username = searchParams.get('name');

  //Fetching prompts for individual profile
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (params?.id) {
          const response = await fetch(`/api/users/${params?.id}/prompts`);
          const data = await response.json();

          setUserPosts(data);
        }
      } catch (err) {
        console.log('Error fetching profile prompts: ', err);
      }
    };

    fetchPosts();
  }, [params?.id]);

  return (
    <Profile
      name={username}
      desc={`Welcome to ${username} personalized profile page. Explore ${username}'s exceptional prompts and be inspired by the power of their imagination!`}
      data={userPosts}
    />
  );
};

export default UserProfile;
