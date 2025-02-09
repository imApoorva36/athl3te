import { Button } from "@/components/ui/button"
import LayeredCard from "@/components/LayeredCard";
import Link from "next/link";
import Image from "next/image";

export default function Collections() {
    const nftData = {
        "Running NFTs": [
            {
                id: 1,
                name: "Ran 10km",
                image: "/NFTs/run.png"
            },
            {
                id: 2,
                name: "Ran 20km",
                image: "/NFTs/run.png"
            },
            {
                id: 3,
                name: "Ran 30km",
                image: "/NFTs/run.png"
            }
        ],
        "Walking NFTs": [
            {
                id: 4,
                name: "Walk 5km",
                image: "/NFTs/walk.png"
            },
            {
                id: 5,
                name: "Walk 10km",
                image: "/NFTs/walk.png"
            },
            {
                id: 6,
                name: "Walk 15km",
                image: "/NFTs/walk.png"
            }
        ],
        "Swimming NFTs": [
            {
                id: 7,
                name: "Swim 1km",
                image: "/NFTs/swim.png"
            },
            {
                id: 8,
                name: "Swim 2km",
                image: "/NFTs/swim.png"
            },
            {
                id: 9,
                name: "Swim 3km",
                image: "/NFTs/swim.png"
            }
        ]
    };

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

            <div className="flex-1 overflow-y-auto px-4 space-y-12 my-4">
            <h2 className="text-xl font-semibold">Collections</h2>
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
                                        <Image src={nft.image} width={80} height={80} alt={nft.name} className="mx-auto my-auto p-2" />
                                        <h3 className="text-sm font-semibold">{nft.name}</h3>
                                        <Button variant="default">Claim</Button>
                                        </div>
                                    </LayeredCard>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
                    
        </>
    )
}

