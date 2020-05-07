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

    // Segmentation settings
    const segmentationConfig = {
      flipHorizontal: false,
      internalResolution: 'medium',
      segmentationThreshold: 0.7
    };

    const segmentation = await net.segmentPersonParts(image, segmentationConfig);

    let arr_face = [];
    let arr_palms = [];
    // идентифицируем только лицо (0) и ладони (10)
    for (let x = 0; x < 307200; x++) {
      pix = segmentation.data[x];

      if (((pix > 1) & (pix < 10)) | (pix > 11))
        segmentation.data[x] = -1;
      // массив, хранящий координаты лица
      else if ((pix == 0) | (pix == 1)) {
        segmentation.data[x] = 0;
        arr_face.push(x);
      }
      // массив, хранящий координаты лица
      else if ((pix == 10) | (pix == 11)) {
        segmentation.data[x] = 10;
        arr_palms.push(x);
      }
    };

    // проверка, есть ли пересечение массивов
    // code

    // for (let y = 0; y < arr_palms.length; y++) {
    //   segmentation.data[arr_palms[y]] = 5;
    // };

    // свойства маски
    const coloredPartImage = bodyPix.toColoredPartMask(segmentation);
    const opacity = 0.7;
    const flipHorizontal = false;
    const maskBlurAmount = 0;

    // наложение маски на ведопоток и отбражение на холсте
    bodyPix.drawMask(
      canvas, image, coloredPartImage, opacity, maskBlurAmount,
      flipHorizontal);

    console.log(segmentation);
    // console.log(arr_palms);

  }

  loadAndPredict();
}