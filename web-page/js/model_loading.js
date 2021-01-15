// The function loads the model
async function modelLoading(video) {
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
    
    // Making predictions
    makePredictions(net, segmentationConfig, video);
}