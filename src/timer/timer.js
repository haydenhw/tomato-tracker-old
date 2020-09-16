const countDownTimer = interval => ({
  intervalObj: null,
  time: null,
  callback: null,
  setHandler(fn) {
    this.callback = fn;
  },
  handleTick() {
    if (this.time === 0) {
      this.callback(this.time);
      this.stop();
    } else if (this.time < 0) {
      console.error('Timer value went below zero. Current value is ', this.time);
    } else {
      this.callback(this.time);
      this.time--;
    }
  },
  start(duration) {
    this.time = duration;
    this.intervalObj = setInterval(this.handleTick.bind(this), interval);
  },
  reset() {
    this.intervalObj = null;
  },
  stop() {
    clearInterval(this.intervalObj);
    this.reset();
    console.log('Timer stopped');
  },
});


module.exports = { countDownTimer };
