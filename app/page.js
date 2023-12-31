import Feed from '@/components/Feed';
import React from 'react';

function page() {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>
        Discover & Share <br className='max-md:hidden' />
        <span className='orange_gradient text-center'>AI-Powered Prompts</span>
      </h1>
      <p className='desc text-center'>
        Promptia is an open-source AI prompting tool for discovering, creating
        and sharing creative prompts
      </p>

      <Feed />
    </section>
  );
}

export default page;
