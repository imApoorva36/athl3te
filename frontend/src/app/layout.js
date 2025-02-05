import { Geist, Geist_Mono } from "next/font/google";
import '@coinbase/onchainkit/styles.css';
import "./globals.css";
import { Providers } from "../utils/providers";
import { headers } from 'next/headers';
import { cookieToInitialState } from 'wagmi';
import { getConfig } from '../utils/wagmi'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ATHL3TE"
};

export default async function RootLayout({ children }) {
  const headersList = await headers();
  const initialState = cookieToInitialState(
    getConfig(),
    headersList.get('cookie')
  );

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers initialState={initialState}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
