import React, { Fragment } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { fromProvider } from 'cloud-regions-country-flags'

import ErrorAnnounce from '../../components/error-announce'
import StateBadge from '../../components/state-badge'
import Underline from '../../components/underline'
import Particles from '../../components/particles'
import ClusterPanel from '../../components/cluster-panel'
import CloudProviderLogo from '../../components/cloud-provider-logo'
import ClusterDatabases from '../../components/cluster-databases'
import ClusterNodes from '../../components/cluster-nodes'
import ClusterSpendLimit from '../../components/cluster-spend-limit'

const Page = ({ cluster, status }) => {
  const router = useRouter()

  const refreshData = () => {
    router.replace(router.asPath, undefined, { scroll: false })
  }

  if (status === 'error') return <ErrorAnnounce />

  const [prefix, suffix] = cluster.cockroach_version.split('-')
  const cleanedSuffix = suffix ? `-${suffix.replace(/\.|-|\d+/g, '')}` : ''

  const cockroach_version_clean = `${prefix}${cleanedSuffix}`

  return (
    <Fragment>
      <section className='flex flex-col gap-6 xl:gap-8 items-start'>
        <Link
          href='/'
          className='flex items-center justify-self-start gap-1 no-underline text-sm text-brand-hidden-sapphire hover:text-brand-starfleet-blue'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 24 24'
            className='w-4 h-4'
            aria-label='Back icon'
          >
            <path
              d='M6.75,10.42c-.42-.42-.42-1.1,0-1.52L13.19,2.46c.42-.42,1.1-.42,1.52,0s.42,1.1,0,1.52l-4.61,4.61h12.73c.59,0,1.07,.48,1.07,1.07s-.49,1.07-1.07,1.07H10.1l4.61,4.61c.42,.42,.42,1.1,0,1.52s-1.1,.42-1.52,0l-6.44-6.44Z'
              fillRule='evenodd'
            />
            <path d='M1.14,19.32c-.63,0-1.14-.51-1.14-1.14V1.14C0,.51,.51,0,1.14,0s1.14,.51,1.14,1.14V18.17c0,.63-.51,1.14-1.14,1.14Z' />
          </svg>
          <span className='mb-1'>Back</span>
        </Link>
        <div className='relative flex bg-brand-narwhal-grey justify-center rounded p-4 sm:p-8 xl:min-h-[500px] w-full h-full gap-12 xl:pb-0 flex-col'>
          <strong className='flex gap-2 items-center font-bold text-2xl text-brand-light'>
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
            Cluster
          </strong>
          <Particles className='absolute top-0 left-0 bottom-[60%] w-full h-[300px] z-0' />
          <div className='relative flex flex-col gap-2 z-10'>
            <strong className='block text-brand-light font-black text-4xl text-center'>{cluster.name}</strong>
            <Underline />
            <StateBadge size='lg' state={cluster.state.split('_').at(-1)} className='self-center' />
          </div>
          <div className='grid xl:grid-cols-3 gap-4 sm:gap-6 z-10'>
            <ClusterPanel
              title='Config'
              paths={[
                'M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z',
                'M15 12a3 3 0 11-6 0 3 3 0 016 0z'
              ]}
              properties={
                cluster.plan === 'SERVERLESS'
                  ? [
                      {
                        label: 'Spend Limit',
                        value: `$${cluster.config.serverless.spend_limit}`
                      },
                      {
                        label: 'Routing ID',
                        value: cluster.config.serverless.routing_id.split('-').at(-1)
                      }
                    ]
                  : [
                      {
                        label: 'Machine Type',
                        value: cluster.config.dedicated.machine_type
                      },
                      {
                        label: 'Storage Gib',
                        value: cluster.config.dedicated.storage_gib
                      },
                      {
                        label: 'Disk Iops',
                        value: cluster.config.dedicated.disk_iops
                      },
                      {
                        label: 'Virtual CPUs',
                        value: cluster.config.dedicated.num_virtual_cpus
                      }
                    ]
              }
            />
            <ClusterPanel
              title='Info'
              paths={[
                'M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z'
              ]}
              properties={[
                {
                  label: 'Plan',
                  value: cluster.plan.toLowerCase()
                },
                {
                  label: 'Created',
                  value: new Intl.DateTimeFormat('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  }).format(new Date(cluster.created_at))
                },
                {
                  label: 'Version',
                  value: cockroach_version_clean
                },
                {
                  label: 'Cloud',
                  value: <CloudProviderLogo provider={cluster.cloud_provider} inherit={true} />
                }
              ]}
            />
            <ClusterPanel
              title='Regions'
              paths={[
                'M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525'
              ]}
              properties={[
                {
                  label: 'Region(s)',
                  value: (
                    <Fragment>
                      {cluster.regions.map((region, index) => {
                        const { name } = region
                        return (
                          <span className='flex items-center gap-1 lowercase' key={index}>
                            <span className='mt-0.5'>{fromProvider(name, cluster.cloud_provider).flag}</span>
                            <span>{name}</span>
                          </span>
                        )
                      })}
                    </Fragment>
                  )
                },
                {
                  label: 'Nodes',
                  value: (
                    <Fragment>
                      {cluster.regions.map((region, index) => {
                        return (
                          <span className='block' key={index}>
                            {region.node_count}
                          </span>
                        )
                      })}
                    </Fragment>
                  )
                }
              ]}
            />
          </div>
        </div>
        <div className='grid xl:grid-cols-2 gap-6 xl:gap-8 w-full xl:min-h-[500px]'>
          <ClusterDatabases clusterId={cluster.id} />
          {cluster.plan === 'SERVERLESS' ? (
            <ClusterSpendLimit
              clusterId={cluster.id}
              spendLimit={cluster.config.serverless.spend_limit}
              callback={refreshData}
            />
          ) : (
            <ClusterNodes clusterId={cluster.id} />
          )}
        </div>
      </section>
    </Fragment>
  )
}

export async function getServerSideProps(context) {
  const {
    params: { id }
  } = context

  try {
    const response = await fetch(`https://cockroachlabs.cloud/api/v1/clusters/${id}`, {
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
        cluster: json
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
