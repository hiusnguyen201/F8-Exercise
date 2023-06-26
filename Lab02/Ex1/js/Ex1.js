/*
    # Tính tiền taxi
    Tính tiền cước taxi dựa vào các điều kiện sau:

    Số km ≤ 1 giá 15000đ

    1 < số km ≤ 5 giá 13500đ

    Số km > 5 giá 11000đ

    Nếu số km > 120 km sẽ được giảm 10% trên tổng số tiền
*/

var km = 150, price, discount, total;

if(km >= 0)
{
    if(km <= 1)
    {
        price = 15000;
        total = km * price;
    }
    else if(km > 1 && km <= 5)
    {
        price = 13500;
        total = 15000 + (km - 1) * price;
    }
    else
    {
        price = 11000;
        total = 15000 + (5 * 13500) + ((km - 5) * price);
        if(km > 120)
        {
            discount = 10;
            total = total - total * (10 / 100);
        }
    }

    console.log(total);
}
else
{
    console.log('Ko hop le');
}

