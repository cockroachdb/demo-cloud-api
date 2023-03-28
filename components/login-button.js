import React from 'react'
import PropTypes from 'prop-types'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import GitHubLogo from './github-logo'
import TickIcon from './tick-icon'
import XIcon from './x-icon'

const LoginButton = ({ session, signIn, signOut, admin }) => {
  if (session) {
    return (
      <ul className="flex justify-end hidden lg:block">
        <li>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="flex w-auto border-none items-center gap-2 p-1" aria-label="Sign out">
                <img alt={session.user.name} src={session.user.image} className="w-9 h-9" />

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 stroke-black"
                  aria-label="Down chevron"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" aria-hidden />
                </svg>
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align="end"
                className="flex flex-col items-center bg-white border border-gray-200 shadow-lg px-4 py-6 w-52 z-50"
              >
                <DropdownMenu.Item disabled>
                  <span className="block text-center text-xs text-brand-hidden-sapphire text-hidden-sapphire">
                    Signed in as
                  </span>
                  <strong className="block text-center font-bold text-lg">{session.user.name}</strong>
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="w-full h-px my-4 bg-gray-200" />
                <DropdownMenu.Item disabled>
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-1 text-xs text-green-600">
                      <TickIcon /> Authenticated
                    </div>
                    <div className={`flex gap-1 text-xs ${admin ? 'text-green-600' : 'text-red-600'}`}>
                      {admin ? <TickIcon /> : <XIcon />} Authorized
                    </div>
                  </div>
                </DropdownMenu.Item>

                <DropdownMenu.Separator className="w-full h-px my-4 bg-gray-200" />
                <DropdownMenu.Item asChild>
                  <button
                    aria-label="Sign out"
                    className="grow bg-brand-starfleet-blue border border-brand-starfleet-blue text-white w-full"
                    onClick={() => signOut()}
                  >
                    Sign out
                  </button>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </li>
      </ul>
    )
  }
  return (
    <ul className="flex justify-end hidden lg:block">
      <li>
        <button
          aria-label="Sign in"
          className="bg-transparent border border-brand-starfleet-blue text-brand-starfleet-blue flex gap-1 items-center justify-center"
          onClick={() => signIn('github')}
        >
          <GitHubLogo />
          Sign in
        </button>
      </li>
    </ul>
  )
}

LoginButton.propTypes = {
  /** next-auth seesion object */
  session: PropTypes.shape({
    /** GitHub User object */
    user: PropTypes.shape({
      /** GitHub user name */
      name: PropTypes.string.isRequired,
      /** GitHub user image */
      image: PropTypes.string.isRequired
    }).isRequired
  }),
  /** next-auth sign in function */
  signIn: PropTypes.func.isRequired,
  /** next-auth sign out function */
  signOut: PropTypes.func.isRequired,
  /** Status of admin from content */
  admin: PropTypes.bool.isRequired
}

export default LoginButton
