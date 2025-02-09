import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req) {
    const cookies = req.headers.get("cookie") || "";
    const tokenMatch = cookies.match(/strava_access_token=([^;]*)/);
    const access_token = tokenMatch ? tokenMatch[1] : null;

    if (!access_token) {
        return NextResponse.json({ error: "Unauthorized: No token found" }, { status: 401 });
    }

    try {
        const response = await axios.get("https://www.strava.com/api/v3/athlete/activities", {
            headers: { Authorization: `Bearer ${access_token}` },
        });

        return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
        console.error("Error fetching activities:", error);
        return NextResponse.json({ error: "Failed to fetch activities" }, { status: 500 });
    }
}
