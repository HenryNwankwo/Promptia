import React from 'react';
import Skeleton from 'react-loading-skeleton';

function SkeletonCard() {
  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        {/* Prompt creator info */}
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
          <Skeleton circle width={40} height={40} />

          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              <Skeleton />
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              <Skeleton />
            </p>
          </div>
        </div>

        {/* Copy prompt group */}
        <div className='copy_btn'>
          <Skeleton circle width={12} height={12} />
        </div>
      </div>
      <p className='my-4 font-satoshi text-sm text-gray-700'>
        <Skeleton count={3} style={{ marginBottom: '.5rem' }} />
      </p>
      <p className='flex font-inter text-sm blue_gradient cursor-pointer gap-1 flex-wrap'>
        {[...Array(3).keys()].map((item) => (
          <Skeleton width={40} height={12} key={item} />
        ))}
      </p>
    </div>
  );
}

export default SkeletonCard;
