// подключение к узлу canvas и получение его контекста для работы
let canvas = document.getElementById('canvas');

if (canvas.getContext('2d')) {
  let ctx = canvas.getContext('2d');
} else
  alert('You browser does not support canvas.getContext("2d")');

// web-cam code
(function () {
  let video = document.getElementById('video');

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
    });
})();

setInterval(function () {
  Photo();
}, 3000)

function Photo() {
  console.log('inFunction');
}