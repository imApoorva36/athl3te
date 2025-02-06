"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useAccount } from "wagmi";

const WalletContext = createContext({});

export function WalletProvider({ children }) {
  const { address, isConnected } = useAccount();
  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(() => {
    if (isConnected && address) {
      setWalletAddress(address);
    } else {
      setWalletAddress(null);
    }
  }, [isConnected, address]);

  return (
    <WalletContext.Provider value={{ walletAddress, isConnected }}>
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => useContext(WalletContext);
