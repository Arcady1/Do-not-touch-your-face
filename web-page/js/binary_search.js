// Tthe function determines whether the coordinates of the face and palm have intersected using a binary search
function binarySearchForOverlapping(faceX, palmX) {
    return 1;

    if (arr_palms.length < arr_face.length) {
        const something = searching(arr_face, arr_palms);
        console.log(something);

        if (something == 'Yes!')
            audio.play();
    }
    // 
    else {
        const something = searching(arr_palms, arr_face);
        console.log(something);

        if (something == 'Yes!')
            audio.play();
    };

    // поиск пересечения элементотв массивов
    function searching(arr_1, arr_2) {
        console.log("Searching is started");
        let num, pos, old_pos, pre_old, length, center, min_dist;

        min_dist = 100;
        length = arr_1.length;
        center = parseInt(length / 2);

        // проверка, что массивы в принципе имеют точки пересечения
        if (parseInt(arr_2[0] - arr_1[length - 1]) > min_dist)
            return ('No-cross!');

        else if (parseInt(arr_2[length - 1] - arr_1[0]) < min_dist)
            return ('No-cross!');

        console.log('crossed-somewhere');

        for (let digit = 0; digit < arr_2.length; digit++) {
            num = arr_2[digit];

            pos = center;
            old_pos = pos;
            pre_old = -1;

            if (parseInt(Math.abs(num - arr_1[0])) < min_dist)
                return ('Yes!');

            else if (parseInt(Math.abs(num - arr_1[length - 1])) < min_dist)
                return ('Yes!');

            else if (parseInt(Math.abs(num - arr_1[center])) < min_dist)
                return ('Yes!');

            while (old_pos != pre_old) {
                if (num > arr_1[pos]) {

                    if (pos >= center) {
                        pre_old = old_pos;
                        old_pos = pos;
                        pos += parseInt((length - pos) / 2);

                        if (Math.abs(arr_1[pos] - num) < min_dist)
                            return ('Yes!');
                    }
                    // 
                    else if (pos < center) {
                        pre_old = old_pos;
                        old_pos = pos;
                        pos += parseInt((center - pos) / 2);

                        if (Math.abs(arr_1[pos] - num) < min_dist)
                            return ('Yes!');
                    }
                }
                //  
                else if (num < arr_1[pos]) {
                    if (pos > center) {
                        pre_old = old_pos;
                        old_pos = pos;
                        pos -= parseInt((pos - center) / 2);

                        if (Math.abs(arr_1[pos] - num) < min_dist)
                            return ('Yes!');
                    }
                    // 
                    else if (pos <= center) {
                        pre_old = old_pos;
                        old_pos = pos;
                        pos -= parseInt(pos / 2);

                        if (Math.abs(arr_1[pos] - num) < min_dist)
                            return ('Yes!');
                    }
                }
            }
        }

        return ('No-end!');
    };
}