"use client";

import { useConnect, useAccount, useDisconnect } from "wagmi";
import { useEffect } from "react";

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
        <button
          onClick={() => connect({ connector: connectors[0] })}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Connect Coinbase Wallet
        </button>
      ) : (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-green-600">Wallet Connected</p>
          <p className="text-xs text-gray-600">{address}</p>
          <button
            onClick={() => disconnect()}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}
