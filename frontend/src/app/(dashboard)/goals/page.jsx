import { Button } from "@/components/ui/button"
import LayeredCard from "@/components/LayeredCard";
import Image from "next/image";
import GoalCard from "@/components/GoalsCard";

export default function MyGoals() {

    const colors = {
        Running: "bg-blue-500",
        Walking: "bg-green-500",
        Cycling: "bg-yellow-500",
        Swimming: "bg-purple-500"
    };

    const myGoalsData = [{
        type: "Running",
        metricData: {
            distance: [
                { achieved: "2 km", target: "5 km", percentage: 40 },
                { achieved: "2 km", target: "5 km", percentage: 40 },
                { achieved: "2 km", target: "5 km", percentage: 40 },
            ],
            calories: [
                { achieved: "30 kcal", target: "75 kcal", percentage: 40 },
                { achieved: "35 kcal", target: "75 kcal", percentage: 47 },
                { achieved: "40 kcal", target: "75 kcal", percentage: 53 },
            ],
        }
    },
    {
        type: "Walking",
        metricData: {
            distance: [
                { achieved: "2 km", target: "5 km", percentage: 40 },
                { achieved: "2 km", target: "5 km", percentage: 40 },
                { achieved: "2 km", target: "5 km", percentage: 40 },
            ],
            calories: [
                { achieved: "30 kcal", target: "75 kcal", percentage: 40 },
                { achieved: "35 kcal", target: "75 kcal", percentage: 47 },
                { achieved: "40 kcal", target: "75 kcal", percentage: 53 },
            ],
        }
    },
    {
        type: "Cycling",
        metricData: {
            distance: [
                { achieved: "2 km", target: "5 km", percentage: 40 },
                { achieved: "2 km", target: "5 km", percentage: 40 },
                { achieved: "2 km", target: "5 km", percentage: 40 },
            ],
            calories: [
                { achieved: "30 kcal", target: "75 kcal", percentage: 40 },
                { achieved: "35 kcal", target: "75 kcal", percentage: 47 },
                { achieved: "40 kcal", target: "75 kcal", percentage: 53 },
            ],
        }
    },
    {
        type: "Swimming",
        metricData: {
            distance: [
                { achieved: "2 km", target: "5 km", percentage: 40 },
                { achieved: "2 km", target: "5 km", percentage: 40 },
                { achieved: "2 km", target: "5 km", percentage: 40 },
            ],
            calories: [
                { achieved: "30 kcal", target: "75 kcal", percentage: 40 },
                { achieved: "35 kcal", target: "75 kcal", percentage: 47 },
                { achieved: "40 kcal", target: "75 kcal", percentage: 53 },
            ],
        }
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
                                <GoalCard type={goals.type} metricData={goals.metricData} color={colors[goals.type]} />
                            </div>
                        </LayeredCard>
                    ))}
                </div>
            </div>
        </>
    )
}

