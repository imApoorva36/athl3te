'use client';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { baseSepolia } from 'wagmi/chains';
 
export function Providers({ children }) {
  return (
    <OnchainKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={baseSepolia} 
      config={{
        appearance: {
          name: 'ATHL3TE',
          logo: '/logo/athlete_logo.png',
          mode: 'light',
          theme: 'custom'
        },
        wallet: { 
          display: 'modal', 
          termsUrl: 'https://...', 
          privacyUrl: 'https://...', 
        }
       }}
    >
      {children}
    </OnchainKitProvider>
  );
}