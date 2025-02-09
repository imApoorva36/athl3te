import { SecretVaultWrapper } from 'nillion-sv-wrappers';
import { v4 as uuidv4 } from 'uuid';
import { orgConfig } from '../nillionOrgConfig.js';

const SCHEMA_ID = 'ffa6b00a-cdd1-42dd-a7c2-85c86d0156ee';

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
                proteins: { $allot: metric.proteins },
                carbohydrates: { $allot: metric.carbohydrates },
                fats: { $allot: metric.fats },
                caloriesConsumed: { $allot: metric.caloriesConsumed },
                hydration: { $allot: metric.hydration }
            })),
            targetMertices: item.targetMertices.map(metric => ({
                proteins: { $allot: metric.proteins },
                carbohydrates: { $allot: metric.carbohydrates },
                fats: { $allot: metric.fats },
                caloriesConsumed: { $allot: metric.caloriesConsumed },
                hydration: { $allot: metric.hydration }
            })),
            goalDayWisePlan: item.goalDayWisePlan.map(metric => ({
                proteins: { $allot: metric.proteins },
                carbohydrates: { $allot: metric.carbohydrates },
                fats: { $allot: metric.fats },
                caloriesConsumed: { $allot: metric.caloriesConsumed },
                hydration: { $allot: metric.hydration }
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