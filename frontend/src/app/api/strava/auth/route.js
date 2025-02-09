import { NextResponse } from "next/server";

export async function GET(req) {
    const client_id = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID;
    const client_secret = process.env.STRAVA_CLIENT_SECRET;

    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    if (!code) {
        return NextResponse.json({ error: "Authorization code is missing" }, { status: 400 });
    }

    try {
        const response = await fetch("https://www.strava.com/oauth/token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                client_id,
                client_secret,
                code,
                grant_type: "authorization_code",
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json({ error: "Failed to fetch token" }, { status: response.status });
        }

        // Create a response object and set the cookie
        const redirectResponse = NextResponse.redirect(new URL("/activities", req.url));
        redirectResponse.cookies.set("strava_access_token", data.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: data.expires_in, // Token expiration from Strava response
        });

        return redirectResponse;
    } catch {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
