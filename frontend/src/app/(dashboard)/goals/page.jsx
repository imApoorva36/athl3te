import { Button } from "@/components/ui/button"
import LayeredCard from "@/components/LayeredCard";
import Image from "next/image";
import GoalCard from "@/components/GoalsCard";
import Link from "next/link";

export default function MyGoals() {

    const colors = {
        Running: "bg-blue-500",
        Walking: "bg-green-500",
        Cycling: "bg-yellow-500",
        Swimming: "bg-purple-500"
    };

    const myGoalsData = [{
        type: "Running",
        data: {
            distance: "5 km",
            calories: "75 kcal",
            duration: "30 min",
            speed: "10 km/h"
        }
    },
    {
        type: "Walking",
        data: {
            distance: "3 km",
            calories: "50 kcal",
            duration: "45 min",
            speed: "4 km/h"
        }
    },
    {
        type: "Cycling",
        data: {
            distance: "15 km",
            calories: "200 kcal",
            duration: "60 min",
            speed: "15 km/h"
        }
    },
    {
        type: "Swimming",
        data: {
            distance: "1 km",
            calories: "300 kcal",
            duration: "40 min",
            speed: "2.5 km/h"
        }
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
                    <Button variant="ghost" size="icon" className="text-primary hover:text-descructive hover:bg-orange-50">
                        <Image src="/fire.png" width={20} height={20} alt="fire" />
                    </Button>
                </LayeredCard>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <h2 className="text-xl font-semibold mb-3">My Goals</h2>

                {/* Activities */}
                <div className="space-y-4 p-2 w-full">
                    {myGoalsData.map((goals, index) => (
                        <LayeredCard
                            key={index}
                            mainColor="bg-accent"
                            bgColor={colors[goals.type]}
                            borderWidth="border-[2px]"
                            topOffset="top-[20px]"
                            leftOffset="left-[24px]"
                            roundedness="rounded-xl"
                            textColor="text-black"
                        >
                            <div className="p-4 w-full">
                                <GoalCard
                                    type={goals.type}
                                    data={goals.data}
                                    color={colors[goals.type]}
                                />
                            </div>
                        </LayeredCard>
                    ))}
                </div>
            </div>
        </>
    )
}

