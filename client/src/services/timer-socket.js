import io from 'socket.io-client';
import store from 'reduxFiles/store';
import { secondsToMSS } from '../helpers/time';

const socket = io('/timer');

const playBackendTimerInitConfirmationSound = () => {
  const audio = new Audio('sound/success.ogg');
  audio.play();
}

const setDocumentTitleAsTime = (timeInSeconds) => {
  document.title = secondsToMSS(timeInSeconds);
}

const makeHandleTimerTick = (AppComponent) => (timeData) => {
  const {
    ackBackendTimerInit,
    setRemainingTime,
    setTimerActive,
    incrementTaskTime,
    handleTimerComplete,
    setSelectedProject,
    setSelectedTaskId,
    isTimerActive,
    isBackendTimerActive,
    projects,
  } = AppComponent.props;

  const { remainingTime, projectId, taskId } = timeData;
  const activeProject = projects.find(project => project._id === projectId);
  const activeTask = activeProject.tasks.find(task => task._id === taskId);

  setDocumentTitleAsTime(remainingTime)
  setRemainingTime(remainingTime);
  incrementTaskTime(activeProject, activeTask);

  // whatever project and task that is runnning on the backend should also be set as active on the frontend
  setSelectedProject(activeProject.shortId);
  setSelectedTaskId(activeTask.shortId);

  if (!isTimerActive) {
    setTimerActive(true);
  }

  if (!isBackendTimerActive) {
    ackBackendTimerInit()
    playBackendTimerInitConfirmationSound()
  }

  if (remainingTime === 0 && isTimerActive) {
    handleTimerComplete();
  }
}

const initTimerSocket = (AppComponent) => {
  const handleTimerTick = makeHandleTimerTick(AppComponent);

  socket.on('timerTick', (timeData) => {
    handleTimerTick(timeData)
  });

  socket.on('error', (err) => {
    alert(err);
  });
};

export default initTimerSocket;
