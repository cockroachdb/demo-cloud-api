import React from 'react'
import PropTypes from 'prop-types'

const CockroachLabsLogo = ({ color }) => {
  return (
    <a href='https://www.cockroachlabs.com/' target='_blank' rel='noopener'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        x='0px'
        y='0px'
        viewBox='0 0 170 24'
        aria-label='Cockroach Labs Logo'
        className='w-[170px]'
      >
        <g>
          <path
            className={`fill-${color}`}
            d='M48.45,13.72c0,3.32-2.17,5.61-5.26,5.61c-3.12,0-5.28-2.29-5.28-5.61c0-3.32,2.17-5.61,5.28-5.61
			C46.28,8.11,48.45,10.4,48.45,13.72z M39.81,13.72c0,2.39,1.32,4.06,3.38,4.06c2.06,0,3.36-1.66,3.36-4.06
			c0-2.39-1.3-4.06-3.36-4.06C41.13,9.66,39.81,11.33,39.81,13.72z'
          />
          <path
            className={`fill-${color}`}
            d='M77,10.17c-0.55-0.16-0.99-0.22-1.41-0.22c-1.43,0-2.49,1.23-2.49,3.39v5.7h-1.86V8.41h1.75v1.6
			c0.5-1.04,1.39-1.77,2.64-1.77C76.52,8.24,77,8.5,77,8.5L77,10.17z'
          />
          <path
            className={`fill-${color}`}
            d='M88.15,13.72c0,3.32-2.17,5.61-5.26,5.61c-3.12,0-5.28-2.29-5.28-5.61c0-3.32,2.17-5.61,5.28-5.61
			C85.99,8.11,88.15,10.4,88.15,13.72z M79.51,13.72c0,2.39,1.32,4.06,3.38,4.06c2.06,0,3.36-1.66,3.36-4.06
			c0-2.39-1.3-4.06-3.36-4.06C80.83,9.66,79.51,11.33,79.51,13.72z'
          />
          <path
            className={`fill-${color}`}
            d='M94.59,8.11c-1.62,0-3.04,0.65-4.31,1.6v1.92c0.87-0.7,2.51-1.98,4.38-1.98
			c0.82,0,1.5,0.23,1.94,0.67c0.18,0.17,0.3,0.36,0.38,0.55c0.3,0.68-0.13,1.46-0.86,1.59l-1.35,0.24
			c-2.66,0.47-4.96,1.21-4.96,3.69c0,2.11,1.73,2.98,3.81,2.98c1.6,0,2.9-0.58,3.62-1.66v1.32h1.69v-7.38
			C98.92,9.58,97.41,8.11,94.59,8.11z M97.15,13.56v1.49c0,1.75-1.49,2.78-3.33,2.78c-1.36,0-2.19-0.54-2.19-1.51
			c0-0.48,0.16-0.85,0.45-1.14C93.14,14.14,96.27,14.16,97.15,13.56z'
          />
          <path
            className={`fill-${color}`}
            d='M120.23,11.76v7.27h-1.86v-6.69c0-1.75-0.87-2.65-2.45-2.65c-1.54,0-2.75,1.19-2.75,2.76v6.58
			h-1.86V4.95h1.86v4.67c0.71-0.99,1.88-1.51,3.25-1.51C119,8.11,120.23,9.77,120.23,11.76z'
          />
          <path className={`fill-${color}`} d='M130.1,17.34h6.25v1.68h-8.25V4.95h1.99V17.34z' />
          <path
            className={`fill-${color}`}
            d='M159.67,13.72c0,3.37-1.99,5.59-4.7,5.59c-1.69,0-2.9-0.67-3.64-1.88v1.6h-1.75V4.95h1.86V9.9
			c0.74-1.12,1.93-1.77,3.53-1.77C157.72,8.13,159.67,10.35,159.67,13.72z M157.76,13.72c0-2.39-1.21-4.01-3.08-4.01
			c-1.93,0-3.31,1.49-3.31,4.01c0,2.55,1.41,3.99,3.31,3.99C156.53,17.71,157.76,16.11,157.76,13.72z'
          />
          <path
            className={`fill-${color}`}
            d='M58.02,16.72c0,0-1.3,0.92-2.78,0.92c-2.79,0-3.27-2.9-3.27-3.94c0-0.57,0.19-3.91,3.35-3.91
			c1.43,0,2.7,0.69,2.7,0.69V8.79c-1.01-0.57-2.06-0.72-2.78-0.72c-3.28,0-5.18,2.67-5.18,5.52c0,4.97,3.73,5.73,5.09,5.73
			c0.6,0,1.85-0.1,2.87-0.75V16.72z'
          />
          <path
            className={`fill-${color}`}
            d='M108.99,16.72c0,0-1.3,0.92-2.78,0.92c-2.79,0-3.27-2.9-3.27-3.94c0-0.57,0.19-3.91,3.35-3.91
			c1.43,0,2.7,0.69,2.7,0.69V8.79c-1.01-0.57-2.06-0.72-2.78-0.72c-3.28,0-5.18,2.67-5.18,5.52c0,4.97,3.73,5.73,5.09,5.73
			c0.6,0,1.85-0.1,2.87-0.75V16.72z'
          />
          <path
            className={`fill-${color}`}
            d='M67.69,19.03h2.08l-4.28-6.38l0,0c1.07-1.29,1.96-2.71,2.64-4.23l-2.03,0
			c-0.95,1.88-2.26,3.57-3.88,4.97V4.95h-1.86v14.07h1.86v-3.32c0.75-0.54,1.44-1.13,2.09-1.77L67.69,19.03z'
          />
          <path
            className={`fill-${color}`}
            d='M142.81,8.11c-1.62,0-3.04,0.65-4.31,1.6v1.92c0.87-0.7,2.51-1.98,4.38-1.98
			c0.82,0,1.5,0.23,1.94,0.67c0.18,0.17,0.3,0.36,0.38,0.55c0.3,0.68-0.13,1.46-0.86,1.59l-1.35,0.24
			c-2.66,0.47-4.96,1.21-4.96,3.69c0,2.11,1.73,2.98,3.81,2.98c1.6,0,2.9-0.58,3.62-1.66v1.32h1.69v-7.38
			C147.14,9.58,145.63,8.11,142.81,8.11z M145.37,13.56v1.49c0,1.75-1.49,2.78-3.33,2.78c-1.36,0-2.19-0.54-2.19-1.51
			c0-0.48,0.16-0.85,0.45-1.14C141.36,14.14,144.49,14.16,145.37,13.56z'
          />
          <path
            className={`fill-${color}`}
            d='M165.97,12.77c-1.95-0.43-2.86-0.65-2.86-1.58c0-0.91,0.89-1.58,2.34-1.58
			c1.28,0,2.15,0.34,3.88,1.63V9.3c-1.23-0.86-2.35-1.19-3.88-1.19c-2.47,0-4.14,1.29-4.14,3.15c0,1.77,1.04,2.39,3.88,3
			c1.71,0.37,2.99,0.69,2.99,1.86c0,1.06-1.04,1.68-2.43,1.68c-1.41,0-2.17-0.4-4.26-1.95l0,0.02v2.03
			c1.39,1.06,2.62,1.43,4.24,1.43c2.58,0,4.27-1.34,4.27-3.3C170,14.15,168.74,13.4,165.97,12.77z'
          />
          <path
            className={`fill-${color}`}
            d='M31.74,17.53c-4.78,0-4.7-4.97-4.7-5.55c0-5.3,4.02-5.45,4.87-5.45c1.65,0,3,0.61,4.23,1.68V6.06
			c-0.88-0.61-2.26-1.38-4.23-1.38c-2.54,0-6.83,1.54-6.83,7.31c0,0.55,0.08,2.5,1.12,4.3c1.16,1.99,3.07,3.04,5.54,3.04
			c1.98,0,3.17-0.65,4.4-1.54v-2.15C34.54,16.87,33.68,17.53,31.74,17.53z'
          />
        </g>
        <path
          className='fill-transparent'
          d='M10.27,15.04v6.84c6.14-5.66,3.52-12.36,3.52-12.36c-0.58,1.08-2.06,2.6-2.06,2.6
	C10.06,13.43,10.27,15.04,10.27,15.04z'
        />
        <path
          className='fill-transparent'
          d='M7.51,12.11c0,0-1.47-1.52-2.06-2.6c0,0-2.61,6.7,3.52,12.36v-6.84C8.97,15.04,9.18,13.43,7.51,12.11z'
        />
        <path
          className='fill-transparent'
          d='M9.64,3.64c0,0-0.01,0.01-0.01,0.01c0,0-0.01-0.01-0.01-0.01v0.02c-6.34,4.61-0.76,7.77,0.01,8.53v0.01
	c0,0,0,0,0.01-0.01c0,0,0,0,0.01,0.01v-0.01c0.76-0.76,6.35-3.91,0.01-8.53V3.64z'
        />
        <linearGradient id='logo-gradient' gradientUnits='userSpaceOnUse' x1='0' y1='12' x2='19.2675' y2='12'>
          <stop
            offset='0.3'
            className='[--start-color:theme(colors.brand.electric-purple)]'
            stopColor='var(--start-color)'
          />
          <stop
            offset='1'
            className='[--end-color:theme(colors.brand.bright-turquoise)]'
            stopColor='var(--end-color)'
          />
        </linearGradient>
        <path
          fill='url(#logo-gradient)'
          d='M16.65,0c-2.59,0-5,0.75-7.03,2.04C7.6,0.75,5.19,0,2.6,0C1.71,0,0.84,0.09,0,0.26l0.31,1.29
	C1.05,1.4,1.82,1.33,2.6,1.33c2.13,0,4.13,0.57,5.85,1.56C5.48,5.27,3.58,8.92,3.58,13.02s1.9,7.75,4.87,10.14
	c0.37,0.3,0.77,0.58,1.17,0.84c0.41-0.26,0.8-0.54,1.17-0.84c2.97-2.39,4.87-6.04,4.87-10.14s-1.9-7.75-4.87-10.14
	c1.72-0.99,3.72-1.56,5.85-1.56c0.79,0,1.56,0.08,2.3,0.23l0.31-1.29C18.42,0.09,17.55,0,16.65,0z M8.97,15.04v6.84
	C2.84,16.21,5.45,9.51,5.45,9.51c0.58,1.08,2.06,2.6,2.06,2.6C9.18,13.43,8.97,15.04,8.97,15.04z M10.27,21.88v-6.84
	c0,0-0.21-1.6,1.46-2.92c0,0,1.47-1.52,2.06-2.6C13.79,9.51,16.41,16.21,10.27,21.88z M9.63,12.18v0.01
	C9.63,12.19,9.63,12.19,9.63,12.18c-0.01,0.01-0.01,0.01-0.01,0.01v-0.01c-0.76-0.76-6.35-3.91-0.01-8.53V3.64
	c0,0,0.01,0.01,0.01,0.01c0,0,0.01-0.01,0.01-0.01v0.02C15.98,8.27,10.39,11.42,9.63,12.18z'
        />
      </svg>
    </a>
  )
}

CockroachLabsLogo.defaultProps = {
  color: 'brand-light'
}

CockroachLabsLogo.propTypes = {
  /** Colour of the text */
  color: PropTypes.string
}

export default CockroachLabsLogo
