window.onresize = () => {
    let $canvasHeight = $("canvas").height();
    let $video = $("#video");
        
    $video.height($canvasHeight);
}