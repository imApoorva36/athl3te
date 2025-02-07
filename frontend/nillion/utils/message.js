import { SecretVaultWrapper } from 'nillion-sv-wrappers';
import { v4 as uuidv4 } from 'uuid';
import { orgConfig } from '../nillionOrgConfig.js';
import { inspect } from 'util';
const SCHEMA_ID = '8e897a3d-b65b-4e24-a42f-417d51a05a5e';
const data = [
    {
        _id: uuidv4().toString(),
        chat_id: "123456789",
        sender: "Sender1",
        message: { $allot: 'This will be encrypted' },
        timestamp: new Date().toISOString(),
        ipfsImageURL: { $allot: "https://ipfs.io/ipfs/QmZ" }
    },
];

async function main() {
    try {
        // Create a secret vault wrapper and initialize the SecretVault collection to use
        const collection = new SecretVaultWrapper(
            orgConfig.nodes,
            orgConfig.orgCredentials,
            SCHEMA_ID
        );
        await collection.init();

        // Write collection data to nodes encrypting the specified fields ahead of time
        const dataWritten = await collection.writeToNodes(data);
        console.log(
            '👀 Data written to nodes:',
            JSON.stringify(dataWritten, null, 2)
        );

        // Get the ids of the SecretVault records created
        const newIds = [
            ...new Set(dataWritten.map((item) => item.result.data.created).flat()),
        ];
        console.log('uploaded record ids:', newIds);

        // Read all collection data from the nodes, decrypting the specified fields
        const decryptedCollectionData = await collection.readFromNodes({});

        // Log first 5 records
        console.log(
            'Most recent records',
            inspect(decryptedCollectionData.slice(0, data.length), { depth: null, colors: true })
        );
    } catch (error) {
        console.error('❌ SecretVaultWrapper error:', error.message);
        process.exit(1);
    }
}

main();
