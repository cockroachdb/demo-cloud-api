import React from 'react';
import PropTypes from 'prop-types';

const DonutChart = ({ statuses }) => {
  const incrementAngle = 360 / statuses.length;

  const getColor = (string) => {
    switch (string) {
      case 'RUNNING':
        return 'var(--color-green-500)';

      case 'FAILED':
        return 'var(--color-red-500)';

      default:
        return 'var(--color-gray-500)';
    }
  };

  const colors = statuses.map((status) => `${getColor(status)}`);
  const angles = new Array(statuses.length).fill().map((_, index) => `${incrementAngle * index}deg`);

  const conicString = statuses
    .map((_, index) => {
      const startAngle = `${incrementAngle * index}deg`;
      return `${colors[index]} ${startAngle} ${angles[index + 1] || angles.at(-1)}`;
    })
    .join();

  return (
    <div className='relative flex-1 mx-auto'>
      <div className='absolute w-full h-full -left-1'>
        {statuses.map((_, index) => {
          return (
            <div
              key={index}
              className='absolute w-2 h-full top-[0px] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-brand-narwhal-grey'
              style={{
                transform: `rotate(${angles[index]})`,
              }}
            />
          );
        })}
      </div>
      <div className='absolute flex items-center justify-center rounded-full bg-brand-narwhal-grey w-4/6 h-4/6 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2'>
        <div className='mb-3 leading-none'>
          <strong className='block font-black text-2xl text-center text-brand-starfleet-blue'>Status</strong>
          <small className='flex gap-2 items-center text-xxs text-center text-brand-light'>
            <span className='relative h-2 w-2'>
              <span className='absolute w-full h-full rounded-full bg-brand-starfleet-blue motion-safe:animate-ping '></span>
              <span className='absolute w-full h-full rounded-full bg-brand-starfleet-blue'></span>
            </span>
            /api/v1/clusters
          </small>
        </div>
      </div>
      <div
        role='presentation'
        className='rounded-full w-[190px] h-[190px]'
        style={{
          background: `conic-gradient(${conicString})`,
        }}
      />
    </div>
  );
};

DonutChart.propTypes = {
  /** Trimmed string of types of operational_status from /api/v1/clusters */
  statuses: PropTypes.arrayOf(PropTypes.oneOf(['UNSPECIFIED', 'RUNNING', 'FAILED'])).isRequired,
};

export default DonutChart;
