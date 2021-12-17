import { createContext, useContext, useState } from 'react'
import usePersistState from './usePersistState';

const WalletContext = createContext(undefined);

export function WalletProvider({ children }) {

    const [wallet, setWallet] = usePersistState('walletData', {
        balance: 0,
        reflections: 0,
        earned: 0,
        sessionEarned: 0,
        lastUpdate: null,
        price: 0,
        tokenData: null
    });

  return (
    <WalletContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)

  if (!context)
    throw new Error('useWallet must be used inside a `WalletProvider`');

  return context;
}