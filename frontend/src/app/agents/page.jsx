"use client";

import { useState } from "react";
import sendApiRequest from "./apiUtility";

export default function BotsPage() {
  const [loading, setLoading] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const botRequests = [
    {
      name: "Goal Setting Bot",
      request: {
        agent_name: "goal_setting_bot",
        action: "",
        params: {},
        input_text:
          "I want to cycle 20.5km three times a week for the next month, targeting a speed of 25.5kmph. I also want to track my nutrition, aiming for 2000 calories per day with 150.5g protein.",
      },
    },
    {
      name: "Injury Bot (Prevention)",
      request: {
        agent_name: "injury_bot",
        action: "prevention",
        params: {
          injuries: ["sprained ankle", "runner's knee"],
          personal_info:
            "32-year-old recreational runner, runs 20km per week, has flat feet, works desk job, history of lower back pain",
        },
        input_text: "How can I prevent further knee injuries while continuing to run?",
      },
    },
    {
      name: "Injury Bot (Recovery)",
      request: {
        agent_name: "injury_bot",
        action: "recovery",
        params: {
          injuries: ["sprained ankle", "runner's knee"],
          personal_info:
            "32-year-old recreational runner, runs 20km per week, has flat feet, works desk job, history of lower back pain",
        },
        input_text: "What should I do to recover from my sprained ankle?",
      },
    },
    {
      name: "Nutrition Bot",
      request: {
        agent_name: "nutrition_bot",
        action: "",
        params: {
          user_goal: {
            nutrition: {
              protein: 150,
              carbs: 250,
              fats: 70,
              calories_consumed: 2200,
              water_consumed: 3000,
              frequency: 7,
              duration: 30,
            },
          },
          nutrition_logs: [
            {
              date: "2025-02-07T12:00:00",
              protein: 130,
              carbs: 220,
              fats: 65,
              calories_consumed: 2000,
              water_consumed: 2500,
            },
            {
              date: "2025-02-07T12:30:00",
              protein: 145,
              carbs: 260,
              fats: 75,
              calories_consumed: 2300,
              water_consumed: 2800,
            },
          ],
        },
        input_text: "How am I doing with my nutrition?",
      },
    },
    {
      name: "Personal Bot (Recovery)",
      request: {
        agent_name: "personal_bot",
        action: "recovery",
        params: {
          date: "2025-02-07T12:00:00",
          goals_progress: "Completed 18km cycling, meeting 90% of weekly target",
          nutrition_feedback: "Protein intake on target, need to increase water intake",
          injury_updates: "Knee pain reduced, continuing rehab exercises",
          sentiment: "feeling tired but determined",
        },
        input_text: "What should I do to recover from my sprained ankle?",
      },
    },
    {
      name: "Community Bot (Injury Advice)",
      request: {
        agent_name: "community_bot",
        action: "injury_advice",
        params: {
          name: "RunnersPro",
          activity_type: "running",
          injuries: ["runner's knee", "shin splints"],
          member_count: 1000,
          top_performers: [
            {
              name: "John Doe",
              achievements: ["Marathon PB: 2:45", "Weekly distance: 80km"],
              activity_stats: {
                avg_pace: "4:30/km",
              },
              join_date: "2025-02-07T12:00:00",
            },
          ],
        },
        input_text: "",
      },
    },
    {
      name: "Community Bot (Motivation)",
      request: {
        agent_name: "community_bot",
        action: "motivation",
        params: {
          name: "RunnersPro",
          activity_type: "running",
          injuries: ["runner's knee", "shin splints"],
          member_count: 1000,
          top_performers: [
            {
              name: "John Doe",
              achievements: ["Marathon PB: 2:45", "Weekly distance: 80km"],
              activity_stats: {
                avg_pace: "4:30/km",
              },
              join_date: "2025-02-07T12:00:00",
            },
          ],
        },
        input_text: "",
      },
    },
    {
      name: "Community Bot (Tips)",
      request: {
        agent_name: "community_bot",
        action: "tips",
        params: {
          name: "RunnersPro",
          activity_type: "running",
          injuries: ["runner's knee", "shin splints"],
          member_count: 1000,
          top_performers: [
            {
              name: "John Doe",
              achievements: ["Marathon PB: 2:45", "Weekly distance: 80km"],
              activity_stats: {
                avg_pace: "4:30/km",
              },
              join_date: "2025-02-07T12:00:00",
            },
          ],
        },
        input_text: "",
      },
    },
    {
      name: "Community Bot (Highlight Performers)",
      request: {
        agent_name: "community_bot",
        action: "highlight_performers",
        params: {
          name: "RunnersPro",
          activity_type: "running",
          injuries: ["runner's knee", "shin splints"],
          member_count: 1000,
          top_performers: [
            {
              name: "John Doe",
              achievements: ["Marathon PB: 2:45", "Weekly distance: 80km"],
              activity_stats: {
                avg_pace: "4:30/km",
              },
              join_date: "2025-02-07T12:00:00",
            },
          ],
        },
        input_text: "",
      },
    },
  ];

  const handleApiCall = async (bot) => {
    setLoading(bot.name);
    setError(null);
    setResponse(null);

    try {
      const result = await sendApiRequest(bot.request);
      setResponse({ bot: bot.name, data: result });
    } catch (err) {
      setError({ bot: bot.name, message: err.message || "API call failed" });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Bot Actions</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {botRequests.map((bot, index) => (
          <button
            key={index}
            onClick={() => handleApiCall(bot)}
            disabled={loading === bot.name}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 w-full"
          >
            {loading === bot.name ? "Processing..." : `Call ${bot.name}`}
          </button>
        ))}
      </div>

      {response && (
        <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          <strong>Response from {response.bot}:</strong>
          <pre>{JSON.stringify(response.data, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <strong>Error from {error.bot}:</strong> {error.message}
        </div>
      )}
    </div>
  );
}
