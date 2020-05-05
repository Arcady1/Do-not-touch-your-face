// подключение к узлу canvas и получение его контекста для работы
let canvas, video, ctx, imgToServer, imgData;

canvas = document.getElementById('canvas');
video = document.getElementById('video');
image = document.getElementById('image');

if (canvas.getContext('2d')) {
  ctx = canvas.getContext('2d');
  // ctx.scale(0.3, 0.3);
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
  // ctx.drawImage(video, 180, 0);

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

    console.log('Yes1');

    const segmentation = await net.segmentPersonParts(image, {
      flipHorizontal: true,
      internalResolution: 'medium',
      segmentationThreshold: 0.7
    });

    console.log('Yes2');

    const coloredPartImage = bodyPix.toColoredPartMask(segmentation);
    const opacity = 0.7;
    const flipHorizontal = true;
    const maskBlurAmount = 0;

    bodyPix.drawMask(
      canvas, image, coloredPartImage, opacity, maskBlurAmount,
      flipHorizontal);

    console.log(segmentation);
  }
  loadAndPredict();


}

// function f1() {
//   let audio = document.getElementById('sound');
//   audio.play();
// }