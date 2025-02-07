"use client";

import { useConnect, useAccount, useDisconnect } from "wagmi";
import { useEffect } from "react";
import LayeredCard from "./LayeredCard";
import { CoinbaseWalletLogo } from "./CoinbaseWalletLogo";

export function WalletComponents({ onWalletConnect }) {
  const { connect, connectors } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (isConnected && address) {
      onWalletConnect?.(address);
    }
  }, [isConnected, address, onWalletConnect]);

  return (
    <div className="flex flex-col gap-8 mx-auto p-8">
      {!isConnected ? (
        <LayeredCard
          mainColor="bg-primary"
          bgColor="bg-white"
          borderWidth="border-[2px]"
          topOffset="top-[8px]"
          leftOffset="left-[18px]"
          roundedness="rounded-lg"
          textColor="text-white"
        >
          <button
            onClick={() => connect({ connector: connectors[0] })}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90"
          >
            <CoinbaseWalletLogo className="h-6 w-6" />
            Connect Coinbase Wallet
          </button>
        </LayeredCard>
      ) : (
        <div className="relative group">
          <LayeredCard
            mainColor="bg-primary"
            bgColor="bg-white"
            borderWidth="border-[2px]"
            topOffset="top-[8px]"
            leftOffset="left-[15px]"
            roundedness="rounded-lg"
            textColor="text-white"
          >
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white">
              <CoinbaseWalletLogo className="h-6 w-6" />
              {`${address.slice(0, 6)}...${address.slice(-4)}`}
            </button>
          </LayeredCard>
          <div className="hidden group-hover:block absolute w-full mt-2">
            <LayeredCard
              mainColor="bg-destructive"
              bgColor="bg-white"
              borderWidth="border-[2px]"
              topOffset="top-[8px]"
              leftOffset="left-[15px]"
              roundedness="rounded-lg"
              textColor="text-white"
            >
              <button
                onClick={() => disconnect()}
                className="w-full px-4 py-2"
              >
                Disconnect
              </button>
            </LayeredCard>
          </div>
        </div>
      )}
    </div>
  );
}
