import { Button } from "@/components/ui/button"
import LayeredCard from "@/components/LayeredCard";
import Link from "next/link";
import Image from "next/image";

export default function FindCommunities() {
    const communityData = [
    {
        name: "Running Community",
        id: "run",
        description:
            "Running Community is a group focused on running enthusiasts, marathon training programs",
        logo: "/sports/orange/run.png"
    }
];


    return (
        <>
            {/* Header */}
            <div className="flex justify-between items-center p-3 border-b">
                <LayeredCard
                    mainColor="bg-accent"
                    bgColor="bg-primary"
                    borderWidth="border-[2px]"
                    topOffset="top-[8px]"
                    leftOffset="left-[3px]"
                    roundedness="rounded-lg"
                    textColor="text-white"
                >
                    <Link href="/profile">
                        <Image src="/wallet.png" width={20} height={20} alt="wallet" className="m-2" />
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
                    <Button variant="ghost" size="icon" className="text-[#FF4500] hover:text-[#FF4500] hover:bg-orange-50">
                        <Image src="/fire.png" width={20} height={20} alt="fire" />
                    </Button>
                </LayeredCard>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <h2 className="text-xl font-semibold mb-3">Communities</h2>

                {/* Communities */}
                <div className="space-y-4 p-2">
                    {communityData.map((community, index) => (
                        <LayeredCard
                            key={index}
                            mainColor="bg-accent"
                            bgColor="bg-primary"
                            borderWidth="border-[2px]"
                            topOffset="top-[17px]"
                            leftOffset="left-[24px]"
                            roundedness="rounded-xl"
                            textColor="text-black"
                        >
                            <div className="p-4">
                                <div className="flex justify-between items-center mb-3">
                                    <Image src={community.logo} width={35} height={35} alt="logo" />
                                    <h2 className="text-lg font-semibold">{community.name}</h2>
                                    <Link href={`/community/${community.id}`}>
                                        <Button size="sm" variant="outline" className="text-primary font-bold hover:text-primary-dark">
                                            View
                                        </Button>
                                    </Link>
                                </div>
                                <p className="text-md leading-relaxed">{community.description}</p>
                            </div>
                        </LayeredCard>
                    ))}
                </div>
            </div >
        </>
    )
}

