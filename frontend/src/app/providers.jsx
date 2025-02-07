"use client";

import { createConfig, http } from "wagmi";
import { WagmiProvider } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { coinbaseWallet } from "wagmi/connectors";
import { WalletProvider } from "@/contexts/WalletContext";
import { GraphQLClient } from "graphql-request";

// GraphQL Setup
const API_URL = process.env.NEXT_PUBLIC_SUBGRAPH_URL;
const API_KEY = process.env.NEXT_PUBLIC_SUBGRAPH_API_KEY;

export const graphQLClient = new GraphQLClient(API_URL, {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

// React Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // Cache for 1 minute
      refetchOnWindowFocus: false, // Prevent unnecessary refetches
    },
  },
});

// Wagmi Config
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
