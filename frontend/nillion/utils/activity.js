import { SecretVaultWrapper } from 'nillion-sv-wrappers';
import { v4 as uuidv4 } from 'uuid';
import { orgConfig } from '../nillionOrgConfig.js';

const SCHEMA_ID = 'ad4d522f-65ad-42a7-b1f9-349be81cd45e';

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
            distance: { $allot: item.distance },
            time: { $allot: item.time },
            speed: { $allot: item.speed },
            calories: { $allot: item.calories },
            cadence: { $allot: item.cadence },
            activityType: { $allot: item.activityType },
            pr: { $allot: item.pr }
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