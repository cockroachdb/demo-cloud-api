import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ClusterPanel = ({ title, paths, properties }) => {
  return (
    <article className='flex flex-col  gap-2 border border-brand-ocean-green p-4 rounded-b-lg xl:rounded-b-none sm:rounded-t-lg bg-gradient-radial from-brand-ocean-green to-brand-narwhal-grey'>
      <strong className='flex gap-2 items-center font-bold text-brand-light'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={2}
          stroke='currentColor'
          className='w-5 h-5'
          aria-label={`${title} icon`}
        >
          {paths.map((path, index) => {
            return <path key={index} strokeLinecap='round' strokeLinejoin='round' d={path} />
          })}
        </svg>
        {title}
      </strong>
      <hr className='mt-0 mb-2 border-brand-ocean-border' />
      <div className='grid xl:grid-cols-2 gap-4'>
        {properties.map((property, index) => {
          const { label, value } = property

          return (
            <div key={index} className='flex flex-col xl:even:text-right xl:even:items-end even:grow'>
              <small className='text-sm text-brand-starfleet-blue'>{label}</small>
              <strong className='text-white font-black text-sm capitalize'>{value}</strong>
            </div>
          )
        })}
      </div>
    </article>
  )
}

ClusterPanel.propTypes = {
  /** The title of the panel */
  title: PropTypes.string.isRequired,
  /** The paths for the icons */
  paths: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** The items to display */
  properties: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.element]).isRequired
    })
  )
}

export default ClusterPanel
