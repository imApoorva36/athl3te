import { SecretVaultWrapper } from 'nillion-sv-wrappers';
import { v4 as uuidv4 } from 'uuid';
import { orgConfig } from '../../../../../nillion/nillionOrgConfig.js';

const SCHEMA_ID = '5bb2355f-c42c-491a-a883-392ac92869a9';

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
        const newIds = [...new Set(dataWritten.flatMap(item => item.result.data.created))];

        return Response.json(newIds);
    } catch (error) {
        console.error('❌ Upload error:', error.message);
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const filter = searchParams.get('filter');

        const collection = new SecretVaultWrapper(
            orgConfig.nodes,
            orgConfig.orgCredentials,
            SCHEMA_ID
        );
        await collection.init();

        const decryptedCollectionData = await collection.readFromNodes({ _id: filter });
        return Response.json(decryptedCollectionData);
    } catch (error) {
        console.error('❌ Fetch error:', error.message);
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
}
