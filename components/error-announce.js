import React from 'react';

const ErrorAnnounce = () => {
  return (
    <div className='flex gap-1 items-center w-full self-start p-2 rounded text-sm font-bold text-red-400 bg-red-50 border border-red-700'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={2}
        stroke='currentColor'
        className='w-5 h-5'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z'
        />
      </svg>
      <span>Error</span>
    </div>
  );
};

export default ErrorAnnounce;
