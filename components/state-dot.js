import React from 'react'
import PropTypes from 'prop-types'

const StateDot = ({ state }) => {
  const getColor = (string) => {
    switch (string) {
      case 'CREATED':
        return 'text-green-500'

      case 'LOCKED':
        return 'text-red-500'

      default:
        return 'text-gray-500'
    }
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`w-2 h-2 mt-0.5 ${getColor(state)}`}
    >
      <circle cx="12" cy="12" r="12" />
    </svg>
  )
}

StateDot.propTypes = {
  /** Trimmed string of types of state from /api/v1/clusters */
  state: PropTypes.oneOf(['UNSPECIFIED', 'CREATED', 'FAILED']).isRequired
}

export default StateDot
