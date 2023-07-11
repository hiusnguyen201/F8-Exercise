/*
    # Bài 01
    Cho trước 1 mảng số nguyên, yêu cầu tìm số lớn nhất, nhỏ nhất trong mảng và vị trí
*/

var arrNum = [5, 103, -1, 10, 12, 14, 1, 5, 13, 22, 0, 100, -1];
var arrNum2 = [1, 4, 6];

var findMax = function (arr) {
    var max = arr[0], index;
    for(var i = 0; i <= arr.length - 1; i++) {
        if(arr[i] >= max)
        {
            max = arr[i];
            index = i;
        }
    }
    return `Max = ${max} tại vị trí index = ${index}`;
}

var findMin = function (arr) {
    var min = arr[0], index;
    for(var i = 0; i <= arr.length - 1; i++) {
        if(arr[i] < min)
        {
            min = arr[i];
            index = i;
        }
    }
    return `Min = ${min} tại vị trí index = ${index}`;
}

console.log(findMax(arrNum));
console.log(findMin(arrNum));

/*
    # Bài 02
    Cho trước 1 mảng số nguyên, tính trung bình các số nguyên tố trong mảng. Nếu trong mảng không có số nguyên tố thì hiển thị “Không có số nguyên tố”
*/

var isPrime = function(number) {
    if(number < 2)
    {
        return false;
    }
    for(var i = 2; i <= Math.sqrt(number); i++) {
        if(number % i === 0) {
            return false;
        }
    }
    return true;
}

var averagePrimeNum = function (arr) {
    var sum = 0, count = 0;
    for(var i = 0; i < arr.length; i++) {
        if(isPrime(arr[i])) {
            count++;
            sum += arr[i];
        }
    }

    if(count === 0) {
        return "Không có số nguyên tố";
    } 
    return sum / count;
}

console.log(averagePrimeNum(arrNum2));

/*
    # Bài 03
    Cho trước 1 mảng bất kỳ, nếu trong mảng có các phần tử trùng nhau thì chỉ giữa lại 1 (Gọi là lọc trùng). In ra mảng sau khi đã xử lý
*/

var arr3 = [1, 1, 3, 5, 3];

var removeDeplicate = function(arr) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        if(!newArr.includes(arr[i])) newArr[newArr.length] = arr[i];
    }
    return newArr;
};

console.log(removeDeplicate(arr3));

/*
    # Bài 04
    Cho trước 1 mảng số nguyên và thực hiện các yêu cầu sau

    Sắp xếp mảng theo thứ tự tăng dần

    Chèn thêm 1 số vào bất kỳ vị trí nào trong mảng mà không làm thay đổi thứ tự sắp xếp của mảng

    Ví dụ:

    var numbers = [5, 1, 9, 8, 10];
    var element = 4;
    Kết quả hiển thị:

    [1, 4, 5, 8, 9, 10]
*/

var arr4 = [0, -14, 1, 3, -5, 6];
var num = 5;
var insertIndex = 4;

var sortArr = function (arr) {
    return arr.sort((a, b) => a - b);
};

var insertNum = function (arr, num, index) {
    if(index === 0) {
        arr.unshift(num);
    }
    else if (index >= arr.length) {
        arr.push(num);
    }
    else {
        var leftSliceArr = arr.slice(0, index);
        var rightSliceArr = arr.slice(index);
        arr = [];
        arr = arr.concat(leftSliceArr, num, rightSliceArr);
    }
    return sortArr(arr);
}

console.log(arr4);
console.log(insertNum(arr4, num, insertIndex));