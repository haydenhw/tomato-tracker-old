const express = require('express');
const timerRouter = express.Router({ mergeParams: true });
const { Projects } = require('../models');
const { updateTask, countDownTimer } = require('../utils');

const cdTimer = countDownTimer (1000);

const emitTimerUpdate = (socket, remainingTime, projectId, taskId) => {
  socket.emit('module', {
    remainingTime,
    taskId,
    projectId,
  });
};

const makeTimerRouter = (http) => {
  const io = require('socket.io')(http);
  const socket = io.of('/data');

  let socketConnected = false;
  socket.on('connection', function (socket) {
    console.log('socket connection established');
    socketConnected = true;
  });

  timerRouter.route('/start/:id/:taskId')
    .post((req, res) => {
      const { id, taskId } = req.params;
      const { startTime } = req.body;

      cdTimer.setHandler((remainingTime) => {
        emitTimerUpdate(socket, remainingTime, id, taskId);
        req.body.recordedTime++;
        updateTask(req, res, Projects);
        console.log(remainingTime);
      });

      if (socketConnected) {
        cdTimer.start(startTime);
      } else {
        setTimeout(() => {
          cdTimer.start(startTime);
        }, 3000);
      }

      res.end();
    });

  timerRouter.route('/stop')
    .post((req, res) => {
      cdTimer.stop();
      res.end();
    });

  return timerRouter;
};

module.exports = makeTimerRouter;
