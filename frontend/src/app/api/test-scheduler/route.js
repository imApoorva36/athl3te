import { getScheduler, BOTS } from '../../../utils/scheduledTask';

let lastExecutionResults = {};

export async function POST(req) {
  const { botType } = await req.json();

  if (!Object.values(BOTS).includes(botType)) {
    return new Response(JSON.stringify({
      message: 'Invalid bot type',
      validTypes: Object.values(BOTS),
    }), { status: 400 });
  }

  try {
    const scheduler = getScheduler();
    const result = await scheduler.executeBotLogic(botType);

    lastExecutionResults[botType] = {
      result,
      timestamp: new Date().toISOString(),
    };

    return new Response(JSON.stringify({ data: result }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Failed to execute bot',
      message: error.message,
      stack: error.stack,
    }), { status: 500 });
  }
}


export async function GET() {
  return new Response(JSON.stringify(lastExecutionResults), { status: 200 });
}
