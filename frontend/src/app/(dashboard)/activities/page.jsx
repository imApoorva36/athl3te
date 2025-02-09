'use client'

import { Button } from "@/components/ui/button"
import LayeredCard from "@/components/LayeredCard";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function MyActivities() {
    const [activities, setActivities] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await fetch("/api/strava/activities"); // Calls the API route
                const data = await response.json();

                if (!response.ok) throw new Error(data.error || "Failed to fetch activities");
                const formattedActivities = data.map(activity => ({
                    name: activity.name || "Unknown Activity",
                    type: activity.sport_type || activity.type || "Unknown",
                    date: activity.start_date_local ? activity.start_date_local.split("T")[0] : "Unknown",
                    bpm: activity.average_heartrate || 0, // Default to 0 if not available
                    distance: (activity.distance / 1000).toFixed(2), // Convert meters to km
                    duration: (activity.moving_time / 60).toFixed(1), // Convert seconds to minutes
                }));
                setActivities([...myActivitiesData, ...formattedActivities]);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchActivities();
    }, []);
    console.log(activities);
    const myActivitiesData = [
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
                    <Link href="/collections">
                        <Image src="/fire.png" width={20} height={20} alt="fire" className="m-2" />
                    </Link>
                </LayeredCard>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <h2 className="text-xl font-semibold mb-3">My Activities</h2>

                {/* Activities */}
                <div className="space-y-4 p-2 w-full">
                    {activities.map((activity, index) => (
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

