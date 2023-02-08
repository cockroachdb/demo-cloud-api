import React, { createContext, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'

const isProd = process.env.NODE_ENV === 'production'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const { data: session } = useSession()
  const [isNavOpen, setIsNavOpen] = useState(false)

  const { status, data: clusters } = useQuery({
    queryKey: ['clusters'],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cloud/all-clusters`)

      if (!response.ok) {
        throw new Error('Bad Response')
      }

      return response.json()
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
