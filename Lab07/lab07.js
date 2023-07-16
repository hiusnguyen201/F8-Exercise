/*
    Lấy kết quả giao giữa 2 mảng

    var arrA = [1, 4, 3, 2];
    var arrB = [5, 2, 6, 7, 1];
    Kết quả [1,2]
*/

var arrA = [1, 4, 3, 2];
var arrB = [5, 2, 6, 7, 1];

var diff = arrA.reduce(function (prev, curr) {
    return !arrB.includes(curr) && prev.push(curr), prev;
}, []);

console.log(diff);

/*
    # Bài 2
    Làm phẳng array sau (Chuyển về mảng 1 chiều)

    var arr = [0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]];
    Kết quả

    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
*/

var arr = [0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]];

var flattenedArray = function (arr) {
    return arr.reduce(function (prev, curr) {
        return prev.concat(Array.isArray(curr) ? flattenedArray(curr) : curr)
    }, [])
}

var flattenedArr = flattenedArray(arr);
console.log(flattenedArr);

/*
    Tách phần tử trong mảng theo đúng kiểu dữ liệu

    var arr = [["a", 1, true], ["b", 2, false]]
    Kết quả

    [["a", "b"], [1, 2], [true, false]]
*/

var arr = [["a", 1, true], ["b", 2, false]];

var seperateArray = arr.reduce(function (prev, curr) {
    curr.forEach(function(value, i) {
        if (prev[i] === undefined) {
            prev[i] = [];
        }
        prev[i].push(value);
    });
    return prev;
}, [])

console.log(seperateArray);