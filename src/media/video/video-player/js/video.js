(function (doc) {
  var t = null;

  var KSVideo = function (dom, opt) {
    this.videoBox = doc.getElementById(dom);
    this.vid = this.videoBox.getElementsByClassName('video-tag')[0];
    this.oPlayBtn = this.videoBox.getElementsByClassName('play-img')[0];
    this.oCurrentTime = this.videoBox.getElementsByClassName('current-time')[0];
    this.oDuration = this.videoBox.getElementsByClassName('duration')[0];

    console.log(this.videoBox);

    this.src = opt.src;
    this.autoplay = opt.autoplay || false;
    this.preload = this.autoplay ? false : (opt.preload || false);
    this.volume = opt.volume / 100 || 1;

    this.init();
  }

  KSVideo.prototype = {
    init: function () {
      this.setOptions();
      this.bindEvent();
    },

    bindEvent: function() {
      this.vid.addEventListener('canplay', this._canplay.bind(this), false);
      this.vid.addEventListener('playing', this._playing.bind(this), false);

      this.oPlayBtn.addEventListener('click', this.playVideo.bind(this), false);
    },

    setOptions: function() {
      this.vid.src = this.src;
      this.vid.autoplay = this.autoplay;
      this.vid.preload = this.preload;
      this.setVolume(this.volume);
    },

    setVolume: function(volume) {
      this.vid.volume = volume;
      console.log(this.vid.volume);
    },

    playVideo: function() {
      if (this.vid.paused) {
        this.oPlayBtn.src = 'assets/pause.png';
        this.vid.play();
      } else {
        this.oPlayBtn.src = 'assets/play.png';
        this.vid.pause();
      }
    },

    setSrc: function() {

    },

    _canplay: function() {
      setTime(this.oDuration, this.vid.duration);
    },

    _playing: function() {
      var _self = this;
      
      t = setInterval(function() {
        setTime(_self.oCurrentTime, _self.vid.currentTime);
      }, 1000);
    }
  }

  function setTime (dom, time) {
    dom.innerText = timeFormat(time);
  }

  function timeFormat (second) {
    var h = parseInt(second / 3600);
    var m = parseInt(parseInt(second % 3600) / 60);
    var s = parseInt(second % 60);
    time = '';
    if (h == 0) {
      if (m >= 10) {
        if (s >= 10) {
          time = '00:' + m + ':' + s;
        } else {
          time = '00:' + m + ':0' + s;
        }
      } else {
        if (s >= 10) {
          time = '00:0' + m + ':' + s;
        } else {
          time = '00:0' + m + ':0' + s;
        }
      }
    } else {
      if (h >= 10) {
        if (m >= 10) {
          if (s >= 10) {
            time = '0' + h + ':' + m + ':' +s;
          } else {
            time = '0' + h + ':' + m + ':0' + s;
          }
        } else {
          if (s >= 10) {
            time = '0' + h + ':0' + m + ':' + s;
          } else {
            time = '0' + h + ':0' + m + ':0' + s;
          }
        }
      } else {
        if (m >= 10) {
          if (s >= 10) {
            time = h + ':' + m + ':' + s;
          } else {
            time = h + ':' + m + ':0' + s;
          }
        } else {
          if (s >= 10) {
            time = h + ':0' + m + ':' + s;
          } else {
            time = h + ':0' + m + ':0' + s;
          }
        }
      }
    }

    return time;
  }

  window.KSVideo = KSVideo;

})(document);
