import { HeartIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import LayeredCard from "@/components/LayeredCard";
import Image from "next/image";

export default function MyAgents() {
    const agentData = [{
        name: "Cardio Agent",
        description:
            "Cardio Community is an agent focused on heart health, endurance training, and fitness through activities like running, cycling, and HIIT workouts. It fosters motivation, shared goals, and a supportive environment for improving cardiovascular health. ❤️",
    },
    {
        name: "Swim Coach",
        description:
            "Swim Coach is an agent focused on mental and physical well-being through yoga, meditation, and mindfulness practices. It fosters relaxation, stress relief, and a sense of inner peace. 🧘",
    }];


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
                    <Button variant="ghost" size="icon" className="text-primary hover:text-descructive">
                        <Image src="/wallet.png" width={20} height={20} alt="wallet" />
                    </Button>
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
                    <Button variant="ghost" size="icon" className="text-primary hover:text-destructive hover:bg-orange-50">
                        <Image src="/fire.png" width={20} height={20} alt="fire" />
                    </Button>
                </LayeredCard>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <h2 className="text-xl font-semibold mb-3">My Trainers</h2>

                {/* Communities */}
                <div className="space-y-4 p-2">
                    {agentData.map((community, index) => (
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
                                    <Button size="sm" variant="outline" className="text-primary font-bold hover:text-primary-dark">
                                        Chat
                                    </Button>
                                </div>
                                <p className="text-md leading-relaxed">{community.description}</p>
                            </div>
                        </LayeredCard>
                    ))}
                </div>
            </div>
        </>
    )
}

