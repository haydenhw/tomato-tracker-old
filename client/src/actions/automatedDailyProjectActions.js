const lastWindowFocus = {
  getDateObj() {
    return new Date(+localStorage.getItem('lastWindowFocus'))
  },
  set() {
    localStorage.setItem('lastWindowFocus', Date.now())
  }
};

function bindWindowFocusListener(callback) {
  window.addEventListener('focus', callback)
}

function fetchAndDisplayDailyProjectOnFirstDailyFocus() {
  const fetchAndDisplayDailyProject = (dependencies) => {
  };

  const { setSelectedProject, fetchProjects } = this.props;
  // change this to not
  if (isTodayPDT(lastWindowFocus.getDateObj())) {
    fetchAndDisplayDailyProject()
  }
};

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

this.bindWindowFocusListener(this.fetchAndDisplayDailyProjectOnFirstDailyFocus);

