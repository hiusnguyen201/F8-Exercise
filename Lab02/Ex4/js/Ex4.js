// Viết chương trình kiểm tra 1 số có phải số nguyên tố hay không?

var n = 13, result = true;

if (n == 1)
{
    result = false;
}
else
{
    for(var i = 2; i < n/2; i++) // Có thể lặp đến < n -> nhiều vòng lặp hơn
    {
        if(n % i == 0)
        {
            result = false;
            break;
        }
    }
}

if(result == true)
{
    console.log(`${n} la so nguyen to`);
}
else
{
    console.log(`${n} khong phai la so nguyen to`);
}

