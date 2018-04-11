export function createEmptySchedule() {
  const week = [];
  for (let i=0; i<7; i++) {
    const day = [];
    for (let j=0; j<18; j++) {
      day.push('0');
    }
    week.push(day);
  }
  return week;
}

export function scheduleItemsToWeek(scheduleArr) {
  return scheduleArr.reduce((arr, item) => {
      const { day, start, end } = item;
      for (let i=start; i<end; i++) {
        arr[day][i] = '1';
      }
      return arr;
    }, createEmptySchedule())
    .map(day => day.join(''));
}

export function compareSchedules(userSched, matchSched) {
  const userSchedStr = scheduleItemsToWeek(userSched).join('');
  const matchSchedStr = scheduleItemsToWeek(matchSched).join('');

  let userCount = 0;
  let matchCount = 0;

  for (let i=0; i<126; i++) {
    if (parseInt(userSchedStr[i], 10)) {
      userCount++;
      if (parseInt(matchSchedStr[i], 10)) matchCount++;
    }
  }
  return (matchCount/userCount).toFixed(2);
}

export const scheduleMap = {
  day: [
    'Mon',
    'Tues',
    'Weds',
    'Thurs',
    'Fri',
    'Sat',
    'Sun'
  ],
  time: [
    '6am',
    '7am',
    '8am',
    '9am',
    '10am',
    '11am',
    '12pm',
    '1pm',
    '2pm',
    '3pm',
    '4pm',
    '5pm',
    '6pm',
    '7pm',
    '8pm',
    '9pm',
    '10pm',
    '11pm',
    '12pm'
  ]
};
