import { SecretVaultWrapper } from 'nillion-sv-wrappers';
import { v4 as uuidv4 } from 'uuid';
import { orgConfig } from '../../../../../nillion/nillionOrgConfig.js';

const SCHEMA_ID = 'a701b290-1526-4b2c-a32f-00434ce85aac';

export async function POST(req) {
    try {
        console.log(req)
        const { data } = await req.json();
        console.log(data);
        if (!Array.isArray(data) || data.length === 0) {
            return Response.json({ success: false, error: 'Invalid data format' }, { status: 400 });
        }

        const collection = new SecretVaultWrapper(
            orgConfig.nodes,
            orgConfig.orgCredentials,
            SCHEMA_ID
        );
        await collection.init();

        const formattedData = data.map(item => ({
            _id: uuidv4(),
            age: { $allot: item.age },
            gender: { $allot: item.gender },
            name: { $allot: item.name },
            weight: { $allot: item.weight },
            height: { $allot: item.height },
            injuryDescription: { $allot: "" },
        }));

        const dataWritten = await collection.writeToNodes(formattedData);
        const newIds = [...new Set(dataWritten.flatMap(item => item.result.data.created))];

        return Response.json(newIds);
    } catch (error) {
        console.error('❌ Upload error:', error.message);
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        const collection = new SecretVaultWrapper(
            orgConfig.nodes,
            orgConfig.orgCredentials,
            SCHEMA_ID
        );
        await collection.init();

        const decryptedCollectionData = await collection.readFromNodes({});
        return Response.json({ success: true, data: decryptedCollectionData });
    } catch (error) {
        console.error('❌ Fetch error:', error.message);
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
}
