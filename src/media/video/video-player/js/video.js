(function (doc) {
  var t = null;

  var KSVideo = function (dom, opt) {
    this.videoBox = doc.getElementById(dom);
    this.vid = this.videoBox.getElementsByClassName('video-tag')[0];
    this.oPlayBtn = this.videoBox.getElementsByClassName('play-img')[0];
    this.oCurrentTime = this.videoBox.getElementsByClassName('current-time')[0];
    this.oDuration = this.videoBox.getElementsByClassName('duration')[0];
    this.oRateArea = this.videoBox.getElementsByClassName('playrate-area')[0];
    this.oRateBtn = this.videoBox.getElementsByClassName('playrate')[0];
    this.oRateList = this.oRateArea.getElementsByClassName('playrate-list')[0];
    this.oRateBtns = this.oRateList.getElementsByClassName('item');
    this.oRateBtnsLen = this.oRateBtns.length;
    this.oVolumeArea = this.videoBox.getElementsByClassName('volume-area')[0];
    this.oVolumeBtn = this.oVolumeArea.getElementsByClassName('volume-img')[0];
    this.oVolumeBar = this.oVolumeArea.getElementsByClassName('volume-bar')[0];
    this.oVolumeSlide = this.oVolumeBar.getElementsByClassName('volume-slide')[0];

    console.log(this.videoBox);

    this.src = opt.src;
    this.autoplay = opt.autoplay || false;
    this.preload = this.autoplay ? false : (opt.preload || false);
    this.volume = opt.volume / 100 || 1;

    this.muted = false;
    this.volumeBarShow = false;

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
      this.oRateBtn.addEventListener('click', this.showRateList.bind(this, true), false);
      this.oRateArea.addEventListener('mouseleave', this.showRateList.bind(this, false), false);
      this.oRateList.addEventListener('click', this.setPlayRate.bind(this), false);
      this.oVolumeBtn.addEventListener('click', this.btnSetVolume.bind(this), false);
    },

    setOptions: function() {
      this.vid.src = this.src;
      this.vid.autoplay = this.autoplay;
      this.vid.preload = this.preload;
      this.setVolume(this.volume);
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

    showRateList: function(show) {
      if (show) {
        this.oRateList.className += ' show';
      } else {
        this.oRateList.className = 'playrate-list';
      }
    },

    setPlayRate: function() {
      var e = e || window.event;
      var tar = e.target || e.srcElement;
      var className = tar.className;
      var rateBtn;
      
      if (className === 'rate-btn') {
        for (var i = 0; i < this.oRateBtnsLen; i++) {
          rateBtn = this.oRateBtns[i].getElementsByClassName('rate-btn')[0];
          rateBtn.className = 'rate-btn';
        }

        this.vid.playbackRate = tar.getAttribute('data-rate');
        tar.className += ' current';
        this.showRateList(false);
      }
    },

    btnSetVolume: function() {
      if (!this.muted && !this.volumeBarShow) {
        this.showVolumeBar(true);
      } else if (!this.muted && this.volumeBarShow) {
        this.setMuted(true);
        this.setVolume(0);
      }
    },

    showVolumeBar: function(show) {
      if (show) {
        this.oVolumeBar.className += ' show';
        this.volumeBarShow = true;
      } else {
        this.oVolumeBar.className += 'volume-baar';
        this.volumeBarShow = false;
      }
    },

    setMuted: function(muted) {
      if (muted) {
        this.vid.muted = true;
        this.muted = true;
        this.oVolumeBtn.src = 'assets/volume-off.png';
      } else {
        this.vid.muted = false;
        this.muted = false;
        this.oVolumeBtn.src = 'assets/volume.png';
      }
    },

    setVolume: function(volume) {
      this.vid.volume = volume;
      this.oVolumeSlide.style.height = (volume * 100) + '%';
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

    time += h >= 10 ? h : '0' + h;
    time += ':';
    time += m >= 10 ? m : '0' + m;
    time += ':';
    time += s >= 10 ? s : '0' + s;

    return time;
  }

  window.KSVideo = KSVideo;

})(document);
