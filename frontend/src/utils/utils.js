function getActivityImagePath(sportType) {
  return `/sports/orange/${sportType.toLowerCase()}.png`;
}

function getMetricImagePath(metricName) {
  console.log(metricName);
  return `/metrics/${metricName.toLowerCase()}.png`;
}

function getAgentImagePath(agentName) {
  return `/agents/${agentName.toLowerCase()}.png`;
}

const agentDescriptions = {
  'nutrition_agent': 'Set and track your nutrition goals effortlessly using natural language while gaining expert insights into healthy eating. 🥗💡',
  'recover_coach_agent': 'Your AI-powered guide to overcoming injuries, optimizing rehabilitation, and getting back to peak performance safely. 🏋️‍♂️💪',
  'sports_goal_creation_agent': 'Create personalized fitness goals through sports using natural language, tailored to your ambitions and skill level. ⚽🏆',
  'personal_trainer_agent': 'Get expert insights to enhance your fitness journey, optimize your workouts, and align your nutrition with your goals for a healthier, stronger you. 🔥💪'
};

const agentNames = {
  'nutrition_agent': 'Nutrition Coach',
  'recover_coach_agent': 'Recovery Coach',
  'sports_goal_creation_agent': 'Fitness Goal Planner',
  'personal_trainer_agent': 'Personal Trainer'
}

function getAgentName(agentName) {
  return agentNames[agentName] || 'Unknown agent';
}

function getAgentDescription(agentName) {
  return agentDescriptions[agentName] || 'Unknown agent';
}

const metricUnits = {
  'distance': 'km',
  'heart_rate': 'bpm',
  'time': 'min',
  'cadence': 'rpm',
  'speed': 'km/min',
  'elevation_gain': 'm'
};

function getMetricUnit(metricName) {
  return metricUnits[metricName] || '';
}

const nftData = {
  "Running NFTs": [
      {
          id: 1,
          name: "Ran 10km",
          image: "/NFTs/run.png"
      },
      {
          id: 2,
          name: "Ran 20km",
          image: "/NFTs/run.png"
      },
      {
          id: 3,
          name: "Ran 30km",
          image: "/NFTs/run.png"
      }
  ],
  "Walking NFTs": [
      {
          id: 4,
          name: "Walk 5km",
          image: "/NFTs/walk.png"
      },
      {
          id: 5,
          name: "Walk 10km",
          image: "/NFTs/walk.png"
      },
      {
          id: 6,
          name: "Walk 15km",
          image: "/NFTs/walk.png"
      }
  ],
  "Swimming NFTs": [
      {
          id: 7,
          name: "Swim 1km",
          image: "/NFTs/swim.png"
      },
      {
          id: 8,
          name: "Swim 2km",
          image: "/NFTs/swim.png"
      },
      {
          id: 9,
          name: "Swim 3km",
          image: "/NFTs/swim.png"
      }
  ]
};

export { nftData };

export { getAgentDescription, getAgentImagePath, getAgentName };

export { getActivityImagePath, getMetricImagePath, getMetricUnit };