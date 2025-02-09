"use client"

import { Button } from "@/components/ui/button"
import LayeredCard from "@/components/LayeredCard";
import Link from "next/link";
import Image from "next/image";
import { dataUtils } from "@/app/graphql/all_data_calls";
import { nftData } from "@/utils/utils";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SuccessPopup = ({ nft, onClose }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
        <LayeredCard
            mainColor="bg-accent"
            bgColor="bg-primary"
            borderWidth="border-[2px]"
            topOffset="top-[30px]"
            leftOffset="left-[30px]"
            roundedness="rounded-xl"
            textColor="text-black"
        >
            <motion.div 
                className="p-8 flex flex-col items-center gap-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                 <motion.div
            initial={{ rotate: 0 }}
            animate={{
                rotate: [0, -5, 5, -5, 5, 0], 
            }}
            transition={{
                duration: 0.6,
                ease: "easeInOut",
                repeat: 10, 
            }}
        >
            <Image
                src={nft.image}
                width={128}
                height={128}
                alt={nft.name}
                className="w-32 h-32"
            />
        </motion.div>
                <h3 className="text-xl font-bold text-primary">NFT Minted Successfully!</h3>
                <p className="text-gray-600">{nft.name}</p>
                <Button onClick={onClose} variant="default">Close</Button>
            </motion.div>
        </LayeredCard>
    </motion.div>
);
export default function Collections() {
    const [mintingState, setMintingState] = useState({
        loading: false,
        success: false,
        currentNft: null
    });

    const handleMint = async (nft) => {
        try {
            setMintingState({ loading: true, success: false, currentNft: nft });
            await dataUtils.mintNFT(nft.image);
            setMintingState({ loading: false, success: true, currentNft: nft });
        } catch (error) {
            console.error('NFT minting failed:', error);
            setMintingState({ loading: false, success: false, currentNft: null });
        }
    };

    return (
        <>
            <AnimatePresence>
                {mintingState.success && mintingState.currentNft && (
                    <SuccessPopup
                        nft={mintingState.currentNft}
                        onClose={() => setMintingState({ loading: false, success: false, currentNft: null })}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {mintingState.loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
                    >
                        <LayeredCard
                            mainColor="bg-accent"
                            bgColor="bg-primary"
                            borderWidth="border-[2px]"
                            topOffset="top-[16px]"
                            leftOffset="left-[20px]"
                            roundedness="rounded-xl"
                            textColor="text-black"
                        >
                            <div className="flex flex-col items-center justify-center p-4 gap-3">
                                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                                <p className="text-lg font-medium">Minting your NFT...</p>
                            </div>
                        </LayeredCard>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b">
                <LayeredCard
                    mainColor="bg-accent"
                    bgColor="bg-primary"
                    borderWidth="border-[2px]"
                    topOffset="top-[8px]"
                    leftOffset="left-[3px]"
                    roundedness="rounded-lg"
                    textColor="text-white"
                >
                    <Link href="/activities">
                        <Button variant="ghost" size="icon" className="text-primary hover:text-descructive">
                            <Image src="/back.png" width={20} height={20} alt="back" />
                        </Button>
                    </Link>
                </LayeredCard>
                <div className="flex items-center">
                    <Image src="/logo/athlete_logo.png" width={40} height={40} alt="logo" />
                    <h1 className="text-2xl font-bold mt-2 mx-auto text-primary">ATHL3TE</h1>
                </div>
                <LayeredCard
                    mainColor="bg-accent"
                    bgColor="bg-primary"
                    borderWidth="border-[2px]"
                    topOffset="top-[8px]"
                    leftOffset="left-[3px]"
                    roundedness="rounded-lg"
                    textColor="text-white"
                >
                    <Button variant="ghost" size="icon">
                        <Image src="/wallet.png" width={20} height={20} alt="wallet" />
                    </Button>
                </LayeredCard>
            </div>

            <div className="flex-1 overflow-y-auto px-4 space-y-11 my-4">
                <h2 className="text-xl font-semibold">Achievable NFTs</h2>
                <div className="flex flex-col space-y-2 gap-4">
                    {Object.keys(nftData).map((key) => (
                        <div key={key} className="flex flex-col space-y-2">
                            <h2 className="text-lg font-semibold">{key}</h2>
                            <div className="grid grid-cols-3 gap-4">
                                {nftData[key].map((nft) => (
                                    <LayeredCard
                                        key={nft.id}
                                        mainColor="bg-accent"
                                        bgColor="bg-primary"
                                        borderWidth="border-[2px]"
                                        topOffset="top-[16px]"
                                        leftOffset="left-[10px]"
                                        roundedness="rounded-xl"
                                        textColor="text-black"
                                    >
                                        <div className="flex flex-col items-center justify-center p-2">
                                            <Image
                                                src={nft.image}
                                                width={80}
                                                height={80}
                                                alt={nft.name}
                                                className="mx-auto my-auto p-2"
                                            />
                                            <h3 className="text-sm font-semibold">{nft.name}</h3>
                                            <Button
                                                onClick={() => handleMint(nft)}
                                                variant="default"
                                                disabled={mintingState.loading}
                                            >
                                                Claim
                                            </Button>
                                        </div>
                                    </LayeredCard>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}