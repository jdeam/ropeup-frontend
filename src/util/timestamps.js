import moment from 'moment';

export function createLastMessageTimestamp(time) {
  const now = moment();
  const then = moment(time);
  if (then.isSame(now, 'day')) return then.format('h:mm a');
  if (then.isSame(now, 'week')) return then.format('ddd');
  return then.format('MMM D');
}

export function createSingleMessageTimestamp(time) {
  const now = moment();
  const then = moment(time);
  if (then.isSame(now, 'day')) return then.format('h:mm A');
  if (then.isSame(now, 'week')) {
    const timeArr = then.format('ddd h:mm A').split(' ');
    timeArr[0] = timeArr[0].toUpperCase();
    return timeArr.join(' ');
  }
  const timeArr = then.format('MMM D, h:mm A').split(' ');
  timeArr[0] = timeArr[0].toUpperCase();
  return timeArr.join(' ');
}
