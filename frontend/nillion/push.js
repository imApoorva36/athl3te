import { SecretVaultWrapper } from 'nillion-sv-wrappers';
import { v4 as uuidv4 } from 'uuid';
import { orgConfig } from './nillionOrgConfig.js';
const SCHEMA_ID = '9b126349-e615-40c1-8c86-21e5aa787be3';
const data = [
  {
    name: { $allot: 'This will be encrypted' }, // name will be encrypted to a $share
    years_in_web3: { $allot: 8 }, // years_in_web3 will be encrypted to a $share
    responses: [
      { rating: 5, question_number: 1 },
      { rating: 3, question_number: 2 },
    ], // responses will be stored in plaintext
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
      decryptedCollectionData.slice(0, data.length)
    );
  } catch (error) {
    console.error('❌ SecretVaultWrapper error:', error.message);
    process.exit(1);
  }
}

main();
