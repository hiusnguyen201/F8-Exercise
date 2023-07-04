/*
    # Bài 1: Tìm số chẵn lẻ
    Cho 1 số nguyên bất kỳ, hiển thị danh sách các số chẵn và số lẻ

    Input:          var n = 10;

    Output:         Số lẻ: 1, 3, 5, 7, 9
                    Số chẵn: 2, 4, 6
*/

var n = 10;
var evenNum = "";
var oddNum = "";

if(Number.isInteger(n) && n > 0)
{
    for(var i = 1; i <= n; i++) 
    {
        if (i % 2 === 0) 
        {
            evenNum += i;
            evenNum += ' ';
        }
        else 
        {
            oddNum += i;
            oddNum += ' ';
        }
    }

    console.log(`Số Chẵn: ${evenNum}`);
    console.log(`Số Lẻ: ${oddNum}`);
}
else
{
    console.log('Ko hop le');
}

/*
    # Bài 2: Tính giá trị biểu thức
    Cho trước số nguyên n. Tính giá trị biểu thức sau
    S= 1*2 + 2*3 + 3*4 + ... + n*(n+1)
*/

var n = 4;
var S = 0;
S = (n * (n + 1) * (n + 2)) / 3
console.log(`Giá trị của biểu thức là: ${S}`);

/*
    # Bài 3: Tính tổng chẵn lẻ
    Cho trước 2 số a, b. Tính tổng số chẵn và số lẻ trong khoảng từ a đến b

    Input:             var a = 5, b = 9;
    Output:            Tổng số lẻ: 21
                       Tổng số chẵn: 14
*/

var a = 5, b = 9;
var totalEven = 0, totalOdd = 0;

if(Number.isInteger(a) && Number.isInteger(b) && a > 0 && b > 0)
{
    for(var i = a; i <= b; i++)
    {
        if(i % 2 === 0)
        {
            totalEven += i;
        }
        else
        {
            totalOdd += i;
        }
    }

    console.log(`Tổng số lẻ: ${totalOdd}`);
    console.log(`Tổng số chẵn: ${totalEven}`);
}
else
{
    console.log('Ko hop le');
}

/*
    Bài 4: Viết hàm kiểm tra số nguyên tố
    Viết 1 hàm kiểm tra 1 số có phải số nguyên tố hay không?
    Hàm có 1 tham số là số cần kiểm tra
    Hàm có giá trị trả về
    Gọi hàm trong câu điều kiện if else
*/

var n = 7;

if(Number.isInteger(n) && n > 0)
{
    if(isPrime(n))
    {
        console.log(`${n} là số nguyên tố`);
    }
    else
    {
        console.log(`${n} không phải là số nguyên tố`);
    }
}
else
{
    console.log('Ko hợp lệ');
}

function isPrime (n)
{
    if(n < 2)
    {
        return false;
    }

    for(var i = 2; i <= Math.sqrt(n); i++)
    {
        if(n % i === 0)
        {
            return false;
        }
    }
    return true;
}



/*
    # Bài 5: Tính giá trị biểu thức không dùng vòng lặp
    Tính giá trị biểu thức: S = 1 + 1/2 + 1/3 + 1/4 + 1/5 +…+1/N
*/  

var total = 0;
var num = 3;

if(Number.isInteger(num) && num > 0)
{
    console.log(getTotal(num));
}
else
{
    console.log('Ko hợp lệ');
}

function getTotal(num)
{
    total += (1 / num);
    if(num === 1)
    {
        return total;
    }
    else
    {
        getTotal(--num);
    }
    return total;
}
