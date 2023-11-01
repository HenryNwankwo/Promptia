import PromptCard from './PromptCard';
import SkeletonCard from './SkeletonCard';

function Profile({ name, desc, data, handleDelete, handleEdit, loading }) {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='desc text-left'>{desc}</p>
      {loading ? (
        <div className='mt-16 prompt_layout'>
          {[...Array(4).keys()].map((item) => (
            <SkeletonCard key={item} />
          ))}
        </div>
      ) : data.length <= 0 ? (
        <p className='mt-16 text-gray-500 text-lg'>No available prompt!</p>
      ) : (
        <div className='mt-16 prompt_layout'>
          {data.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Profile;
