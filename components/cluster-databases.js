import React, { Fragment, useRef } from 'react'
import PropTypes from 'prop-types'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { AppContext } from '../context/app-context'

import ErrorAnnounce from './error-announce'
import Loading from './loading'

const ClusterDatabases = ({ clusterId }) => {
  const formRef = useRef()
  const queryClient = useQueryClient()

  const { status: databasesStatus, data: databases } = useQuery({
    queryKey: [`databases-${clusterId}`],
    queryFn: async () => {
      const response = await fetch(`/api/cloud/databases-by-id?id=${clusterId}`)

      if (!response.ok) {
        throw new Error('Bad Response')
      }

      return response.json()
    }
  })

  const { status: createStatus, mutate: createMutate } = useMutation({
    mutationFn: async (event) => {
      event.preventDefault()
      const name = event.target.elements.name.value

      const response = await fetch(`/api/cloud/create-database?id=${clusterId}&name=${name}`)

      if (!response.ok) {
        throw new Error('Bad Response')
      }

      return response.json()
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [`databases-${clusterId}`] })
      formRef.current.reset()
    }
  })

  const { status: deleteStatus, mutate: deleteMutate } = useMutation({
    mutationFn: async (name) => {
      const response = await fetch(`/api/cloud/delete-database?id=${clusterId}&name=${name}`)

      if (!response.ok) {
        throw new Error('Bad Response')
      }

      return response.json()
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [`databases-${clusterId}`] })
    }
  })

  return (
    <AppContext.Consumer>
      {({ admin }) => {
        return (
          <div className="flex flex-col gap-4 rounded-lg bg-brand-light shadow p-4 sm:p-8 min-h-[600px] h-full overflow-x-scroll">
            <strong className="flex gap-2 items-center font-bold text-lg text-brand-hidden-sapphire">
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
                  d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                />
              </svg>
              Databases
            </strong>
            <div className={`h-full flex ${databases ? 'flex-col' : ''} `}>
              {databasesStatus === 'error' ? <ErrorAnnounce /> : null}
              {databasesStatus == 'loading' ? <Loading className="mx-auto self-center" /> : null}
              {databases ? (
                <Fragment>
                  <div className="overflow-x-scroll h-[365px] rounded border border-brand-neutral-100">
                    <table className="table-auto text-sm text-left m-0">
                      <thead className="border-b border-b-brand-neutral-400 text-brand-hidden-saphire">
                        <tr>
                          <td className="px-2 py-4">Name</td>
                          <td className="px-2 py-4">Table Count</td>
                          <td className="px-2 py-4 text-right">Delete</td>
                        </tr>
                      </thead>
                      <tbody>
                        {databases.data.map((database, index) => {
                          const { name, table_count } = database

                          return (
                            <tr key={index} className="odd:bg-brand-gray-f4 font-medium">
                              <td className="whitespace-nowrap font-bold p-2">{name}</td>
                              <td className="whitespace-nowrap p-2">{table_count}</td>
                              <td className="whitespace-nowrap p-2 text-right">
                                {name !== 'defaultdb' ? (
                                  <button
                                    type="button"
                                    className="p-2 bg-red-500 border-red-500 disabled:border-gray-200 text-brand-light disabled:bg-gray-200 disabled:text-brand-evening-hush disabled:cursor-not-allowed"
                                    disabled={!admin || createStatus === 'loading' || deleteStatus === 'loading'}
                                    onClick={() => deleteMutate(name)}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={2}
                                      stroke="currentColor"
                                      className="w-4 h-4"
                                      aria-label="delete"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                      />
                                    </svg>
                                  </button>
                                ) : null}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="my-8">
                    <hr className="my-0" />
                    {createStatus === 'error' || deleteStatus === 'error' ? <ErrorAnnounce /> : null}
                  </div>
                  <form ref={formRef} className="flex flex-col sm:flex-row gap-2 sm:items-end" onSubmit={createMutate}>
                    <label className="flex flex-col gap-1 grow text-xs text-gray-600 font-medium">
                      Database name
                      <input
                        name="name"
                        type="text"
                        placeholder="some-name"
                        className="disabled:text-gray-400 disabled:cursor-not-allowed"
                        disabled={!admin || createStatus === 'loading' || deleteStatus === 'loading'}
                        required
                      />
                    </label>
                    <button
                      type="submit"
                      className="text-sm min-w-fit border-brand-starfleet-blue bg-brand-starfleet-blue text-brand-light disabled:border-gray-200 disabled:bg-gray-200 disabled:text-brand-evening-hush disabled:cursor-not-allowed"
                      disabled={!admin || createStatus === 'loading' || deleteStatus === 'loading'}
                    >
                      Create
                    </button>
                  </form>
                </Fragment>
              ) : null}
            </div>
          </div>
        )
      }}
    </AppContext.Consumer>
  )
}

ClusterDatabases.propTypes = {
  /** The id of the cluster */
  clusterId: PropTypes.string.isRequired
}

export default ClusterDatabases
