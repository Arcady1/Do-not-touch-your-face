// подключение к узлу canvas и получение его контекста для работы
let canvas, video, ctx, imgToServer, imgData;

canvas = document.getElementById('canvas');
video = document.getElementById('video');
image = document.getElementById('image');

// проверка на поддержку браузером canvas.getContext("2d")
if (canvas.getContext('2d')) {
  ctx = canvas.getContext('2d');
  // videolink();
} else
  alert('You browser does not support canvas.getContext("2d")');

// web-cam code
// function videolink() {
//   navigator.getMedia = navigator.getUserMedia ||
//     navigator.webkitGetUserMedia ||
//     navigator.mozGetUserMedia ||
//     navigator.msGetUserMedia;

//   navigator.mediaDevices.getUserMedia({
//       video: true,
//       audio: false
//     })
//     .then(stream => {
//       video.srcObject = stream;
//       video.play();
//       canvas.style.display = 'block';
//       setInterval(function () {
//         Photo();
//       }, 1000);
//     })

//     .catch(() => {
//       console.log("No camera access!");
//     });
// }

setInterval(Photo(), 60);

function Photo() {
  // ctx.drawImage(video, 180, 0);

  // НЕ УДАЛЯТЬ! imgData получает URL скриншотов
  // imgData = canvas.toDataURL('image/jpeg', 0.5);
  // console.log(imgData);

  async function loadAndPredict() {
    // Loading the model
    const net = await bodyPix.load({
      architecture: 'MobileNetV1',
      outputStride: 16,
      multiplier: 0.75,
      quantBytes: 2
    });
    console.log("Successfully loaded!");

    const segmentationConfig = {
      flipHorizontal: true,
      internalResolution: 'medium',
      segmentationThreshold: 0.7
    };

    const segmentation = await net.segmentPersonParts(image, segmentationConfig);

    // идентифицируем только лицо и ладони
    for (let x = 0; x < 307200; x++) {
      pix = segmentation.data[x];

      if (((pix > 1) & (pix < 10)) | (pix > 11))
        segmentation.data[x] = -1;

      // объекты, в которых хранятся позиции рук и головы
      else {
        if (pix == 0) {
          // console.log(segmentation.a)
        };
        // let headLocation = {
        //   posX: 0,
        //   posY: 0,
        //   center: 0
        // }
        // let leftHandLocation = {
        //   posX: 0,
        //   posY: 0,
        //   center: 0
        // }
        // let rightHandLocation = {
        //   posX: 0,
        //   posY: 0,
        //   center: 0
        // }
      }
    };

    // свойства маски
    const coloredPartImage = bodyPix.toColoredPartMask(segmentation);
    const opacity = 0.7;
    const flipHorizontal = true;
    const maskBlurAmount = 0;

    // наложение маски на ведопоток и отбражение на холсте
    bodyPix.drawMask(
      canvas, image, coloredPartImage, opacity, maskBlurAmount,
      flipHorizontal);

    console.log(segmentation);
  }

  loadAndPredict();
}