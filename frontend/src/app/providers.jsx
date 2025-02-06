"use client";

import { createConfig, http } from "wagmi";
import { WagmiProvider } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { coinbaseWallet } from "wagmi/connectors";
import { WalletProvider } from "@/contexts/WalletContext";

const queryClient = new QueryClient();

const config = createConfig({
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http("https://sepolia.base.org"),
  },
  connectors: [
    coinbaseWallet({
      chainId: baseSepolia.id,
      appName: "Athl3te",
    }),
  ],
});

export function Providers({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <WalletProvider>{children}</WalletProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
