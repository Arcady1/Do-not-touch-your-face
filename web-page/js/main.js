// подключение к узлу canvas и получение его контекста для работы
let canvas, video, ctx, imgData;

canvas = document.getElementById('canvas');
video = document.getElementById('video');
// image = document.getElementById('image');

// проверка на поддержку браузером canvas.getContext("2d")
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
      canvas.style.display = 'block';
      setInterval(function () {
        Photo();
      }, 1000);
    })

    .catch(() => {
      console.log("No camera access!");
    });
}

setInterval(Photo(), 2000);

function Photo() {
  // ctx.drawImage(video, 0, 0);

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

    const segmentation = await net.segmentPersonParts(video, segmentationConfig);

    let arr_face = [];
    let arr_palms = [];
    // идентифицируем только лицо (0) и ладони (10)
    for (let x = 0; x < (canvas.width * canvas.height); x++) {
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

    // координаты лица
    console.log("face:");
    console.log(arr_face);
    // координаты кистей
    console.log("palms:");
    console.log(arr_palms);

    if (arr_palms.length < arr_face.length) {
      const something = await searching(arr_face, arr_palms);
      console.log(something);
    } else {
      const something = await searching(arr_palms, arr_face);
      console.log(something);
    };

    // поиск пересечения элементотв массивов
    function searching(arr_1, arr_2) {
      console.log("Began...");
      let num, pos, length;

      length = arr_1.length;

      for (let digit = 0; digit < arr_2.length; digit++) {
        num = arr_2[digit];
        pos = parseInt(length / 2);

        if (num == arr_1[0])
          return ('found!');

        else if (num == arr_1[length - 1])
          return ('found!');

        else {
          while (pos != 0) {
            if (pos == (length - 1))
              break;
            // 
            else if (num < arr_1[pos])
              pos = parseInt(pos / 2);
            // 
            else if (num > arr_1[pos]) {
              pos += (parseInt((length - pos) / 2));
              if (arr_1[pos] > num)
                break;
            }
            //  
            else
              return ('found!');
          }
        }
      }

      return ('NOTfound!');
    };

    // свойства маски
    const coloredPartImage = bodyPix.toColoredPartMask(segmentation);
    const opacity = 0.7;
    const flipHorizontal = false;
    const maskBlurAmount = 0;

    // наложение маски на ведопоток и отбражение на холсте
    bodyPix.drawMask(
      canvas, video, coloredPartImage, opacity, maskBlurAmount,
      flipHorizontal);

    console.log(segmentation);
    // console.log(arr_palms);
  }

  loadAndPredict();
}