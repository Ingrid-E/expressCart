// Importar la función a probar
const { order_quicksort } = require('./algoritms');

describe('Order array in ascend form', () => {
    // Little list -> 5 numbers, cheap cost O(nLogn)
    it('Small List', () => {
        // Input params
        const inputArray = [4, 2, 7, 1, 5];

        // Expected result
        const expectedArray = [1, 2, 4, 5, 7];

        // Execute function
        const sortedArray = order_quicksort(inputArray);

        // Verify if the result is equal than expected one
        expect(sortedArray).toEqual(expectedArray);
    });

    // Big list -> 300 numbers, cheap cost O(nLogn)
    it('Big List', () => {
        // Input params
        const inputArray = [
            55, 24, 35, 76, 42, 98, 14, 87, 19, 72,
            67, 11, 30, 81, 93, 26, 59, 49, 92, 12,
            68, 36, 77, 64, 99, 21, 88, 44, 70, 27,
            80, 61, 15, 73, 17, 96, 53, 33, 84, 40,
            95, 28, 57, 86, 48, 89, 71, 31, 66, 10,
            75, 46, 38, 82, 63, 90, 23, 69, 16, 91,
            25, 62, 50, 74, 39, 94, 34, 51, 29, 78,
            43, 13, 83, 58, 47, 85, 18, 32, 65, 97,
            22, 56, 37, 79, 41, 60, 45, 20, 54, 9,
            100, 52, 102, 107, 111, 113, 116, 121, 125, 132,
            137, 139, 144, 148, 150, 153, 155, 157, 159, 163,
            165, 169, 172, 176, 180, 184, 188, 192, 196, 200,
            203, 207, 211, 215, 219, 222, 226, 230, 234, 237,
            241, 245, 249, 252, 256, 259, 263, 267, 270, 274,
            278, 282, 286, 289, 293, 297, 301, 305, 308, 312,
            316, 320, 324, 327, 331, 335, 339, 342, 346, 350,
            354, 358, 361, 365, 369, 373, 377, 380, 384, 388,
            392, 396, 400, 403, 407, 411, 415, 418, 422, 426,
            430, 434, 437, 441, 445, 449, 453, 456, 460, 464,
            468, 472, 476, 479, 483, 487, 491, 495, 499, 502,
            506, 510, 514, 517, 521, 525, 529, 532, 536, 540,
            544, 548, 551, 555, 559, 563, 567, 570, 574, 578,
            582, 586, 589, 593, 597, 601, 605, 608, 612, 616,
            620, 624, 627, 631, 635, 639, 643, 646, 650, 654,
            658, 662, 665, 669, 673, 677, 681, 684, 688, 692,
            696, 700, 704, 707, 711, 715, 719, 723, 726, 730,
            734, 738, 741, 745, 749, 753, 757, 760, 764, 768,
            772, 776, 780, 783, 787, 791, 795, 798, 802, 806,
            810, 814, 817, 821, 825, 829, 833, 836, 840, 844,
            848, 852, 855, 859, 863, 867, 871, 874, 878, 882,
            886, 890, 894, 897, 901, 905, 909, 912, 916, 920,
            924, 928, 932, 935, 939, 943, 947, 950, 954, 958,
            962, 966, 969, 973, 977, 981, 985, 988, 992, 996
        ];

        // Expected result
        const expectedArray = [
            9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
            19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
            29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
            39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
            49, 50, 51, 52, 53, 54, 55, 56, 57, 58,
            59, 60, 61, 62, 63, 64, 65, 66, 67, 68,
            69, 70, 71, 72, 73, 74, 75, 76, 77, 78,
            79, 80, 81, 82, 83, 84, 85, 86, 87, 88,
            89, 90, 91, 92, 93, 94, 95, 96, 97, 98,
            99, 100, 102, 107, 111, 113, 116, 121, 125, 132,
            137, 139, 144, 148, 150, 153, 155, 157, 159, 163,
            165, 169, 172, 176, 180, 184, 188, 192, 196, 200,
            203, 207, 211, 215, 219, 222, 226, 230, 234, 237,
            241, 245, 249, 252, 256, 259, 263, 267, 270, 274,
            278, 282, 286, 289, 293, 297, 301, 305, 308, 312,
            316, 320, 324, 327, 331, 335, 339, 342, 346, 350,
            354, 358, 361, 365, 369, 373, 377, 380, 384, 388,
            392, 396, 400, 403, 407, 411, 415, 418, 422, 426,
            430, 434, 437, 441, 445, 449, 453, 456, 460, 464,
            468, 472, 476, 479, 483, 487, 491, 495, 499, 502,
            506, 510, 514, 517, 521, 525, 529, 532, 536, 540,
            544, 548, 551, 555, 559, 563, 567, 570, 574, 578,
            582, 586, 589, 593, 597, 601, 605, 608, 612, 616,
            620, 624, 627, 631, 635, 639, 643, 646, 650, 654,
            658, 662, 665, 669, 673, 677, 681, 684, 688, 692,
            696, 700, 704, 707, 711, 715, 719, 723, 726, 730,
            734, 738, 741, 745, 749, 753, 757, 760, 764, 768,
            772, 776, 780, 783, 787, 791, 795, 798, 802, 806,
            810, 814, 817, 821, 825, 829, 833, 836, 840, 844,
            848, 852, 855, 859, 863, 867, 871, 874, 878, 882,
            886, 890, 894, 897, 901, 905, 909, 912, 916, 920,
            924, 928, 932, 935, 939, 943, 947, 950, 954, 958,
            962, 966, 969, 973, 977, 981, 985, 988, 992, 996
        ];

        // Execute function
        const sortedArray = order_quicksort(inputArray);

        // Verify if the result is equal than expected one
        expect(sortedArray).toEqual(expectedArray);
    });

    // Medium List -> Big cost O(n2)
    it('Medium List, Big cost O(n2)', () => {
        // Input params
        const inputArray = [
            100, 99, 98, 97, 96, 95, 94, 93, 92, 91,
            90, 89, 88, 87, 86, 85, 84, 83, 82, 81,
            80, 79, 78, 77, 76, 75, 74, 73, 72, 71,
            70, 69, 68, 67, 66, 65, 64, 63, 62, 61,
            60, 59, 58, 57, 56, 55, 54, 53, 52, 51,
            50, 49, 48, 47, 46, 45, 44, 43, 42, 41,
            40, 39, 38, 37, 36, 35, 34, 33, 32, 31,
            30, 29, 28, 27, 26, 25, 24, 23, 22, 21,
            20, 19, 18, 17, 16, 15, 14, 13, 12, 11,
            10, 9, 8, 7, 6, 5, 4, 3, 2, 1
        ];

        // Expected Result
        const expectedArray = [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
            11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
            21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
            31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
            41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
            51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
            61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
            71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
            81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
            91, 92, 93, 94, 95, 96, 97, 98, 99, 100
        ];

        // Execute function
        const sortedArray = order_quicksort(inputArray);

        // Verify if the result is equal than expected one
        expect(sortedArray).toEqual(expectedArray);
    });


})