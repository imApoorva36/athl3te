"use client";

import { WalletComponents } from "@/components/WalletComponents";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function LoginPage() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (isConnected && address) {
      setIsRedirecting(true);
      router.push("/achievements");
    }
  }, [isConnected, address, router]);

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-8 text-center">
        Connect Your Wallet
      </h1>
      <WalletComponents />
      {isRedirecting && (
        <p className="mt-4 text-center text-blue-600">
          Redirecting to achievements...
        </p>
      )}
    </div>
  );
}
