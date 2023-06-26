/*
    Học viên viết chương trình tiền điện hàng tháng theo yêu cầu sau

    Input: Số điện tiêu thụ hàng tháng

    Output: Hiển thị số tiền phải đóng

    Chi tiết giá điện theo bậc
*/

var kWh = 645, price, total;
if (kWh >= 0)
{
    if(kWh <= 50)
    {
        price = 1.678;
        total = kWh * price;
    }
    else if (kWh > 50 && kWh <= 100)
    {
        price = 1.734;
        total = (50 * 1.678) + (kWh - 50) * price;
    }
    else if (kWh > 100 && kWh <= 200)
    {
        price = 2.014;
        total = (50 * 1.678) + (50 * 1.734) + (kWh - 100) * price;
    }
    else if (kWh > 200 && kWh <= 300)
    {
        price = 2.536;
        total = (50 * 1.678) + (50 * 1.734) + (100 * 2.014) + (kWh - 200) * price;
    }
    else if (kWh > 300 && kWh <= 400)
    {
        price = 2.834;
        total = (50 * 1.678) + (50 * 1.734) + (100 * 2.014) + (100 * 2.536) + (kWh - 300) * price;
    }
    else
    {
        price = 2.927;
        total = (50 * 1.678) + (50 * 1.734) + (100 * 2.014) + (100 * 2.536) + (100 * 2.834) + (kWh - 400) * price;
    }

    console.log(total);
}
else
{
    console.log('Ko hop le');
}