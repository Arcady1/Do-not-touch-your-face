// Tthe function determines whether the coordinates of the face and palm have intersected using a binary search
function binarySearchForOverlapping(faceX, palmX) {
    let largerArray = faceX;
    let smallerArray = palmX;

    if ((faceX.length > 0) && (palmX.length > 0)) {
        if (palmX.length > faceX.length) {
            largerArray = palmX;
            smallerArray = faceX;
        }

        return binarySearch(largerArray, smallerArray);
    } else
        return -1;
}

// The function finds the intersection of the coordinates of the palm and the face
// It returns -1 if there are no intersections, otherwise 1
function binarySearch(largerArray, smallerArray) {
    // Minimum distance between face and palm
    const interval = 50;
    let startIndex, endIndex, currIndex, digit;

    for (let i = 0; i < smallerArray.length; i++) {
        startIndex = 0;
        endIndex = largerArray.length - 1;
        currIndex = newCurrentIndex(startIndex, endIndex);
        digit = smallerArray[i];

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
                break;
        }
    }
    // If the user didn't touch the face
    return -1;
}

// The function updates the currIndex
function newCurrentIndex(startIndex, endIndex) {
    return parseInt((endIndex + startIndex) / 2);
}