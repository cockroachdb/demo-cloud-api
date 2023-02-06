import React from 'react'
import PropTypes from 'prop-types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { AppContext } from '../context/app-context'

const ClusterSpendLimit = ({ clusterId, spendLimit, callback }) => {
  const queryClient = useQueryClient()

  const { status: updateStatus, mutate: updateMutate } = useMutation({
    mutationFn: async (event) => {
      event.preventDefault()
      const spendLimit = event.target.elements.spendLimit.value

      const response = await fetch(`/api/cloud/update-spend-limit?id=${clusterId}&value=${spendLimit}`)

      if (!response.ok) {
        throw new Error('Bad Response')
      }

      return response.json()
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [`cluster-${clusterId}`] })
      queryClient.invalidateQueries({ queryKey: ['clusters'] })
      callback()
    }
  })

  return (
    <AppContext.Consumer>
      {({ admin }) => {
        return (
          <div className="flex flex-col gap-4 rounded-lg bg-white shadow p-4 sm:p-8 min-h-[600px] h-full">
            <strong className="flex gap-2 items-center font-bold text-lg text-brand-hidden-sapphire">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                aria-label="Currency Dollar"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Spend Limit
            </strong>

            <div className="flex items-center justify-center h-full">
              <div>
                <strong className="flex gap-2 font-bold text-lg text-yellow-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                    aria-label="Databases icon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                  Nodes Unavailable
                </strong>
                <span className="text-sm text-brand-hidden-saphire">Serverless Plans don't use Nodes.</span>
              </div>
            </div>
            <hr className="mt-0 mb-5" />
            <div>
              <form className="flex flex-col sm:flex-row gap-2 sm:items-end" onSubmit={updateMutate}>
                <label className="flex flex-col gap-1 grow text-xs text-gray-600 font-medium">
                  Spend Limit
                  <input
                    name="spendLimit"
                    type="number"
                    defaultValue={spendLimit}
                    className="disabled:text-gray-400 disabled:cursor-not-allowed"
                    disabled={!admin || updateStatus === 'loading'}
                    required
                  />
                </label>
                <button
                  type="submit"
                  className="text-sm min-w-fit border-brand-electric-purple bg-brand-electric-purple text-white disabled:border-gray-200 disabled:bg-gray-200 disabled:text-brand-evening-hush disabled:cursor-not-allowed"
                  disabled={!admin || updateStatus === 'loading'}
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        )
      }}
    </AppContext.Consumer>
  )
}

ClusterSpendLimit.propTypes = {
  /** The cluster id */
  clusterId: PropTypes.string.isRequired,
  /** The current spend_limit */
  spendLimit: PropTypes.number.isRequired,
  /** callback function to refresh data in [id].js / SSR page */
  callback: PropTypes.func.isRequired
}

export default ClusterSpendLimit
