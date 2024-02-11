(function (doc) {
  var KSVideo = function (dom, opt) {
    this.videoBox = doc.getElementById(dom);
    this.vid = this.videoBox.getElementsByClassName('video-tag')[0];
    this.oPlayBtn = this.videoBox.getElementsByClassName('play-img')[0];

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

    }
  }

  window.KSVideo = KSVideo;

})(document);
