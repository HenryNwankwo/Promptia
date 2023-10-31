'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

function PromptCard({ post, handleTagClick, handleEdit, handleDelete }) {
  const [copied, setCopied] = useState('');
  const { data: session } = useSession();
  const router = useRouter();
  const pathName = usePathname();
  const tags = post.tag.split(',');
  //HAndling copying of prompts
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(''), 3000);
  };

  //Showing profile of creator

  const showProfile = () => {
    if (session?.user.id === post.creator._id) {
      router.push('/profile');
    } else {
      router.push(
        `/profile/${post.creator._id}/?name=${post.creator.username}`
      );
    }
  };
  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        {/* Prompt creator info */}
        <div
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          onClick={showProfile}
        >
          <Image
            src={post.creator.image}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />
          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {post.creator.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {post.creator.email}
            </p>
          </div>
        </div>

        {/* Copy prompt group */}
        <div className='copy_btn' onClick={() => handleCopy()}>
          <Image
            src={
              copied === post.prompt
                ? '/assets/icons/tick.svg'
                : '/assets/icons/copy.svg'
            }
            width={12}
            height={12}
            alt='copy'
          />
        </div>
      </div>
      <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
      <p className='flex font-inter text-sm blue_gradient cursor-pointer gap-1 flex-wrap'>
        {tags.map((item, index) => (
          <button
            className='px-2 py-0.5 bg-blue-100 rounded-xl text-blue-900'
            key={index}
            onClick={() => handleTagClick && handleTagClick(item.trim())}
          >
            {item.trim()}
          </button>
        ))}
      </p>

      {/* Edit and delete  */}

      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p
            className='green_gradient font-inter text-sm cursor-pointer'
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className='orange_gradient font-inter text-sm cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
}

export default PromptCard;
