import { SecretVaultWrapper } from 'nillion-sv-wrappers';
import { v4 as uuidv4 } from 'uuid';
import { orgConfig } from '../nillionOrgConfig.js';

const SCHEMA_ID = '8e897a3d-b65b-4e24-a42f-417d51a05a5e';

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
            chat_id: item.chat_id,
            sender: item.sender,
            message: { $allot: item.message },
            timestamp: item.timestamp,
            ipfsImageURL: { $allot: item.ipfsImageURL }
        }));

        const dataWritten = await collection.writeToNodes(formattedData);
        const newIds = [...new Set(dataWritten.map((item) => item.result.data.created).flat())];

        return { success: true, ids: newIds };
    } catch (error) {
        console.error('❌ Upload error:', error.message);
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

        const decryptedCollectionData = await collection.readFromNodes({ chat_id: data });
        return { success: true, data: decryptedCollectionData };
    } catch (error) {
        console.error('❌ Fetch error:', error.message);
        return { success: false, error: error.message };
    }
}