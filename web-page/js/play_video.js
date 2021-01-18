let unmuteButton = document.getElementById("unmuteButton");

unmuteButton.addEventListener('click', function () {
    video.muted = false;
    unmuteButton.style.opacity = 0;

    setTimeout(() => {
        video.play();
    }, 5000);
});