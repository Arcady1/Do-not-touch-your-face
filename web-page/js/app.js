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
      canvas.style.display = 'block';
      setInterval(function () {
        Photo();
      }, 2000);
    })

    .catch(() => {
      console.log("No camera access!");
    });
}

function Photo() {
  ctx.drawImage(video, 180, 0);

  // РАСКОММЕНТИРОВАТЬ! imgData получает URL скриншотов
  // imgData = canvas.toDataURL('image/jpeg', 0.5);
  // console.log(imgData);

  async function loadAndPredict() {
    const net = await bodyPix.load({
      architecture: 'MobileNetV1',
      outputStride: 16,
      multiplier: 0.75,
      quantBytes: 2
    });

    const segmentation = await net.segmentPerson(canvas, {
      flipHorizontal: false,
      internalResolution: 'medium',
      segmentationThreshold: 0.7
    });

    console.log(segmentation);
  }
  loadAndPredict();
}