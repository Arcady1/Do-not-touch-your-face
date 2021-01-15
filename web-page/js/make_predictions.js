// The function makes predictions
async function makePredictions(net, segmentationConfig, video) {
    // Body segmentation
    let segmentation = await net.segmentPersonParts(video, segmentationConfig);

    // Make an array of only palm and face X coordinates: face-code == 0, hands-code == 10
    let faceAndPalmObj = faceAndHandsShowOnly(segmentation);

    // Searching for face and palm intersections
    const faceAndPalmsDetection = new Promise((resolve, reject) => {
            let resOfSearching = binarySearchForOverlapping(faceAndPalmObj.face, faceAndPalmObj.palm);
            resolve(resOfSearching);
        })
        .then((resOfSearching) => {
            // If the palm touched the face
            if (resOfSearching == 1)
                audio.play();
        })
        .catch((err) => {
            console.log(err);
        });

    await faceAndPalmsDetection;

    // Setting the mask properties
    maskProperties(segmentation);

    setTimeout(makePredictions, 0, net, segmentationConfig, video);
}

// Face (0) and hands (10) only
function faceAndHandsShowOnly(segmentation) {
    // Face X coordinates
    let arr_face = [];
    // Palm X coordinates
    let arr_palm = [];
    // Current pixel
    let pix = 0;

    for (let x = 0; x < (canvas.width * canvas.height); x++) {
        pix = segmentation.data[x];

        if (((pix > 1) && (pix < 10)) || (pix > 11))
            segmentation.data[x] = -1;
        else if ((pix == 0) || (pix == 1)) {
            segmentation.data[x] = 0;
            arr_face.push(x);
        } else if ((pix == 10) || (pix == 11)) {
            segmentation.data[x] = 10;
            arr_palm.push(x);
        }
    }

    return {
        "face": arr_face,
        "palm": arr_palm
    }
}

// Mask Properties
function maskProperties(segmentation) {
    const coloredPartImage = bodyPix.toColoredPartMask(segmentation);
    const opacity = 0.7;
    const flipHorizontal = false;
    const maskBlurAmount = 0;

    bodyPix.drawMask(
        canvas, video, coloredPartImage, opacity, maskBlurAmount,
        flipHorizontal);
}