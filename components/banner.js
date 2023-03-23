import React from 'react'

const Banner = () => {
  return (
    <aside className="flex flex-col items-center sm:flex-row text-center sm:text-left bg-white p-4 rounded shadow text-xs text-brand-hidden-sapphire gap-1 border-t-4 border-t-brand-electric-purple  sm:border-t-0 sm:border-l-4 sm:border-l-brand-electric-purple">
      <span className="flex justify-center sm:justify-left gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
        Read about this app on the Cockroach Labs blog:{' '}
      </span>
      <a
        href="https://www.cockroachlabs.com/blog/what-is-the-cockroachdb-cloud-api/"
        target="_blank"
        rel="noopener"
        className=" hover:text-brand-electric-purple"
      >
        What is the CockroachDB Cloud API?
      </a>
    </aside>
  )
}

export default Banner
