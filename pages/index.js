import React, { Fragment, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { fromProvider } from 'cloud-regions-country-flags'

import ErrorAnnounce from '../components/error-announce'
import Heartbeat from '../components/heartbeat'
import Particles from '../components/particles'
import StateBadge from '../components/state-badge'
import StateDot from '../components/state-dot'
import CloudProviderLogo from '../components/cloud-provider-logo'
import DonutChart from '../components/donut-chart'
import Banner from '../components/banner'
import YouTubeVideo from '../components/youtube-video'

const Page = ({ clusters, status }) => {
  const router = useRouter()

  useEffect(() => {
    if (router.query.code && router.query.state) {
      router.replace('/', undefined, { shallow: true })
    }
  }, [])

  if (status === 'error') return <ErrorAnnounce />

  return (
    <section className='grid gap-6 lg:gap-8'>
      <Banner />
      <ul className='grid xl:grid-cols-2 gap-6 lg:gap-8 list-none p-0 m-0'>
        <li className='relative flex flex-col flex-1 rounded-lg bg-brand-narwhal-grey list-none p-0 m-0 border border-gray-400'>
          <Particles className='absolute top-0 left-0 bottom-[50%] w-full h-[300px] z-0' />
          <article className='flex flex-col flex-1 p-4 sm:p-8 z-10'>
            <div className='flex flex-col flex-1 gap-2 py-8 place-content-center'>
              <small className='block text-sm font-medium text-brand-starfleet-blue text-center'>Total spend</small>
              <strong className='font-black break-all text-6xl text-brand-light m-0 text-center justify-center'>
                {`$${clusters
                  .filter((cluster) => {
                    const { plan, config } = cluster
                    return config[plan.toLowerCase()].spend_limit
                  })
                  .reduce((accumulator, currentValue) => {
                    const { plan, config } = currentValue
                    const sum = config[plan.toLowerCase()].spend_limit
                    return accumulator + sum
                  }, 0)}`}
              </strong>
              <Heartbeat />
            </div>

            <hr className='mx-auto my-8 w-full sm:w-11/12 border-brand-hidden-sapphire' />

            <ul className='list-none flex flex-col flex-1 gap-2 p-0 sm:px-5 py-0 m-0'>
              {clusters.map((cluster, index) => {
                const { name, plan, config } = cluster

                const spendLimit = config[plan.toLowerCase()]?.spend_limit

                return (
                  <li key={index} className='flex items-center justify-between h-6 text-sm p-0 m-0'>
                    <span className='flex gap-2 items-center text-brand-starfleet-blue'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='currentColor'
                        className='w-2 h-2 mt-0.5'
                      >
                        <circle cx='12' cy='12' r='12' />
                      </svg>
                      {name}
                    </span>
                    <span className='text-brand-light text-right font-bold'>
                      {spendLimit ? `$${spendLimit}` : '-----'}
                    </span>
                  </li>
                )
              })}
            </ul>
          </article>
        </li>

        <li className='flex flex-col flex-1 rounded-lg bg-brand-narwhal-grey list-none p-0 m-0 border border-gray-400'>
          <article className=' flex flex-col flex-1 p-4 sm:p-8'>
            <div className='flex flex-col flex-1 gap-2 py-4 place-content-center mx-auto max-w-[220px]'>
              <DonutChart states={clusters.map((cluster) => cluster.state.split('_').at(-1))} />
            </div>

            <hr className='mx-auto my-8 w-full sm:w-11/12 border-brand-hidden-sapphire' />

            <ul className='list-none flex flex-col gap-2 p-0 sm:px-5 py-0 m-0'>
              {clusters.map((cluster, index) => {
                const { name, state } = cluster

                const stateString = state.split('_').at(-1)

                return (
                  <li key={index} className='flex items-center justify-between h-6 text-sm p-0 m-0'>
                    <span className='flex gap-2 items-center text-brand-light'>
                      <StateDot state={stateString} />
                      {name}
                    </span>
                    <StateBadge state={stateString} />
                  </li>
                )
              })}
            </ul>
          </article>
        </li>
      </ul>

      <ul className='grid xl:grid-cols-2 gap-6 lg:gap-8 list-none p-0 m-0'>
        {clusters.map((cluster, index) => {
          const { id, name, plan, cockroach_version, state, cloud_provider, config, regions } = cluster

          const [prefix, suffix] = cockroach_version.split('-')
          const cleanedSuffix = suffix ? `-${suffix.replace(/\.|-|\d+/g, '')}` : ''

          const cockroach_version_clean = `${prefix}${cleanedSuffix}`

          return (
            <li
              key={index}
              className='flex flex-col flex-1 rounded-lg bg-brand-white list-none p-0 m-0 ease-in-out transition-all duration-300 shadow hover:shadow-lg hover:-translate-y-1'
            >
              <Link href={`/cluster/${id}`} className='group flex flex-col flex-1 gap-4 grow-1 no-underline p-4 sm:p-8'>
                <div className='flex items-center justify-between'>
                  <CloudProviderLogo provider={cloud_provider} />
                  <StateBadge state={state.split('_').at(-1)} />
                </div>

                <div>
                  <small className='block text-gray-600 text-xs'>Name</small>
                  <strong className='block font-black break-all sm:text-xl text-brand-hidden-sapphire m-0'>
                    {name}
                  </strong>
                </div>

                <div className='flex flex-col gap-4 flex-1 items-start justify-between sm:flex-row sm:gap-y-0'>
                  <div>
                    <small className='block text-gray-600 text-xs'>Regions</small>
                    <ul className='list-none flex flex-col gap-x-6 p-0 m-0'>
                      {regions.map((region, index) => {
                        const { name } = region

                        return (
                          <li key={index} className='flex items-center gap-1 text-xs p-0 m-0'>
                            <span className='mt-0.5'>{fromProvider(name, cluster.cloud_provider).flag}</span>
                            <span>{name}</span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                  <div>
                    <small className='block text-gray-600 text-xs'>Plan</small>
                    <strong className='block text-xs font-bold capitalize m-0'>{plan.toLowerCase()}</strong>
                  </div>

                  <div>
                    {cluster.plan === 'SERVERLESS' ? (
                      <Fragment>
                        <small className='block text-gray-600 text-xs'>Spend limit</small>
                        <strong className='block text-xs font-bold capitalize'>
                          {`$${config[plan.toLowerCase()].spend_limit}`}
                        </strong>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <small className='block text-gray-600 text-xs'>Machine Type</small>
                        <strong className='block text-xs font-bold capitalize'>
                          {`${config[plan.toLowerCase()].machine_type}`}
                        </strong>
                      </Fragment>
                    )}
                  </div>
                  <div>
                    <small className='block text-gray-600 text-xs'>Version</small>
                    <strong className='block text-xs'>{cockroach_version_clean}</strong>
                  </div>
                </div>

                <hr className='mt-8 mb-2' />

                <div className='font-bold rounded border border-gray-300 p-2 text-xs text-center capitalize justify-end transition-colors duration-300 group-hover:text-brand-starfleet-blue group-hover:bg-white'>
                  more details
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
      <YouTubeVideo id={process.env.NEXT_PUBLIC_YOUTUBE_ID} title='CockroachDB Cloud API Demo Video' />
    </section>
  )
}

export async function getServerSideProps() {
  try {
    const response = await fetch('https://cockroachlabs.cloud/api/v1/clusters', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.COCKROACH_CLOUD_SECRET_KEY}`
      }
    })

    if (!response.ok) {
      throw new Error('Bad Response')
    }

    const json = await response.json()

    return {
      props: {
        message: 'A Ok!',
        clusters: json.clusters.filter((d) => (d.name.includes(process.env.NEXT_PUBLIC_CLUSTER_FILTER) ? true : false))
      }
    }
  } catch (error) {
    return {
      props: {
        message: 'Error!',
        status: 'error',
        error: error.message
      }
    }
  }
}

export default Page
