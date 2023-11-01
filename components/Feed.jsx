'use client';
import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';

//Containing on the prompt cards
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

function Feed() {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  //Filtering prompts

  const filterPrompts = (value) => {
    const regex = new RegExp(value, 'i');

    return posts.filter(
      (post) =>
        regex.test(post.tag) ||
        regex.test(post.prompt) ||
        regex.test(post.creator.username)
    );
  };

  // filtering prompts by search input change
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);

    const filteredPrompts = filterPrompts(e.target.value);
    setFilteredPosts(filteredPrompts);
  };

  // filtering prompts by tag click
  const handleTagClick = (tag) => {
    setSearchText(tag);
    const filteredPrompts = filterPrompts(tag);
    setFilteredPosts(filteredPrompts);
  };

  //Fetching prompts for feed
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/prompt');
        const data = await response.json();
        setFilteredPosts(data);
        setPosts(data);
        setLoading((prev) => (prev === true ? false : prev));
      } catch (err) {
        console.log('Error fetching prompts: ', err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className='feed'>
      <form action='' className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={(e) => handleSearchChange(e)}
          required
          className='search_input peer'
        />
      </form>
      {loading ? (
        <p>Loading</p>
      ) : (
        <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
}

export default Feed;
