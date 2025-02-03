require('dotenv').config();
const strava = require('strava-v3');

async function getAllActivities () {
    const payload = await strava.athlete.listActivities({'access_token':process.env.STRAVA_ACCESS_TOKEN})
    return payload;
}

getAllActivities().then(result => {
    console.log(result);
})
.catch(error => {
    console.error("Error:", error);
});