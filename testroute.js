const axios = require('axios');

// don't run this with nodemon
axios.post('http://localhost:3002/timer/start/5a83740660412b001447bf15/5a8375ae60412b001447bf19', {
  startTime: 10,
  taskName: 'foobar',
  recordedTime: 1234,
  log: [],
});


const stopTimer = () => {
  axios.post('http://localhost:3002/timer/stop');
};

setTimeout(stopTimer, 5000);
