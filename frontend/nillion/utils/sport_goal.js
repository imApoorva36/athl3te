import { SecretVaultWrapper } from 'nillion-sv-wrappers';
import { v4 as uuidv4 } from 'uuid';
import { orgConfig } from '../nillionOrgConfig.js';

const SCHEMA_ID = '5bb2355f-c42c-491a-a883-392ac92869a9';

export async function uploadToNillion(data) {
    try {
        const collection = new SecretVaultWrapper(
            orgConfig.nodes,
            orgConfig.orgCredentials,
            SCHEMA_ID
        );
        await collection.init();

        const formattedData = data.map(item => ({
            _id: uuidv4().toString(),
            intervalDuration: { $allot: item.intervalDuration },
            completedMetrices: item.completedMetrices.map(metric => ({
                distance: { $allot: metric.distance },
                calories: { $allot: metric.calories }
            })),
            targetMertices: item.targetMertices.map(metric => ({
                distance: { $allot: metric.distance },
                calories: { $allot: metric.calories }
            })),
            goalDayWisePlan: item.goalDayWisePlan.map(metric => ({
                distance: { $allot: metric.distance },
                calories: { $allot: metric.calories }
            }))
        }));

        const dataWritten = await collection.writeToNodes(formattedData);
        const newIds = [...new Set(dataWritten.map((item) => item.result.data.created).flat())];

        return { success: true, ids: newIds };
    } catch (error) {
        console.error('❌ Upload error:', error.message);
        return { success: false, error: error.message };
    }
}

export async function fetchFromNillion() {
    try {
        const collection = new SecretVaultWrapper(
            orgConfig.nodes,
            orgConfig.orgCredentials,
            SCHEMA_ID
        );
        await collection.init();

        const decryptedCollectionData = await collection.readFromNodes({});
        return { success: true, data: decryptedCollectionData };
    } catch (error) {
        console.error('❌ Fetch error:', error.message);
        return { success: false, error: error.message };
    }
}
const data = [
    {
        "intervalDuration": "weekly",
        "completedMetrices": [
            {
                "distance": "5km",
                "calories": "500kcal"
            },
            {
                "distance": "6km",
                "calories": "600kcal"
            }
        ],
        "targetMertices": [
            {
                "distance": "7km",
                "calories": "700kcal"
            }
        ],
        "goalDayWisePlan": [
            {
                "distance": "6.5km",
                "calories": "650kcal"
            }
        ]
    }
]