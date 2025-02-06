"use client";

import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { mintNFT } from "@/utils/contract";
import { achievements } from "@/utils/achievements";
import { pinMetadataToIPFS } from "@/utils/pinata";

export default function AchievementsPage() {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const [isMinting, setIsMinting] = useState(false);
  const [error, setError] = useState(null);
  const [txHash, setTxHash] = useState(null);

  useEffect(() => {
    if (!isConnected) {
      router.push("/login");
    } else {
      console.log("Connected wallet address:", address);
    }
  }, [isConnected, address, router]);

  const handleMint = async (achievementId) => {
    if (!address) {
      setError("No wallet address found. Please connect your wallet.");
      return;
    }

    setIsMinting(true);
    setError(null);
    try {
      const metadata = {
        name: achievements[achievementId].name,
        description: achievements[achievementId].description,
        image: achievements[achievementId].image,
        attributes: achievements[achievementId].attributes,
        id: achievementId,
      };

      const ipfsUri = await pinMetadataToIPFS(metadata);
      console.log("Metadata pinned to IPFS:", ipfsUri);

      const hash = await mintNFT(address, ipfsUri);
      setTxHash(hash);
    } catch (err) {
      console.error("Minting error details:", err);
      setError(err.message);
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Select Achievement</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      {txHash && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Transaction successful! Hash: {txHash}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(achievements).map(([id, achievement]) => (
          <div
            key={id}
            className="border p-4 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold mb-2">{achievement.name}</h3>
            <p className="text-sm text-gray-600 mb-4">
              {achievement.description}
            </p>
            <button
              onClick={() => handleMint(id)}
              disabled={isMinting}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isMinting ? "Minting..." : "Mint Achievement"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
