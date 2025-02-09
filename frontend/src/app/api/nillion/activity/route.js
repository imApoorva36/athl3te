import { SecretVaultWrapper } from 'nillion-sv-wrappers';
import { v4 as uuidv4 } from 'uuid';
import { orgConfig } from '../../../../../nillion/nillionOrgConfig.js';

const SCHEMA_ID = 'ad4d522f-65ad-42a7-b1f9-349be81cd45e';

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
            distance: { $allot: item.distance },
            time: { $allot: item.time },
            speed: { $allot: item.speed },
            calories: { $allot: item.calories },
            cadence: { $allot: item.cadence },
            activityType: { $allot: item.activityType },
            pr: { $allot: item.pr },
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
