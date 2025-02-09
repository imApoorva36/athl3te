import { CronJob } from 'cron';
import sendApiRequest from './apiUtility';

export const BOTS = {
  MOTIVATION: 'motivation',
  TIPS: 'tips',
  HIGHLIGHTS: 'highlight_performers',
  INJURY: 'injury_advice'
};

class BotScheduler {
  constructor() {
    this.jobs = [];
    this.initializeJobs();
  }

  async executeBotLogic(botType) {
    const bot = this.getBotConfig(botType);

    try {
      console.log(`Running ${bot.name}`);

      const result = await sendApiRequest(bot.request);
      console.log(result.response);
      return result.response;
    } catch (error) {
      console.error(`Error running bot ${bot.name}:`, error);
      // Optionally, implement a retry logic here or an alerting mechanism
      throw error;
    }
  }

  getBotConfig(botType) {
    const baseConfig = {
      params: {
        name: "RunnersPro",
        activity_type: "running",
        injuries: ["runner's knee", "shin splints"],
        member_count: 1000,
        top_performers: [{
          name: "John Doe",
          achievements: ["Marathon PB: 2:45", "Weekly distance: 80km"],
          activity_stats: { avg_pace: "4:30/km" },
          join_date: "2025-02-07T12:00:00"
        }]
      },
      input_text: ""
    };

    const configs = {
      [BOTS.MOTIVATION]: {
        name: "Community Bot (Motivation)",
        request: {
          agent_name: "community_bot",
          action: "motivation",
          ...baseConfig
        }
      },
      [BOTS.TIPS]: {
        name: "Community Bot (Tips)",
        request: {
          agent_name: "community_bot",
          action: "tips",
          ...baseConfig
        }
      },
      [BOTS.HIGHLIGHTS]: {
        name: "Community Bot (Highlights)",
        request: {
          agent_name: "community_bot",
          action: "highlight_performers",
          ...baseConfig
        }
      },
      [BOTS.INJURY]: {
        name: "Community Bot (Injury)",
        request: {
          agent_name: "community_bot",
          action: "injury_advice",
          ...baseConfig
        }
      }
    };

    return configs[botType];
  }

  initializeJobs() {
    // Motivation bot - 8 AM daily
    this.addJob('0 8 * * *', BOTS.MOTIVATION);

    // Tips bot - 12 PM daily
    this.addJob('0 12 * * *', BOTS.TIPS);

    // Highlights bot - 9 PM daily
    this.addJob('0 21 * * *', BOTS.HIGHLIGHTS);

    // Injury advice bot - 12 AM daily
    this.addJob('0 0 * * *', BOTS.INJURY);
  }

  addJob(cronSchedule, botType) {
    try {
      const job = new CronJob(cronSchedule, () => this.executeBotLogic(botType));
      job.start();
      this.jobs.push(job);
    } catch (error) {
      console.error(`Error adding job for ${botType}:`, error);
    }
  }

  stopAllJobs() {
    this.jobs.forEach(job => job.stop());
    this.jobs = [];
  }

  // Optional: Method to stop a specific job
  stopJob(botType) {
    const jobIndex = this.jobs.findIndex(job => job.callback.name === botType);
    if (jobIndex > -1) {
      this.jobs[jobIndex].stop();
      this.jobs.splice(jobIndex, 1);
      console.log(`${botType} job stopped`);
    } else {
      console.log(`No job found for ${botType}`);
    }
  }
}

// Singleton instance
let schedulerInstance = null;

export function getScheduler() {
  if (!schedulerInstance) {
    schedulerInstance = new BotScheduler();
  }
  return schedulerInstance;
}
