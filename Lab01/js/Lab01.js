/*
    # Bài 1: Hoán vị 2 số
    Input: Cho trước 2 số a, b

    Output: Thực hiện hoán vị 2 số không dùng biến trung gian
*/

var a = 2, b = 5;

a = a + b;  // a = 2 + 5 = 7
b = a - b;  // b = 7 - 5 = 2
a = a - b;  // a = 7 - 2 = 5

console.log(a);
console.log(b);

/*
    # Bài 2: Thực hiện phép toán
    Viết chương trình tính toán biểu thức sau

    S = 10 + 20 + 5^10 / 2
*/

var S = 10 + 20 + 5**10 / 2;

console.log(S);

/*
    # Bài 3: Tìm số lớn nhất
    Học viên tìm hiểu về câu lệnh rẽ nhánh và giải bài tập sau

    Input:

    Cho trước 3 số a, b, c

    Output:

    Tìm số lớn nhất trong 3 số và hiển thị kết quả  
*/

var num1 = 5, num2 = 3, num3 = 6;
var max = num1;

if(num2 >= max)
{
    max = num2;
}
else if(num3 >= max)
{
    max = num3;
}

console.log(max);

/*
    # Bài 4: Kiểm tra số cùng dấu
    Input:

    Cho trước 2 số a, b

    Output:

    Kiểm tra 2 số cùng dấu hay không và hiển thị kết quả ra màn hình
*/

var num4 = -4, num5 = 4;
var isPositive;

if((num4 >= 0 && num5 >= 0) || (num4 < 0 && num5 < 0))
{
    isPositive = true;
}
else
{
    isPositive = false;
}

console.log(isPositive);

/*
    # Bài 5: Sắp xếp 3 số
    Input:

    Cho trước 3 số a, b, c

    Output:

    Thực hiện đổi chỗ 3 số a, b, c sao cho 3 số có thứ tự tăng dần
*/

var a = 7, b = 8, c = 6;

if(b > a && b > c)
{
    b = a + b;
    a = b - a;
    b = b - a;
}
else if(c > a && c > b)
{
    c = a + c;
    a = c - a;
    c = c - a;
}

if(c > b)
{
    c = b + c;
    b = c - b;
    c = c - b;
}

console.log(a, b, c);