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

var a = 5, b = 7, c = 6;
var max = a;

if(b >= max)
{
    max = b;
}
else if(c >= max)
{
    max = c;
}

console.log(max);

/*
    # Bài 4: Kiểm tra số cùng dấu
    Input:

    Cho trước 2 số a, b

    Output:

    Kiểm tra 2 số cùng dấu hay không và hiển thị kết quả ra màn hình
*/

var a = 4, b = 2;

if(a * b > 0)
{
    isSame = true;
}
else if (a == 0 || b == 0)
{
    console.log("Ko sanh duoc new a hoac b bang 0");
}
else
{
    isSame = false;
}


console.log(isSame);

/*
    # Bài 5: Sắp xếp 3 số
    Input:

    Cho trước 3 số a, b, c

    Output:

    Thực hiện đổi chỗ 3 số a, b, c sao cho 3 số có thứ tự tăng dần
*/

var a = 7, b = 4, c = 5;

if(a >= b && a >= c)
{   
    a = a + c;
    c = a - c;
    a = a - c;
}
else if(b >= a && b >= c)
{
    b = b + c;
    c = b - c;
    b = b - c;
}
if(a >= b)
{
    a = a + b;
    b = a - b;
    a = a - b;
}
console.log(a, b, c);