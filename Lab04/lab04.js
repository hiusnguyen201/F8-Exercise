/*
    Hiển thị N số Fibonaci đầu tiên
    Ví dụ: Gán n = 10 sẽ hiển thị danh sách 10 số fibonaci
*/

function fibonacci(n)
{
    if(n <= 0) return;
    fibonacci(n - 1);
    var currentNum = fibonacciNumber(n);
    console.log(currentNum);
}

function fibonacciNumber(n)
{
    if (n === 1) return 0;

    if (n === 2) return 1;

    return fibonacciNumber(n - 1) + fibonacciNumber(n - 2);
}

var n = 10;
if(Number.isInteger(n))
{
    fibonacci(n);
}
else
{
    console.log('n không phải là số nguyên');
}

/*
    Viết hàm đảo ngược số nguyên với tham số là số cần đảo ngược
    Ví dụ: Khi gọi hàm và truyền đối số 12345sẽ trả về kết quả 54321
*/

function reverseNumber(n)
{
    var reverseNumber = 0;
    while(n !== 0)
    {   
        var seperateNum = n % 10;
        reverseNumber = reverseNumber * 10 + seperateNum;
        n = (n - seperateNum) / 10;
    }
    return reverseNumber;
}

var n = 12345;

if(Number.isInteger(n))
{
    console.log(reverseNumber(n));
}
else
{
    console.log('n không phải là số nguyên');
}

/*
    Viết hàm chuyển số thành chữ
    Ví dụ: Số 4298 sẽ chuyển thành: Bốn ngàn hai trăm chín tám
    Ràng buộc: Số cần chuyển đổi có giá trị từ 0 đến 9999
*/

function convertNumberToWords(n)
{
    if (n === 0) return 'không';

    var onesWords = '';
    var tensWords = '';
    var hundredsWords = '';
    var thousandsWords = '';

    // Hàng 1 
    var ones = n % 10;
    if(ones > 0)
    {
        switch(ones)
        {
            case 1:
                onesWords = 'một';
                break;
            case 2:
                onesWords = 'hai';
                break;
            case 3:
                onesWords = 'ba';
                break;
            case 4:
                onesWords = 'bốn';
                break;
            case 5:
                onesWords = 'năm';
                break;
            case 6:
                onesWords = 'sáu';
                break;
            case 7:
                onesWords = 'bảy';
                break;
            case 8:
                onesWords = 'tám';
                break;
            case 9:
                onesWords = 'chín';
                break;
        }
    }


    // Hàng Chục
    var tens = Math.floor((n % 100) / 10);

    if(tens > 0)
    {
        switch(tens)
        {
            case 1:
                tensWords = 'mười';
                break;
            case 2:
                tensWords = 'hai mươi';
                break;
            case 3:
                tensWords = 'ba mươi';
                break;
            case 4:
                tensWords = 'bốn mươi';
                break;
            case 5:
                tensWords = 'năm mươi';
                break;
            case 6:
                tensWords = 'sáu mươi';
                break;
            case 7:
                tensWords = 'bảy mươi';
                break;
            case 8:
                tensWords = 'tám mươi';
                break;
            case 9:
                tensWords = 'chín mươi';
                break;
        }
    }

    // Hàng trăm
    var hundreds = Math.floor((n % 1000) / 100);

    if(hundreds > 0)
    {
        switch(hundreds)
        {
            case 1:
                hundredsWords = 'một trăm';
                break;
            case 2:
                hundredsWords = 'hai trăm';
                break;
            case 3:
                hundredsWords = 'ba trăm';
                break;
            case 4:
                hundredsWords = 'bốn trăm';
                break;
            case 5:
                hundredsWords = 'năm trăm';
                break;
            case 6:
                hundredsWords = 'sáu trăm';
                break;
            case 7:
                hundredsWords = 'bảy trăm';
                break;
            case 8:
                hundredsWords = 'tám trăm';
                break;
            case 9:
                hundredsWords = 'chín trăm';
                break;
        }
    }    

    // Hàng Nghìn
    var thousands = Math.floor(n / 1000);

    if(thousands > 0)
    {
        switch(thousands)
        {
            case 1:
                thousandsWords = 'một nghìn';
                break;
            case 2:
                thousandsWords = 'hai nghìn';
                break;
            case 3:
                thousandsWords = 'ba nghìn';
                break;
            case 4:
                thousandsWords = 'bốn nghìn';
                break;
            case 5:
                thousandsWords = 'năm nghìn';
                break;
            case 6:
                thousandsWords = 'sáu nghìn';
                break;
            case 7:
                thousandsWords = 'bảy nghìn';
                break;
            case 8:
                thousandsWords = 'tám nghìn';
                break;
            case 9:
                thousandsWords = 'chín nghìn';
                break;
        }
    }
    
    var words = `${thousandsWords} ${hundredsWords} ${tensWords} ${onesWords}`
    return words;
}

var n = 4444;
if(Number.isInteger(n))
{
    if(n >= 0 && n <= 9999)
    {
        console.log(convertNumberToWords(n));
    }
    else
    {
        console.log('Ko hợp lệ');
    }
}
else
{
    console.log('n Ko phải là số nguyên');
}
