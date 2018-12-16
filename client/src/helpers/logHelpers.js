import { secondsToHMMSS } from './time';

export const getDuration = (startTime, endTime) => {
  const diff = endTime - startTime;
  return secondsToHMMSS(diff / 1000);
}

export const getNewRocordedTime = (prevRecordedTime, startTime, endTime) => {
  const diff = endTime - startTime;
  const newRecordedSeconds = prevRecordedTime + diff / 1000;
  return secondsToHMMSS(newRecordedSeconds);
}
