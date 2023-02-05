import React, { createContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const { status, data: clusters } = useQuery({
    queryKey: ['clusters'],
    queryFn: async () => {
      const response = await fetch('/api/cloud/all-clusters');

      if (!response.ok) {
        throw new Error('Bad Response');
      }

      return response.json();
    },
  });

  const handleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <AppContext.Provider
      value={{
        isNavOpen,
        handleNav,
        status,
        clusters,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
