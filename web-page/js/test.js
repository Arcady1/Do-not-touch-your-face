// web-cam code
(function () {
    var video = document.getElementById('video');

    navigator.getMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;

        navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(stream => {
          video.srcObject = stream;
          video.play();
        });
})();