import React from 'react'
import PropTypes from 'prop-types'

const OperationalStatusDot = ({ status }) => {
  const getColor = (string) => {
    switch (string) {
      case 'RUNNING':
        return 'text-green-500'

      case 'FAILED':
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
      className={`w-2 h-2 mt-0.5 ${getColor(status)}`}
    >
      <circle cx="12" cy="12" r="12" />
    </svg>
  )
}

OperationalStatusDot.propTypes = {
  /** Trimmed string of types of operational_status from /api/v1/clusters */
  status: PropTypes.oneOf(['UNSPECIFIED', 'RUNNING', 'FAILED']).isRequired
}

export default OperationalStatusDot
