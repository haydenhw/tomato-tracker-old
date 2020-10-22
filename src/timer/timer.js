const countDownTimer = interval => ({
  intervalObj: null,
  time: null,
  onTick: null,
  setHandler(fn) {
    this.onTick = fn;
  },
  handleTick() {
    if (this.time === 0) {
      console.log('Calling "onTick" handler with time', this.time)
      this.onTick(this.time);
      this.stop();
    } else if (this.time < 0) {
      console.error('Timer value went below zero. Current value is ', this.time);
    } else {
      this.onTick(this.time);
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
