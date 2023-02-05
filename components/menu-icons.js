import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const MenuIcons = ({ className, isNavOpen }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className={`w-6 h-6 ${className}`}
      aria-label={isNavOpen ? 'Close menu' : 'Open menu'}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d={isNavOpen ? 'M6 18L18 6M6 6l12 12' : 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'}
      />
    </svg>
  );
};

MenuIcons.propTypes = {
  /** The class names to apply */
  className: PropTypes.string,
  /** Determins which svg path to display */
  isNavOpen: PropTypes.bool.isRequired,
};

export default MenuIcons;
