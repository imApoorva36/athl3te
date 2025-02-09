import { SecretVaultWrapper } from 'nillion-sv-wrappers';
import { v4 as uuidv4 } from 'uuid';
import { orgConfig } from '../nillionOrgConfig.js';
const SCHEMA_ID = '5bb2355f-c42c-491a-a883-392ac92869a9';
const data = [
    {
        "_id": uuidv4().toString(),
        "intervalDuration": {
            "$allot": "weekly"
        },
        "completedMetrices": [
            {
                "distance": {
                    "$allot": "5km"
                },
                "calories": {
                    "$allot": "500kcal"
                }
            },
            {
                "distance": {
                    "$allot": "6km"
                },
                "calories": {
                    "$allot": "600kcal"
                }
            }
        ],
        "targetMertices": [
            {
                "distance": {
                    "$allot": "7km"
                },
                "calories": {
                    "$allot": "700kcal"
                }
            }
        ],
        "goalDayWisePlan": [
            {
                "distance": {
                    "$allot": "6.5km"
                },
                "calories": {
                    "$allot": "650kcal"
                }
            }
        ]
    }
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
            JSON.stringify(decryptedCollectionData.slice(0, 5), null, 2)
        );
    } catch (error) {
        console.error('❌ SecretVaultWrapper error:', error.message);
        process.exit(1);
    }
}

main();