import axios from 'axios';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');

    if (!code) {
        return new Response(JSON.stringify({ error: 'Missing code parameter' }), { status: 400 });
    }

    try {
        const response = await axios.post('https://www.strava.com/oauth/token', {
            client_id: process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID,
            client_secret: process.env.STRAVA_CLIENT_SECRET,
            code,
            grant_type: 'authorization_code',
        });

        return new Response(JSON.stringify(response.data), { status: 200 });
    } catch (error) {
        console.error('Error authenticating with Strava:', error); // Debugging line
        return new Response(JSON.stringify({ error: 'Failed to authenticate with Strava' }), { status: 500 });
    }
}