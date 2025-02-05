function getActivityImagePath(sportType) {
  return `/sports/${sportType.toLowerCase()}.png`;
}

function getMetricImagePath(metricName) {
  console.log(metricName);
  return `/metrics/${metricName.toLowerCase()}.png`;
}

function getMetricUnit(metricName) {
  if (metricName === 'distance') {
    return 'km';
  } else if (metricName === 'heart_rate') {
    return 'bpm';
  } else if (metricName === 'time') {
    return 'min';
  } else if (metricName === 'cadence') {
    return 'rpm';
  } else if (metricName === 'speed') {
    return 'km/min';
  } else if (metricName === 'elevation_gain') {
    return 'm';
  }
}

export { getActivityImagePath, getMetricImagePath, getMetricUnit };