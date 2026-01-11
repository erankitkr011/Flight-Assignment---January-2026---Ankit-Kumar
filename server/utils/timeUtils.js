// Returns a Date object X minutes ago from now
exports.minutesAgo = (minutes) => {
  return new Date(Date.now() - minutes * 60 * 1000);
};

// Check if a given date is within last X minutes
exports.isWithinLastMinutes = (date, minutes) => {
  const timeLimit = exports.minutesAgo(minutes);
  return date >= timeLimit;
};
