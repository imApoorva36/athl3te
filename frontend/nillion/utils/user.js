import { SecretVaultWrapper } from 'nillion-sv-wrappers';
import { v4 as uuidv4 } from 'uuid';
import { orgConfig } from '../nillionOrgConfig.js';

const SCHEMA_ID = 'a701b290-1526-4b2c-a32f-00434ce85aac';

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
            age: { $allot: item.age },
            gender: { $allot: item.gender },
            name: { $allot: item.name },
            weight: { $allot: item.weight },
            height: { $allot: item.height },
            injuryDescription: { $allot: "" },
        }));

        const dataWritten = await collection.writeToNodes(formattedData);
        const newIds = [...new Set(dataWritten.map((item) => item.result.data.created).flat())];

        return { newIds };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function fetchFromNillion(data) {
    try {
        const collection = new SecretVaultWrapper(
            orgConfig.nodes,
            orgConfig.orgCredentials,
            SCHEMA_ID
        );
        await collection.init();

        const decryptedCollectionData = await collection.readFromNodes({ _id: data });
        return { success: true, data: decryptedCollectionData };
    } catch (error) {
        console.error('❌ Fetch error:', error.message);
        return { success: false, error: error.message };
    }
}