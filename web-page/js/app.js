// подключение к узлу canvas и получение его контекста для работы
let canvas, video, ctx, imgToServer, imgData;

canvas = document.getElementById('canvas');
video = document.getElementById('video');

if (canvas.getContext('2d')) {
  ctx = canvas.getContext('2d');
  ctx.scale(0.3, 0.3);
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
      }, 2000);
    });
}

function Photo() {
  ctx.drawImage(video, 180, 0);

  // РАСКОММЕНТИРОВАТЬ! imgData получает URL скриншотов
  // imgData = canvas.toDataURL('image/jpeg', 0.5);
  // console.log(imgData);
}