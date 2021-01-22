let vars = require('./vars.js');
let $ = require('jquery');
let model_loading = require('./model_loading.js');

// Whether the browser supports canvas.getContext("2d")
if (vars.canvas.getContext('2d'))
    videolink();
else
    alert('Your browser does\'t support canvas.getContext("2d")');

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
            vars.video.srcObject = stream;
            hideCameraImg();
            vars.video.play();
            model_loading.modelLoading(vars.video);
        })
        .catch(() => {
            console.log("No camera access!");
        });
}

function hideCameraImg() {
    let videAndCanvas = $("video, canvas");
    videAndCanvas.css({
        "background-image": "none"
    })
}