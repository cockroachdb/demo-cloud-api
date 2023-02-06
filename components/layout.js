import React, { Fragment } from 'react';
import Link from 'next/link';

import { useSession, signIn, signOut } from 'next-auth/react';

import { AppContext } from '../context/app-context';

import Loading from './loading';
import ErrorAnnounce from './error-announce';

import MenuIcons from './menu-icons';
import LoginButton from './login-button';
import ActiveLink from './active-link';
import GitHubLogo from './github-logo';
import CockroachLabsLogo from './cockroach-labs-logo';

const Layout = ({ children }) => {
  const { data: session } = useSession();

  return (
    <Fragment>
      <AppContext.Consumer>
        {({ isNavOpen, handleNav, status, clusters }) => {
          return (
            <Fragment>
              <header className='fixed flex items-center bg-white w-full px-4 shadow z-30 h-16'>
                <div className='w-full max-w-8xl flex items-center justify-between'>
                  <div className='py-3'>
                    <CockroachLabsLogo color='brand-deep-purple' />
                  </div>
                  <button onClick={handleNav} className='w-auto min-w-0 block p-1 border-none lg:hidden'>
                    <MenuIcons isNavOpen={isNavOpen} />
                  </button>
                  <LoginButton session={session} signIn={signIn} signOut={signOut} />
                </div>
              </header>
              <div className='bg-transparent h-16' />
              <div
                aria-label='lightbox'
                tabIndex='0'
                role='button'
                onClick={handleNav}
                onKeyDown={(event) => (event.key === 'Enter' ? handleNav() : null)}
                className={`z-20 top-0 w-screen h-screen bg-brand-light opacity-90 ${
                  isNavOpen ? 'fixed lg:hidden' : 'hidden'
                }`}
              />

              <div className='max-w-8xl'>
                <nav
                  className={`lg:block fixed top-0 bg-brand-narwhal-grey z-50 shadow-lg inset-0
                    ${isNavOpen ? 'left-0' : '-left-full sm:-left-80 lg:left-0'}
                    w-full sm:w-80 overflow-y-auto transition-all duration-300`}
                >
                  <div className='flex gap-y-8 flex-col h-full'>
                    <div className='flex items-center justify-between sm:justify-start px-4 py-5 h-16'>
                      <CockroachLabsLogo />
                      <button
                        onClick={handleNav}
                        className='bg-transparent text-brand-light w-auto min-w-0 block p-1 border-none lg:hidden'
                      >
                        <MenuIcons isNavOpen={isNavOpen} className='block sm:hidden' />
                      </button>
                    </div>
                    <div className='flex flex-col gap-y-4 h-full px-4'>
                      <Link href='/' className='flex items-center text-brand-neutral-400 hover:text-brand-light mt-2'>
                        <strong className='flex gap-2 items-center text-lg'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={2}
                            stroke='currentColor'
                            className='w-5 h-5'
                            aria-label='Cluster icon'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25'
                            />
                          </svg>
                          CockroachDB Clusters
                        </strong>
                      </Link>
                      {status === 'error' ? <ErrorAnnounce /> : null}
                      {status === 'loading' ? <Loading /> : null}
                      {clusters ? (
                        <ul className='list-none flex px-1 flex-col grow gap-1'>
                          <Fragment>
                            {clusters.data.map((cluster, index) => {
                              const { id, name } = cluster;
                              return (
                                <li key={index}>
                                  <ActiveLink
                                    href={`/clusters/${id}`}
                                    activeClassName='font-bold !text-brand-starfleet-blue'
                                    className='flex gap-3 items-center font-medium px-0 sm:px-3 py-2 text-xs sm:text-sm text-brand-light hover:text-brand-neutral-400'
                                  >
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      viewBox='0 0 24 24'
                                      fill='currentColor'
                                      className='w-2 h-2 mt-0.5'
                                    >
                                      <circle cx='12' cy='12' r='12' />
                                    </svg>
                                    {name}
                                  </ActiveLink>
                                </li>
                              );
                            })}
                          </Fragment>
                        </ul>
                      ) : null}
                    </div>
                    <div className='p-4'>
                      <ul className='flex flex-col gap-4 list-none grow'>
                        <li className='flex lg:hidden'>
                          {session ? (
                            <button
                              aria-label='Sign out'
                              className='bg-transparent border border-brand-starfleet-blue text-brand-starfleet-blue w-full'
                              onClick={() => signOut()}
                            >
                              Sign out
                            </button>
                          ) : (
                            <button
                              aria-label='Sign in'
                              className='bg-transparent border border-brand-starfleet-blue text-brand-starfleet-blue flex gap-2 items-center justify-center w-full'
                              onClick={() => signIn()}
                            >
                              <GitHubLogo />
                              Sign in
                            </button>
                          )}
                        </li>
                        <li>
                          <hr className='border-brand-hidden-sapphire mt-3 mb-0' />
                        </li>
                        <li>
                          <a
                            href='https://github.com/cockroachdb/demo-cloud-api'
                            target='blank'
                            rel='noopener'
                            className='flex gap-3 items-center font-medium px-0 sm:px-3 py-2 text-xs sm:text-sm text-brand-light hover:text-brand-neutral-400'
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='currentColor'
                              viewBox='0 0 24 24'
                              className='w-6 h-6'
                              aria-label='GitHub Logo'
                            >
                              <path
                                d='M12.01,1.64C6.18,1.64,1.46,6.39,1.46,12.26c0,4.7,3.02,8.67,7.21,10.08,.52,.11,.72-.23,.72-.51,0-.25-.02-1.09-.02-1.97-2.93,.63-3.55-1.27-3.55-1.27-.47-1.23-1.17-1.55-1.17-1.55-.96-.65,.07-.65,.07-.65,1.07,.07,1.62,1.09,1.62,1.09,.94,1.62,2.46,1.16,3.07,.88,.09-.69,.37-1.16,.66-1.42-2.34-.25-4.8-1.16-4.8-5.24,0-1.16,.42-2.11,1.08-2.85-.1-.26-.47-1.35,.1-2.81,0,0,.89-.28,2.9,1.09,.86-.23,1.75-.35,2.64-.35,.89,0,1.8,.12,2.64,.35,2.01-1.37,2.9-1.09,2.9-1.09,.58,1.46,.21,2.55,.1,2.81,.68,.74,1.08,1.69,1.08,2.85,0,4.08-2.46,4.98-4.82,5.24,.38,.33,.72,.97,.72,1.97,0,1.42-.02,2.57-.02,2.92,0,.28,.19,.62,.72,.51,4.19-1.41,7.21-5.38,7.21-10.08,.02-5.88-4.72-10.63-10.53-10.63Z'
                                fillRule='evenodd'
                              />
                            </svg>
                            cockroachdb/demo-cloud-api
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </nav>
                <main className='bg-brand-gray-f4 lg:pl-[20rem]'>
                  <div className='app-min-height flex flex-col prose prose-lg max-w-none p-4 lg:p-10'>{children}</div>
                </main>
              </div>
            </Fragment>
          );
        }}
      </AppContext.Consumer>
    </Fragment>
  );
};

export default Layout;
