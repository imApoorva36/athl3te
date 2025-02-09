import { Button } from "@/components/ui/button"
import LayeredCard from "@/components/LayeredCard";
import Image from "next/image";
import Link from "next/link";

export const agentData = [
    {
        logo: "/agents/personal_ai_agent.png",
        name: "Personal Trainer Agent",
        agent_name: "personal_bot",
        description:
            "Personal Trainer Agent provides personalized plans and suggestions to help you reach your fitness goals."
    },
    {
        logo: "/agents/sports_goal_creation_agent.png",
        name: "Goal Setting Agent",
        agent_name: "goal_setting_bot",
        description:
            "Goal Setting Agent helps you set fitness goals, providing personalized plans and progress tracking to help you achieve your targets."
    },
    {
        logo: "/agents/recovery_coach_agent.png",
        name: "Injury Agent",
        agent_name: "injury_bot",
        description:
            "Injury Agent helps you prevent from common sports injuries, providing advice, and recovery plans to keep you healthy and active."
    },
    {
        logo: "/agents/nutrition_agent.png",
        name: "Nutrition Agent",
        agent_name: "nutrition_bot",
        description:
            "Nutrition Agent helps you track and improve your diet, providing calorie tracking, and nutritional advice to help you reach your health goals."
    }
];

export default function MyAgents() {

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
                                    <Image src={community.logo} width={30} height={30} alt="logo" />
                                    <h2 className="text-lg font-semibold">{community.name}</h2>
                                    <Link href={
                                        `/trainers/${community.agent_name}`
                                    }>
                                        <Button size="sm" variant="outline" className="text-primary font-bold hover:text-primary-dark">
                                            Chat
                                        </Button>
                                    </Link>
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

