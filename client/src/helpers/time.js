import moment from 'moment';

export function secondsToMSS(seconds) {
  return moment().startOf('day')
    .seconds(seconds)
    .format('m:ss');
}

export function secondsToHMMSS(seconds) {
  return moment().startOf('day')
    .seconds(seconds)
    .format('H:mm:ss');
}

