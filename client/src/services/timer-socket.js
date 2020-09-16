import io from 'socket.io-client';
import store from 'reduxFiles/store';
import { secondsToMSS } from '../helpers/time';

const socket = io('/timer');

const initTimerSocket = (AppComponent) => {
  socket.on('timerTick', (timeData) => {
    const {
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

    document.title = secondsToMSS(remainingTime);
    setRemainingTime(remainingTime);
    incrementTaskTime(activeProject, activeTask);
    setSelectedProject(activeProject.shortId);
    setSelectedTaskId(activeTask.shortId);

    if (!isBackendTimerActive) {
      store.dispatch({ type: 'ACK_BACKEND_TIMER_INIT' });
      const audio = new Audio('sound/success.ogg');
      audio.play();
    }

    if (!isTimerActive) {
      setTimerActive(true);
    }

    if (remainingTime === 0 && isTimerActive) {
      handleTimerComplete();
    }
  });

  socket.on('error', (err) => {
    alert(err);
  });
};

export { initTimerSocket };
