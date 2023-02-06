import React, { useState, useReducer } from 'react'
import PropTypes from 'prop-types'

import { initialState, reducer } from '../hooks/use-reducer'

import MarketoForm from './marketo-form'

const NewsletterForm = ({ formId }) => {
  const [email, setEmail] = useState('')
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleSubmit = (event) => {
    event.preventDefault()

    dispatch({
      type: 'isSubmitting'
    })

    window.MktoForms2.getForm(formId)
      .vals({ Email: email })
      .onSuccess(() => {
        dispatch({
          type: 'success'
        })
        setEmail('')
        return false
      })
      .submit()
  }

  return (
    <section className="bg-white rounded-lg shadow px-4 py-8 sm:p-8">
      <div className="flex flex-col mx-auto md:max-w-md gap-1">
        <strong className="flex gap-2 items-center justify-center font-bold text-lg text-brand-hidden-sapphire">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
            aria-label="Cluster icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3"
            />
          </svg>
          Newsletter
        </strong>
        <p className="text-center text-sm text-brand-hidden-saphire m-0">
          Latest CockroachDB news - blogs - webinars - videos <br /> and what we're reading.
        </p>
        <div className="w-full pt-6">
          <form onSubmit={handleSubmit} className="flex gap-2 items-end">
            <label className="flex flex-col gap-1 grow text-xs text-gray-600 font-medium">
              <span className="after:content-['*'] after:mt-0.5 after:text-red-500 flex gap-1 grow text-xs text-gray-600 font-medium">
                Email
              </span>
              <input
                className="disabled:text-gray-400 disabled:cursor-not-allowed"
                type="email"
                required
                placeholder="you@example.xyz"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </label>

            <button
              type="submit"
              className="text-sm min-w-fit border-brand-electric-purple bg-brand-electric-purple text-white disabled:border-gray-200 disabled:bg-gray-200 disabled:text-brand-hidden-sapphire disabled:cursor-not-allowed px-2"
              disabled={state.isSubmitting}
              aria-label="Newsletter subscribe"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </button>
          </form>
          <span className="flex items-start py-1 h-8">
            {state.isSubmitting ? <span className="text-xs text-yellow-700">Submitting...</span> : null}
            {state.success ? <span className="text-xs text-green-500">Thanks for signing up.</span> : null}
          </span>
        </div>
        <small className="block text-xs text-center text-brand-hidden-sapphire">
          To update your email preferences visit{' '}
          <a
            href="https://www.cockroachlabs.com/email-preferences/"
            target="_blank"
            rel="noreferrer"
            className="text-brand-hidden-sapphire hover:text-brand-electric-purple"
          >
            cockroachlabs.com
          </a>
        </small>
        <MarketoForm debug={false} formId={formId} />
      </div>
    </section>
  )
}

NewsletterForm.propTypes = {
  /** The Marketo Form Id */
  formId: PropTypes.string.isRequired
}

export default NewsletterForm
