import React from 'react'
import PropTypes from 'prop-types'

const StateBadge = ({ state, size, className }) => {
  const getColor = (string) => {
    switch (string) {
      case 'UNSPECIFIED':
        return 'bg-gray-50 border-gray-500 text-gray-800'

      case 'CREATED':
        return 'bg-green-50 border-green-500 text-green-800'

      case 'LIVE':
        return 'bg-green-50 border-green-500 text-green-800'

      case 'LOCKED':
        return 'bg-red-50 border-red-500 text-red-800'

      default:
        return 'bg-gray-50 border-gray-500 text-gray-800'
    }
  }

  return (
    <span
      className={`flex items-center ${
        size === 'lg' ? 'h-6 p-2 text-xs' : 'h-5 p-2 text-xxs'
      } font-bold rounded border ${getColor(state)} ${className}`}
    >
      {state}
    </span>
  )
}

StateBadge.defaultProps = {
  size: 'sm'
}

StateBadge.propTypes = {
  /** Trimmed string of types of state from /api/v1/clusters */
  state: PropTypes.oneOf(['UNSPECIFIED', 'CREATED', 'LOCKED', 'LIVE']).isRequired,
  /** The size of the chip */
  size: PropTypes.oneOf(['sm', 'lg']),
  /** The class names to apply */
  className: PropTypes.string
}

export default StateBadge
