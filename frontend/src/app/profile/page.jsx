"use client";
import { Button } from "@/components/ui/button"
import LayeredCard from "@/components/LayeredCard";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Profile() {
    const [profileData, setProfileData] = useState({
        name: "",
        age: 0,
        gender: "",
        weight: 0,
        address: "",
        nftCollection: []
    });

    useEffect(() => {
        const userProfile = localStorage.getItem('userProfile');
        if (userProfile) {
            setProfileData(JSON.parse(userProfile));
        }

            setProfileData(prevState => ({
                ...prevState,
                nftCollection: []
            }));
        
    }, []);

    return (
        <>
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
                <h1 className="text-xl font-semibold mt-2 mx-auto">Profile</h1>
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

            <div className="flex-1 overflow-y-auto p-4 space-y-12 my-4">
                <div className="flex flex-col space-y-2">
                    <h2 className="text-xl font-semibold">My Details</h2>
                    <h3 className="text-lg font-semibold">Name:
                        <span className="font-normal"> {profileData.name}</span>
                    </h3>
                    <h3 className="text-lg font-semibold">Age:
                        <span className="font-normal"> {profileData.age}</span>
                    </h3>
                    <h3 className="text-lg font-semibold">Weight:
                        <span className="font-normal"> {profileData.weight} kg</span>
                    </h3>
                    <h3 className="text-lg font-semibold">Gender:
                        <span className="font-normal"> {profileData.gender}</span>
                    </h3>
                </div>
                <div className="flex flex-col space-y-2">
                    <h2 className="text-xl font-semibold">Connected Wallet</h2>
                    <div className="flex items-center space-x-2">
                        <Image src="/wallet.png" width={30} height={30} alt="wallet" />
                        <h3 className="text-md">{profileData.address.slice(0, 6)}...{profileData.address.slice(-4)}</h3>
                    </div>
                </div>
                <div className="flex flex-col space-y-2 my-4">
                    <h3 className="text-lg font-semibold">My NFT Collection</h3>
                    {profileData.nftCollection.length === 0 ? (
                        <div className="flex flex-col items-center space-y-2 py-10">
                            <Image src="/no_nft_logo.png" width={150} height={150} alt="empty" />
                            <p className="text-lg text-primary">No NFTs yet!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-3 gap-4 p-2">
                            {profileData.nftCollection.map((nft) => (
                                <div key={nft.id} className="flex flex-col items-center space-y-2">
                                    <Image src={nft.image} width={50} height={50} alt="nft" />
                                    <p className="text-xs">{nft.name}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </>
    )
}

