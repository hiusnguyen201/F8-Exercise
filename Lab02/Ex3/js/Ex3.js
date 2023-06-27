// Học viên tìm hiểu về vòng lặp để tính giai thừa của 1 số nguyên N

var n = 10, total = 1;

if(Number.isInteger(n))
{
    for(var i = 1; i <= n; i++)
    {
        total *= i;
    }
    console.log(total);
}
else
{
    console.log('n ko phai la so nguyen');
}

