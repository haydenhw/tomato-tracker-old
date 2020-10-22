const express = require('express');
const timerRouter = express.Router({ mergeParams: true });
const { Projects } = require('../projects/project-model');
const { countDownTimer } = require('./timer');
const updateTask = require('../tasks/update-task');

const cdTimer = countDownTimer(1000);

const emitTimerUpdate = (socket, remainingTime, projectId, taskId) => {
  console.log('Emitting socket message:', {
    remainingTime,
    taskId,
    projectId,
  })

  socket.emit('timerTick', {
    remainingTime,
    taskId,
    projectId,
  });
};

const makeTimerRouter = (http) => {
  const io = require('socket.io')(http);
  const socket = io.of('/timer');

  let socketConnected = false;
  socket.on('connection', function (socket) {
    console.log('socket connection established');
    socketConnected = true;
  });

  timerRouter.route('/start/:id/:taskId')
    .post((req, res) => {
      console.log('Client requested that timer be started')
      const { id, taskId } = req.params;
      const { startTime } = req.body;

      cdTimer.setHandler((remainingTime) => {
        emitTimerUpdate(socket, remainingTime, id, taskId);
        req.body.recordedTime++;
        updateTask(req, res, Projects);
      });

      if (socketConnected) {
        cdTimer.start(startTime);
      } else {
        setTimeout(() => {
          console.log('Client requested that timer be started but socket was not connected yet. Retrying in 3 seconds');
          cdTimer.start(startTime);

        }, 3000);
      }

      res.end();
    });

  timerRouter.route('/stop')
    .post((req, res) => {
      console.log('POST request to "/stop" endpoint received. Stopping timer')
      cdTimer.stop();
      res.end();
    });

  return timerRouter;
};

module.exports = makeTimerRouter;
