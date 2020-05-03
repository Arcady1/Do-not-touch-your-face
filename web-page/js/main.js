// подключение к узлу canvas и получение его контекста для работы
let canvas, video, ctx;

canvas = document.getElementById('canvas');
video = document.getElementById('video');

if (canvas.getContext('2d')) {
  ctx = canvas.getContext('2d');
  videolink();
} else
  alert('You browser does not support canvas.getContext("2d")');

// web-cam code
function videolink() {
  navigator.getMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;

  navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    })
    .then(stream => {
      video.srcObject = stream;
      video.play();
      setInterval(function () {
        Photo();
      }, 60);
    });
}

function Photo() {
  console.log('inFunction');
  ctx.drawImage(video, -110, -50);
}