let canvas = document.getElementById('canvas');
let video = document.getElementById('video');
let $muteSymb = $("#mute-symbol");

// Whether the browser supports canvas.getContext("2d")
if (canvas.getContext('2d'))
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
            video.srcObject = stream;
            hideNoCamerImg();
            video.play();
            modelLoading(video);
        })
        .catch(() => {
            console.log("No camera access!");
        });
}

function hideNoCamerImg() {
    let videAndCanvas = $("video, canvas");
    videAndCanvas.css({
        "background-image": "none"
    })
}