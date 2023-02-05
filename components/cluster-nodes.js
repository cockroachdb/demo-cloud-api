import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { useQuery } from '@tanstack/react-query';

import OperationalStatusBadge from './operational-status-badge';
import ErrorAnnounce from './error-announce';
import Loading from './loading';

const ClusterNodes = ({ clusterId }) => {
  const { status: nodesStatus, data: nodes } = useQuery({
    queryKey: [`nodes-${clusterId}`],
    queryFn: async () => {
      const response = await fetch(`/api/cloud/nodes-by-id?id=${clusterId}`);

      if (!response.ok) {
        throw new Error('Bad Response');
      }

      return response.json();
    },
  });

  return (
    <div className='flex flex-col gap-4 rounded-lg bg-brand-light shadow p-4 sm:p-8 min-h-[500px] h-full overflow-x-scroll'>
      <strong className='flex gap-2 items-center font-bold text-lg text-brand-hidden-sapphire'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
          aria-label='Nodes icon'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z'
          />
        </svg>
        Nodes
      </strong>
      <div className={`h-full flex ${nodes ? 'flex-col' : ''} `}>
        {nodesStatus === 'error' ? <ErrorAnnounce /> : null}
        {nodesStatus == 'loading' ? <Loading className='mx-auto self-center' /> : null}
        {nodes ? (
          <Fragment>
            <div className='overflow-x-scroll h-[480px] rounded border border-brand-neutral-100'>
              <table className='table-auto text-sm text-left m-0'>
                <thead className='border-b border-b-brand-neutral-400 text-brand-hidden-saphire'>
                  <tr>
                    <td className='px-2 py-4'>Name</td>
                    <td className='px-2 py-4'>Region</td>
                    <td className='px-2 py-4 text-right'>Status</td>
                  </tr>
                </thead>
                <tbody>
                  {nodes.data.map((node, index) => {
                    const { name, region_name, status } = node;
                    return (
                      <tr key={index} className='odd:bg-brand-gray-f4 font-medium'>
                        <td className='whitespace-nowrap font-bold p-2'>{name}</td>
                        <td className='whitespace-nowrap p-2'>{region_name}</td>
                        <td className='whitespace-nowrap flex p-2 justify-end'>
                          <OperationalStatusBadge status={status} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Fragment>
        ) : null}
      </div>
    </div>
  );
};

ClusterNodes.propTypes = {
  /** The id of the cluster */
  clusterId: PropTypes.string.isRequired,
};

export default ClusterNodes;
