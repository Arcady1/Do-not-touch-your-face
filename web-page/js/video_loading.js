let canvas = document.getElementById('canvas');
let video = document.getElementById('video');
let audio = document.getElementById('audio');
let $muteSymb = $("#mute-symbol");

// Whether the browser supports canvas.getContext("2d")
if (canvas.getContext('2d'))
    videolink();
else
    alert('Your browser does\'t support canvas.getContext("2d")');

// web-cam code
function videolink() {
    video.play();
    modelLoading(video);
}