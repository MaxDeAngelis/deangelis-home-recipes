export const formatTime = (time) => {
  const times = time.split(':');
  let hours = times[0];
  let minutes = times[1];

  if (parseInt(hours, 10) > 0) {
    hours = `${parseInt(hours, 10)} hrs `;
  } else {
    hours = '';
  }

  if (parseInt(minutes, 10) > 0) {
    minutes = `${parseInt(minutes, 10)} min`;
  } else {
    minutes = '';
  }

  return hours + minutes;
};

export const calculateTotalTime = (time1, time2) => {
  // Break the times up into hours and minutes
  const times1 = time1.split(':');
  const times2 = time2.split(':');

  // Convert time to pure minutes by multiplying the hours by 60
  const minutes1 = parseInt(times1[1], 10) + parseInt(times1[0], 10) * 60;
  const minutes2 = parseInt(times2[1], 10) + parseInt(times2[0], 10) * 60;

  // Divide and round time by 60 to get hours
  const hours = Math.floor((minutes1 + minutes2) / 60);

  // MOD by 60 to get just minutes
  const minutes = (minutes1 + minutes2) % 60;

  // Mush together and call format
  return formatTime(`${hours}:${minutes}`);
};
