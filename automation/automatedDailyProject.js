
createDailyProject = (url) => axios.post(url);

const getTimeLastProjectWasAutoCreated = () => {
  const dateStr =  localStorage.getItem('timeOfLastProjectAutoCreation');
  return new Date(dateStr);
}

const setTimeOfLastProjectAutoCreation = () => {
  let now = new Date();
  now = now.toString();
  localStorage.setItem('timeOfLastProjectAutoCreation', now);
}

const isTodayPDT = (dateObj) => {
  const offsetPDT = -7 * 60 * 60 * 1000;
  dateObj = new Date(dateObj.getTime() + offsetPDT);
  let now = new Date();
  now = new Date(now.getTime() + offsetPDT);
  const day = now.getDay();
  const month = now.getMonth();
  const year = now.getYear();

  return (
    dateObj.getDay() === day &&
    dateObj.getMonth() === month &&
    dateObj.getYear() === year
  );
};




const createPDTTimesatmp = () => {
  const offsetPDT = -7 * 60 * 60 * 1000;
  const now = new Date();
  return new Date(now.getTime() + offsetPDT);
}










