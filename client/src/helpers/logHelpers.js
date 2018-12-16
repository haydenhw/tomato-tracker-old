import { secondsToHMMSS } from './time';

export const getDuration = (startTime, endTime) => {
  const diff = endTime - startTime;
  return secondsToHMMSS(diff);
}

export const getNewRocordedTime = (prevRecordedTime, startTime, endTime) => {
  const diff = endTime - startTime;
  const newRecordedSeconds = prevRecordedTime + diff;
  return secondsToHMMSS(newRecordedSeconds);
}
