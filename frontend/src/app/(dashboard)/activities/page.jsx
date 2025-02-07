import { Button } from "@/components/ui/button"
import LayeredCard from "@/components/LayeredCard";
import Image from "next/image";

export default function MyActivities() {
    const myActivitiesData = [{
        name: "Mangalore Run",
        type: "Running",
        date: "2022-10-10",
        bpm: 120,
        distance: 10,
        duration: 60,
    },
    {
        name: "Surathkal Walk",
        type: "Walking",
        date: "2022-10-10",
        bpm: 100,
        distance: 5,
        duration: 30,
    },
    {
        name: "Mukka Cycle",
        type: "Cycling",
        date: "2022-10-10",
        bpm: 110,
        distance: 15,
        duration: 45,
    },
    {
        name: "NITK Swim",
        type: "Swimming",
        date: "2022-10-10",
        bpm: 90,
        distance: 1,
        duration: 15,
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
                <h2 className="text-xl font-semibold mb-3">My Activities</h2>

                {/* Activities */}
                <div className="space-y-4 p-2 w-full">
                    {myActivitiesData.map((activity, index) => (
                        <LayeredCard
                            key={index}
                            mainColor="bg-accent"
                            bgColor="bg-primary"
                            borderWidth="border-[2px]"
                            topOffset="top-[14px]"
                            leftOffset="left-[24px]"
                            roundedness="rounded-xl"
                            textColor="text-black"
                        >
                            <div className="p-4 w-full">
                                <div className="flex flex-row  justify-between mb-3">
                                    {activity.type == 'Running' && <Image src="/sports/orange/run.png" width={30} height={20} alt="running" />}
                                    {activity.type == 'Walking' && <Image src="/sports/orange/walk.png" width={30} height={20} alt="walking" />}
                                    {activity.type == 'Cycling' && <Image src="/sports/orange/cycle.png" width={30} height={20} alt="cycling" />}
                                    {activity.type == 'Swimming' && <Image src="/sports/orange/swim.png" width={30} height={20} alt="swimming" />}
                                    <h2 className="text-lg font-semibold">{activity.name}</h2>
                                    <div className="text-sm text-gray-600">{activity.date}</div>
                                </div>
                                <div className="flex justify-between text-xs pt-2 w-4/5 mx-auto">
                                    <div className="flex flex-col items-center gap-1">
                                        <Image src="/metrics/distance.png" width={20} height={20} alt="distance" />
                                        {activity.distance}km
                                    </div>
                                    <div className="flex flex-col items-center gap-1">
                                        <Image src="/metrics/time.png" width={20} height={20} alt="duration" />
                                        {activity.duration}min
                                    </div>
                                    <div className="flex flex-col items-center gap-1">
                                        <Image src="/metrics/heart_rate.png" width={20} height={20} alt="bpm" />
                                        {activity.bpm}
                                    </div>
                                </div>
                            </div>
                        </LayeredCard>
                    ))}
                </div>
            </div>
        </>
    )
}

