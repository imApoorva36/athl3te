import { Geist, Geist_Mono } from "next/font/google";
import '@coinbase/onchainkit/styles.css';
import "./globals.css";
import { Providers } from "../utils/providers";
import { headers } from 'next/headers';
import { cookieToInitialState } from 'wagmi';
import { getConfig } from '../utils/wagmi'
import { Card } from "@/components/ui/card";
import NavBar from "@/components/NavBar";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-mono`}
      >
        <Providers initialState={initialState}>
        <div className="min-h-screen bg-[url(/desktop.jpg)] bg-cover bg-no-repeat flex items-center justify-center">
          <Card className="w-full max-w-md mx-auto bg-white overflow-hidden flex flex-col h-screen sm:h-[95vh] shadow-2xl relative">
          {children}
          </Card>
        </div>
        </Providers>
      </body>
    </html>
  );
}
