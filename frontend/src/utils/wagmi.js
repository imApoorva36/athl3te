import { http, cookieStorage, createConfig, createStorage } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';
import { coinbaseWallet } from 'wagmi/connectors';

export function getConfig() {
  const baseSepoliaChain = {
    ...baseSepolia,
    rpcUrls: {
      default: { 
        http: [process.env.NEXT_PUBLIC_BASE_RPC_URL]
      },
      public: {
        http: [process.env.NEXT_PUBLIC_BASE_RPC_URL]
      }
    }
  };

  return createConfig({
    chains: [baseSepoliaChain],
    connectors: [
      coinbaseWallet({
        appName: 'Athl3te',
        chainId: baseSepoliaChain.id,
      }),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [baseSepoliaChain.id]: http(process.env.NEXT_PUBLIC_BASE_RPC_URL),
    },
  });
}