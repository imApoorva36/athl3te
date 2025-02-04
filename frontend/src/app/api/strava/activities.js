import axios from 'axios';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const access_token = searchParams.get('access_token');

    if (!access_token) {
        return new Response(JSON.stringify({ error: 'Missing access_token' }), { status: 400 });
    }

    try {
        console.log('Fetching activities with access token:', access_token); // Debugging line
        const response = await axios.get('https://www.strava.com/api/v3/athlete/activities', {
            headers: { Authorization: `Bearer ${access_token}` },
        });

        console.log('Activities fetched:', response.data); // Debugging line
        return new Response(JSON.stringify(response.data), { status: 200 });
    } catch (error) {
        console.error('Error fetching activities:', error); // Debugging line
        return new Response(JSON.stringify({ error: 'Failed to fetch activities' }), { status: 500 });
    }
}