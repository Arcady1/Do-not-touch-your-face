let $ = require('jquery');

window.onload = () => {
    resizeVidoAndCanvas();
}

window.onresize = () => {
    resizeVidoAndCanvas();
}

function resizeVidoAndCanvas() {
    let $canvasHeight = $("canvas").height();
    let $video = $("#video");

    $video.height($canvasHeight);
}