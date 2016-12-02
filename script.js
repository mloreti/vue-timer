document.addEventListener('DOMContentLoaded', function() {
  var App = new Vue({
    el: '#app',
    data: {
      started: false,
      finished: false,
      minutes: 15,
      seconds: 0,
      now: Math.trunc((new Date()).getTime() / 1000)
    },
    updated: function() {
      document.title = this.timeString();
    },
    methods: {
      start: function() {
        this.started = ! this.started;
        this.finished = false;
        this.timer();
      },
      pause: function() {
        this.started = ! this.started;
        window.clearInterval(this.startTimer);
      },
      timer: function() {
        let that = this;
        this.startTimer = setInterval(function () {
          if (that.timerDone()) {
            that.done();
          }else {
            that.calcTime()
          }
        }, 1000);
      },
      timeString: function() {
        return `${this.pad(this.minutes)}:${this.pad(this.seconds)}`
      },
      pad(num) {
        return num < 10 ? `0${num}` : num
      },
      calcTime: function() {
        if (this.minutes > 0 && this.seconds == 0) { this.minutes -= 1 }
        if (this.seconds - 1 < 0) { this.seconds = 60 }
        this.seconds -= 1;
      },
      timerDone: function() {
        return (this.minutes == 0 && this.seconds == 0);
      },
      done: function() {
        alert("Switch");
        this.pause();
        this.minutes = 15;
        this.seconds = 0;
        this.finished = true;
      },
      addMinute: function() {
        this.minutes += 1;
      },
      removeMinute: function() {
        if (this.minutes > 0){
          this.minutes -= 1;
        }
      },
      addSeconds: function() {
        if (this.seconds + 15 > 59) {
          this.minutes += 1;
          this.seconds = (this.seconds + 15) % 60
        } else {
          this.seconds += 15;
        }
      },
      removeSeconds: function() {
        if (this.seconds - 15 <= 0 && this.minutes > 0) {
          if (this.seconds == 15){
            this.seconds = 0;
          } else {
            this.minutes -= 1;
            this.seconds = 60 - Math.abs(this.seconds - 15)
          }
        } else if (this.seconds - 15 > 0) {
          this.seconds -= 15;
        }
      },
      resetTime: function() {
        this.seconds = 0;
        this.minutes = 15;
      }
    }
  })

})
