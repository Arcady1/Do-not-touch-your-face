// Tthe function determines whether the coordinates of the face and palm have intersected using a binary search
function binarySearchForOverlapping(faceX, palmX) {
    let largerArray = faceX;
    let smallerArray = palmX;

    if ((faceX.length > 0) && (palmX.length > 0)) {
        if (palmX.length > faceX.length) {
            largerArray = palmX;
            smallerArray = faceX;
        }

        return binarySearch(largerArray, smallerArray[0]);
    } else
        return -1;
}

// The function finds the intersection of the coordinates of the palm and the face
// It returns -1 if there are no intersections, otherwise 1
function binarySearch(largerArray, digit) {
    // Minimum distance between face and palm
    const interval = 50;

    let startIndex = 0;
    let endIndex = largerArray.length - 1;
    let currIndex = newCurrentIndex(startIndex, endIndex);
    let currDigit = 0;

    while (currIndex != startIndex) {
        currDigit = largerArray[currIndex];

        if (currDigit > digit)
            endIndex = currIndex;
        else if (currDigit < digit)
            startIndex = currIndex;

        if (Math.abs(digit - currDigit) <= interval)
            return 1;

        currIndex = newCurrentIndex(startIndex, endIndex);

        if (currIndex == startIndex)
            return -1;
    }
}

// The function updates the currIndex
function newCurrentIndex(startIndex, endIndex) {
    return parseInt((endIndex + startIndex) / 2);
}