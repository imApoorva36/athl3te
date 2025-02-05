function getActivityImagePath(sportType) {
  return `/sports/${sportType.toLowerCase()}.png`;
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
  'personal_trainer': 'Get expert insights to enhance your fitness journey, optimize your workouts, and align your nutrition with your goals for a healthier, stronger you. 🔥💪'
};

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

export { getAgentDescription, getAgentImagePath };

export { getActivityImagePath, getMetricImagePath, getMetricUnit };