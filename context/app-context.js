import React, { createContext, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const { data: session } = useSession()
  const [isNavOpen, setIsNavOpen] = useState(false)

  const { status, data: clusters } = useQuery({
    queryKey: ['clusters'],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_ASSET_PREFIX}/api/cloud/all-clusters`)

      if (!response.ok) {
        throw new Error('Bad Response')
      }

      const json = await response.json()

      return {
        message: json.message,
        data: json.data.filter((d) => (d.name.includes('cloud-api-demo') ? true : false))
      }
    }
  })

  const handleNav = () => {
    setIsNavOpen(!isNavOpen)
  }

  return (
    <AppContext.Provider
      value={{
        isNavOpen,
        handleNav,
        status,
        clusters,
        admin: session?.user.admin
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
