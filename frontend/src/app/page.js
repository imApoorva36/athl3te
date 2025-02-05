"use client";

import { useState, useEffect } from "react";
import ActivityCard from "../components/ActivityCard";

export default function Home() {
    const [authData, setAuthData] = useState(null);
    const [activities, setActivities] = useState([]);
    const [stats, setStats] = useState({ totalDistance: 0, totalRuns: 0 });
    const [userName, setUserName] = useState('');

    const handleLogin = () => {
        const clientId = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID;
        const redirectUri = process.env.NEXT_PUBLIC_STRAVA_REDIRECT_URI;
        const authUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=read,activity:read`;

        window.location.href = authUrl;
    };

    const handleCallback = async (code) => {
        const res = await fetch(`/api/strava/auth?code=${code}`);
        const data = await res.json();
        console.log('Auth Response:', data);
        if (data.access_token) {
            setAuthData({ access_token: data.access_token });
            fetchAthlete(data.access_token);
        }
    };

    const fetchAthlete = async (accessToken) => {
        const res = await fetch(`https://www.strava.com/api/v3/athlete`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        const data = await res.json();
        setUserName(data.firstname + ' ' + data.lastname);
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (code) {
            handleCallback(code);
        }
    }, []);

    const fetchActivities = async () => {
        if (!authData) return;

        const res = await fetch(`/api/strava/activities?access_token=${authData.access_token}`);
        const data = await res.json();
        console.log('Activities Response:', data);
        setActivities(data.slice(0, 12)); // Limit to 12 activities

        const totalDistance = data.reduce((acc, activity) => acc + activity.distance, 0);
        const totalRuns = data.filter(activity => activity.type === 'Run').length;
        setStats({ totalDistance, totalRuns });
    };

    const sampleActivity = {
        distance: 5000,
        time: 30,
        speed: 10,
        calories: 300,
        cadence: 80,
        activityType: 'Run',
        title: "Morning Run",
        pr: '5K Personal Best',
      };

    return (
        <div>

      {/* <ActivityCard title="Morning Run" activity={sampleActivity} /> */}
      <div className="p-8">
      {/* <LayeredCard 
        title="Welcome Back"
        content="This is a layered card component with a colored background card creating a stacked effect."
        backgroundColor="#94a3b8"
      /> */}
      <ActivityCard activity={sampleActivity}>

      </ActivityCard>
    </div>
      </div>
        // <div className="flex flex-col items-center justify-center min-h-screen bg-black-100 p-6">
        //     <h1 className="text-3xl font-bold mb-4">Strava Integration</h1>
            
        //     {!authData ? (
        //         <button onClick={handleLogin} className="bg-orange-500 text-white px-4 py-2 rounded">
        //             Login with Strava
        //         </button>
        //     ) : (
        //         <>
        //             <p className="text-blue mb-4">Welcome, {userName}!</p>
        //             <button onClick={fetchActivities} className="bg-green-500 text-white px-4 py-2 rounded">
        //                 Fetch Activities
        //             </button>
        //         </>
        //     )}

        //     {stats.totalRuns > 0 && (
        //         <div className="mt-6 w-full max-w-md text-white">
        //             <p>Total Runs: {stats.totalRuns}</p>
        //             <p>Total Distance: {stats.totalDistance} meters</p>
        //         </div>
        //     )}

        //     {activities.length > 0 && (
        //         <div className="mt-6 w-full max-w-4xl">
        //             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        //                 {activities.map((activity) => (
        //                     <div key={activity.id} className="bg-gray-800 text-white p-4 rounded shadow">
        //                         <p className="font-bold">{activity.name}</p>
        //                         <p>Type: {activity.type}</p>
        //                         <p>Distance: {activity.distance} meters</p>
        //                         <p>Duration: {activity.moving_time} seconds</p>
        //                         <p>Date: {new Date(activity.start_date).toLocaleDateString()}</p>
        //                     </div>
        //                 ))}
        //             </div>
        //         </div>
        //     )}
        // </div>
    );
}