import { FlameIcon, HeartIcon, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import LayeredCard from "@/components/LayeredCard";
import Link from "next/link";
import Image from "next/image";

export default function FindCommunities() {
    const communityData = [{
        name: "Cardio Community",
        description:
            "Cardio Community is a group focused on heart health, endurance training, and fitness through activities like running, cycling, and HIIT workouts. It fosters motivation, shared goals, and a supportive environment for improving cardiovascular health. ❤️",
    },
    {
        name: "Yoga Community",
        description:
            "Yoga Community is a group focused on mental and physical well-being through yoga, meditation, and mindfulness practices. It fosters relaxation, stress relief, and a sense of inner peace. 🧘",
    },
    {
        name: "Nutrition Community",
        description:
            "Nutrition Community is a group focused on healthy eating, balanced diets, and nutritional education. It fosters knowledge sharing, recipe ideas, and support for achieving dietary goals. 🍏",
    },
    {
        name: "Meditation Community",
        description:
            "Meditation Community is a group focused on mindfulness, stress reduction, and spiritual growth through meditation practices. It fosters mental clarity, emotional well-being, and a sense of inner harmony. 🧘‍♂️",
    },
    {
        name: "Running Community",
        description:
            "Running Community is a group focused on running enthusiasts, marathon training programs"
    }];


    return (
        <>
            {/* Header */}
            <div className="flex justify-center items-center p-3 border-b">
                <LayeredCard
                    mainColor="bg-accent"
                    bgColor="bg-primary"
                    borderWidth="border-[2px]"
                    topOffset="top-[8px]"
                    leftOffset="left-[3px]"
                    roundedness="rounded-lg"
                    textColor="text-white"
                >
                    <Button variant="ghost" size="icon" className="text-primary hover:text-descructive">
                        <Image src="/wallet.png" width={20} height={20} alt="wallet" />
                    </Button>
                </LayeredCard>
                <h1 className="text-2xl font-bold mt-2 justify-center mx-auto text-primary">ATHL3TE</h1>
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
                        <FlameIcon className="h-6 w-6" />
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
                                    <HeartIcon className="h-6 w-6 text-primary" />
                                    <h2 className="text-lg font-semibold">{community.name}</h2>
                                    <Link href={`/community/${index}`}>
                                        <Button size="sm" variant="outline" className="text-primary font-bold hover:text-primary-dark">
                                            Join
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

