const moment = require('moment');
const R = require('ramda');


const getTimeDiff = (now, then) => moment(now, 'h:mm:ssa').valueOf() - moment(then, 'h:mm:ssa').valueOf();
const miliSecsToMinutes = miliSecs => miliSecs/1000/60;
export const getTimeSinceThen = (
  R.compose(Math.round, miliSecsToMinutes, getTimeDiff)
);

export function secondsToMSS(d) {
  d = Number(d);

  var m = Math.floor(d / 60);
  var s = Math.floor(d % 360 % 60);

  return m + ":" + ('0' + s).slice(-2);
}

export function secondsToHMMSS(d) {
  d = Number(d);

  var h = Math.floor(d / 3600);
  var m = Math.floor(d % 3600 / 60);
  var s = Math.floor(d % 3600 % 60);

  return h + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
}

function hasNaN(array) {
  const nanValueCount = array.filter(element => isNaN(Number(element))).length;

  return Boolean(nanValueCount);
}

export function timeStringToSeconds(value, inputFormat) {
  const splitValue = value.split(":");

  if (hasNaN(splitValue)) {
    return 'NAN_ERROR';
  }

  if (splitValue.length === 0 ) {
    return 0;
  }

  if (splitValue.length === 1)  {
    return splitValue * 60;
  }

  let hours = Number(splitValue[0]);
  let minutes = splitValue.length > 1 ? Number(splitValue[1]) : 0;
  let seconds = splitValue.length > 2 ? Number(splitValue[2]) : 0;

  if (inputFormat === "MMSS") {
    seconds = minutes;
    minutes = hours;
    hours = 0;
  }


  return hours * 3600 + minutes * 60 + seconds
}

const unixTimestampToHHMM = (unixTS) => {
  const date = new Date(unixTS* 1000);
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  const seconds = "0" + date.getSeconds();
  const formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  return formattedTime;
};

function militaryToStandard(input) {
    return moment(input, 'HH:mm:ss').format('h:mm:ssa');
}

export const unixTimestampToHMM = (unixTS) => (
  militaryToStandard(
    unixTimestampToHHMM(unixTS)
  )
);
