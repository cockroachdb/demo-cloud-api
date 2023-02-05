import React from 'react';
import PropTypes from 'prop-types';

const OperationalStatusBadge = ({ status, size, className }) => {
  const getColor = (string) => {
    switch (string) {
      case 'LIVE':
        return 'bg-green-50 border-green-500 text-green-800';

      case 'RUNNING':
        return 'bg-green-50 border-green-500 text-green-800';

      case 'FAILED':
        return 'bg-red-50 border-red-500 text-red-800';

      case 'NOT_READY':
        return 'bg-gray-50 border-gray-500 text-gray-800';
      default:
        return 'bg-gray-50 border-gray-500 text-gray-800';
    }
  };

  return (
    <span
      className={`flex items-center ${
        size === 'lg' ? 'h-6 p-2 text-xs' : 'h-5 p-2 text-xxs'
      } font-bold rounded border ${getColor(status)} ${className}`}
    >
      {status}
    </span>
  );
};

OperationalStatusBadge.defaultProps = {
  size: 'sm',
};

OperationalStatusBadge.propTypes = {
  /** Trimmed string of types of operational_status from /api/v1/clusters */
  status: PropTypes.oneOf(['UNSPECIFIED', 'RUNNING', 'FAILED', 'LIVE']).isRequired,
  /** The size of the chip */
  size: PropTypes.oneOf(['sm', 'lg']),
  /** The class names to apply */
  className: PropTypes.string,
};

export default OperationalStatusBadge;
