(function (doc) {
  var t = null;
  var dt = null;
  var pt = null;

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
    this.oVolumeSlideBar = this.oVolumeBar.getElementsByClassName('slide-bar')[0];
    this.oVolumeSlide = this.oVolumeBar.getElementsByClassName('volume-slide')[0];
    this.oVolumeRound = this.oVolumeSlide.getElementsByClassName('round')[0];
    this.oFullScreenBtn = this.videoBox.getElementsByClassName('fullscreen-img')[0];
    this.oVidHeader = this.videoBox.getElementsByClassName('vid-hd')[0];
    this.oControlBar = this.videoBox.getElementsByClassName('control-bar')[0];
    this.oProgressBar = this.videoBox.getElementsByClassName('progress-bar')[0];
    this.oPlayProgress = this.oProgressBar.getElementsByClassName('play-progress')[0];
    this.oPreloadProgress = this.oProgressBar.getElementsByClassName('preload-progress')[0];
    this.oPlayRound = this.oPlayProgress.getElementsByClassName('round')[0];

    this.src = opt.src;
    this.autoplay = opt.autoplay || false;
    this.preload = this.autoplay ? false : (opt.preload || false);
    this.volume = opt.volume / 100 || 1;
    this.loop = opt.loop || false;

    this.muted = false;
    this.volumeBarShow = false;
    this.isFullScreen = false;

    this.init();
  }

  KSVideo.prototype = {
    init: function () {
      this.setOptions();
      this.bindEvent();
      this.autoplay && addVideoTip(this.videoBox, 'loading');

      var _self = this;

      dt = setTimeout(function() {
        _self.setControlBar(true);
      }, 5000);
    },

    bindEvent: function() {
      this.vid.addEventListener('canplay', this._canplay.bind(this), false);
      this.vid.addEventListener('playing', this._playing.bind(this), false);
      this.vid.addEventListener('waiting', this._waiting.bind(this), false);
      this.vid.addEventListener('error', this._error.bind(this), false);
      this.vid.addEventListener('ended', this._ended.bind(this), false);
      this.vid.addEventListener('loadstart', this._loadstart.bind(this), false);

      this.oPlayBtn.addEventListener('click', this.playVideo.bind(this), false);
      this.oRateBtn.addEventListener('click', this.showRateList.bind(this, true), false);
      this.oRateArea.addEventListener('mouseleave', this.showRateList.bind(this, false), false);
      this.oRateList.addEventListener('click', this.setPlayRate.bind(this), false);
      this.oVolumeBtn.addEventListener('click', this.btnSetVolume.bind(this), false);
      this.oVolumeArea.addEventListener('mouseleave', this.showVolumeBar.bind(this, false), false);
      this.oVolumeRound.addEventListener('mousedown', this.slideVolumeBar.bind(this), false);
      this.oFullScreenBtn.addEventListener('click', this.setFullScreen.bind(this), false);
      this.videoBox.addEventListener('mousemove', this.showControlBar.bind(this), false);
      this.oProgressBar.addEventListener('click', this.progressClick.bind(this), false);
      this.oPlayRound.addEventListener('mousedown', this.progressChange.bind(this), false);
    },

    setOptions: function() {
      this.vid.src = this.src;
      this.vid.autoplay = this.autoplay;
      this.vid.preload = this.preload;
      this.vid.loop = this.loop;
      this.setVolume(this.volume, true);
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
        this.setVolume(0, true);
      } else {
        this.setMuted(false);
        this.setVolume(this.volume, true);
      }
    },

    showVolumeBar: function(show) {
      if (show) {
        this.oVolumeBar.className += ' show';
        this.volumeBarShow = true;
      } else {
        this.oVolumeBar.className = 'volume-bar';
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

    setVolume: function(volume, isChangeBar) {
      this.vid.volume = volume;
      isChangeBar && (this.oVolumeSlide.style.height = (volume * 100) + '%');
    },

    setFullScreen: function() {
      if (!this.isFullScreen) {
        if (this.videoBox.requestFullscreen) {
          this.videoBox.requestFullscreen();
        } else if (this.videoBox.mozRequestFullscreen) {
          this.videoBox.mozRequestFullscreen();
        } else if (this.videoBox.msRequestFullscreen) {
          this.videoBox.msRequestFullscreen();
        } else if (this.videoBox.oRequestFullscreen) {
          this.videoBox.oRequestFullscreen();
        } else if (this.videoBox.webkitRequestFullscreen) {
          this.videoBox.webkitRequestFullscreen();
        }

        this.isFullScreen = true;
        this.oFullScreenBtn.src = 'assets/fullscreen-exit.png';
      } else {
        if (doc.exitFullscreen) {
          doc.exitFullscreen();
        } else if (doc.mozExitFullscreen) {
          doc.mozExitFullscreen();
        } else if (doc.msExitFullscreen) {
          doc.msExitFullscreen();
        } else if (doc.oExitFullscreen) {
          doc.oExitFullscreen();
        } else if (doc.webkitExitFullscreen) {
          doc.webkitExitFullscreen();
        }

        this.isFullScreen = false;
        this.oFullScreenBtn.src = 'assets/fullscreen.png';
      }
    },

    setVideoState: function(isPlaying) {
      this.oPlayBtn.src = isPlaying ? 'assets/pause.png' : 'assets/play.png';
    },

    setSrc: function(src) {
      this.vid.src = src;
      this.vid.load();
    },

    showControlBar: function() {
      clearTimeout(dt);
      dt = null;
      this.setControlBar(false);

      var _self = this;

      dt = setTimeout(function() {
        _self.setControlBar(true);
      }, 5000);
    },

    setControlBar: function(hide) {
      if (hide) {
        this.oVidHeader.className += ' hide';
        this.oControlBar.className += ' hide';
      } else {
        this.oVidHeader.className = 'vid-hd';
        this.oControlBar.className = 'control-bar';
      }
    },

    slideVolumeBar: function() {
      var e = e || window.event;
      var dy = e.pageY;
      var my = 0;
      var disY = 0;
      var sHeight = 0;
      var slideHeight = this.oVolumeSlide.offsetHeight;
      var volumeBarHeight = this.oVolumeSlideBar.offsetHeight;
      var _mousemove = _mouseMove.bind(this);
      var _mouseup = _mouseUp.bind(this);

      doc.addEventListener('mousemove', _mousemove, false);
      doc.addEventListener('mouseup', _mouseup, false);

      function _mouseMove(e) {
        var e = e || window.event;
        my = e.pageY;
        disY = dy - my;
        sHeight = slideHeight + disY;

        if (sHeight < volumeBarHeight && sHeight > 0) {
          this.oVolumeSlide.style.height = sHeight + 'px';
          this.setMuted(false);
        } else if (sHeight >= volumeBarHeight) {
          this.oVolumeSlide.style.height = volumeBarHeight + 'px';
          sHeight = volumeBarHeight;
          this.setMuted(false);
        } else if (sHeight <= 0) {
          this.oVolumeSlide.style.height = '0';
          sHeight = 0;
          this.setMuted(true);
        }

        this.volume = (sHeight / volumeBarHeight).toFixed(1);
        this.setVolume(this.volume, false);
        this.volume = Number(this.volume) === 0 ? 0.5 : this.volume;
      }

      function _mouseUp() {
        doc.removeEventListener('mousemove', _mousemove, false);
        doc.removeEventListener('mouseup', _mouseup, false);
      }
    },

    progressClick: function(e) {
      var e = e || window.event;
      this.setPlayProgress(e.pageX);
    },

    progressChange: function() {
      var _mousemove = _mouseMove.bind(this);
      var _mouseup = _mouseUp.bind(this);

      doc.addEventListener('mousemove', _mousemove, false);
      doc.addEventListener('mouseup', _mouseup, false);

      function _mouseMove(e) {
        var e = e || window.event;
        this.setPlayProgress(e.pageX);
      }

      function _mouseUp() {
        doc.removeEventListener('mousemove', _mousemove, false);
        doc.removeEventListener('mouseup', _mouseup, false);
      }
    },

    setPlayProgress: function(pageX) {
      var duration = this.vid.duration;
      var curProgressBarWidth = pageX - this.videoBox.offsetLeft;
      var ratio = 0;

      if (curProgressBarWidth <= 0) {
        ratio = 0;
      } else if (curProgressBarWidth >= this.oProgressBar.offsetWidth) {
        ratio = 1;
      } else {
        ratio = curProgressBarWidth / this.oProgressBar.offsetWidth;
      }

      this.vid.currentTime = duration * ratio;
      setTime(this.oCurrentTime, this.vid.currentTime);
      this.setVideoState(true);
      this.vid.play();
      this.oPlayProgress.style.width = ratio * 100 + '%';
    },

    _waiting: function() {
      addVideoTip(this.videoBox, 'loading');
    },

    _loadstart: function() {
      removeVideoTip(this.videoBox);
      addVideoTip(this.videoBox, 'loading');
    },

    _canplay: function() {
      setTime(this.oDuration, this.vid.duration);
      removeVideoTip(this.videoBox);

      var _self = this;
      var duration = this.vid.duration;
      var preloadProgress = 0;
      var progressBarWidth = this.oProgressBar.offsetWidth;

      pt = setInterval(function() {
        preloadProgress = _self.vid.buffered.end(0);
        _self.oPreloadProgress.style.width = (preloadProgress / duration) * 100 + '%';
        if (_self.oPreloadProgress.offsetWidth >= progressBarWidth) {
          clearInterval(pt);
          pt = null;
        }
      }, 1000);
    },

    _playing: function() {
      this.setVideoState(true);
      removeVideoTip(this.videoBox);

      var _self = this;
      var duration = this.vid.duration;
      var currentTime = 0;
      var progressBarWidth = this.oProgressBar.offsetWidth;
      
      t = setInterval(function() {
        currentTime = _self.vid.currentTime;
        setTime(_self.oCurrentTime, currentTime);
        _self.oPlayProgress.style.width = (currentTime / duration) * 100 + '%';

        if (_self.oPlayProgress.offsetWidth >= progressBarWidth) {
          clearInterval(t);
          t = null;
        }
      }, 1000);
    },
    
    _error: function() {
      removeVideoTip(this.videoBox);
      addVideoTip(this.videoBox, 'error');
    },

    _ended: function() {
      removeVideoTip(this.videoBox);
      addVideoTip(this.videoBox, 'ended');
      this.setVideoState(false);
    }
  }

  function setTime (dom, time) {
    dom.innerText = timeFormat(time);
  }

  function addVideoTip (dom, type) {
    var icon = '';
    var text = '';

    switch (type) {
      case 'loading':
        icon = 'assets/loading.gif';
        text = '加载中';
        break;
      case 'error':
        icon = 'assets/error.png';
        text = '播放错误';
      case 'ended':
        icon = 'assets/ended.png';
        text = '播放完成';
        break;
      default:
        break;
    }

    var oTip = doc.createElement('div');
    oTip.className = 'video-tip';
    oTip.innerHTML = '<img src="' + icon + '" /><p>' + text + '</p>';
    dom.appendChild(oTip);
  }

  function removeVideoTip (dom) {
    var oTip = doc.getElementsByClassName('video-tip')[0];
    oTip && dom.removeChild(oTip);
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
