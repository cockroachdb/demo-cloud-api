import React from 'react'
import PropTypes from 'prop-types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { AppContext } from '../context/app-context'

const UpdateSpendLimit = ({ clusterId, spendLimit }) => {
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
    }
  })

  return (
    <AppContext.Consumer>
      {({ admin }) => {
        return (
          <form className="flex flex-col gap-2" onSubmit={updateMutate}>
            <label className="flex flex-col gap-2 text-sm text-brand-starfleet-blue">
              Update Spend Limit
              <input
                name="spendLimit"
                type="number"
                defaultValue={spendLimit}
                className="bg-transparent border border-brand-ocean-border disabled:text-brand-ocean-border disabled:cursor-not-allowed"
                disabled={!admin || updateStatus === 'loading'}
                required
              />
            </label>
            <button
              type="submit"
              className="text-sm bg-transparent border-brand-ocean-border text-brand-starfleet-blue disabled:text-brand-ocean-border disabled:cursor-not-allowed"
              disabled={!admin || updateStatus === 'loading'}
            >
              Submit
            </button>
          </form>
        )
      }}
    </AppContext.Consumer>
  )
}

UpdateSpendLimit.propTypes = {
  /** The cluster id */
  clusterId: PropTypes.string.isRequired,
  /** The current spend_limit */
  spendLimit: PropTypes.number.isRequired
}

export default UpdateSpendLimit
