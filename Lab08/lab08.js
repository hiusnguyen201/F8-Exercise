/*
    Viết một hàm tạo (Constructor) để khởi tạo ra một đối tượng có 3 thuộc tính: name, age và address.

    Sau đó viết một hàm nhận vào một mảng chứa nhiều đối tượng để khởi tạo ra một mảng mới chứa các đối tượng có cấu trúc như trên.

    Kết quả trả về là một mảng chứa tất cả thông tin của các đối tượng đó được sắp xết tăng dần theo tuổi và thêm một thuộc tính mới là shortName của mỗi đối tượng.

    Input:

    const customers = [
    { name: "Nguyễn Văn A", age: 11, address: "Ha Noi" },
    { name: "Nguyễn Văn B", age: 2, address: "Hai Phong" },
    { name: "Nguyễn Văn C", age: 12, address: "TP.HCM" },
    ];

    const result = createCustomers(customers); // Tạo hàm createCustomers này. return về mảng mới.
    Output:

    result = [
    { name: "Nguyễn Văn B", age: 2, address: "Hai Phong", shortName: "Nguyễn B" },
    { name: "Nguyễn Văn A", age: 11, address: "Ha Noi", shortName: "Nguyễn A" },
    { name: "Nguyễn Văn C", age: 12, address: "TP.HCM", shortName: "Nguyễn C" },
];
*/

function Customer (name, age, address) {
    this.name = name;
    this.age = age;
    this.address = address;
}

var createCustomers = function(customers) {
    customers.sort((a,b) => a.age - b.age);

    customers.forEach(customer => {
        var splitName = customer.name.split(" ");
        customer.shortName = `${splitName[0]} ${splitName[splitName.length - 1]}}`
    });
    return customers;
}

var customers = [
    { name: "Nguyễn Văn C", age: 12, address: "TP.HCM"},
    { name: "Nguyễn Văn B", age: 2, address: "Hai Phong"},
    { name: "Nguyễn Văn A", age: 11, address: "Ha Noi"},
    { name: "Nguyễn Văn D", age: 6, address: "Ha Noi"},
    { name: "Nguyễn Văn E", age: 1, address: "Hai Duong"},
] 

console.log(createCustomers(customers));


/*
    Viết một hàm tạo (Constructor) để khởi tạo ra một đối tượng có 3 thuộc tính: name, password và email.

    Tạo một hàm register nhận vào nhiều tham số để khởi tạo ra một mảng chứa các đối tượng có cấu trúc như trên.

    Yêu cầu:

    Kiểm tra tất cả thông tin có đầy đủ không, nếu không đủ, báo lỗi và dừng chương trình.

    Nếu đăng ký thêm một lần nữa, phải trả về được thông tin 2 người.

    Tự động thêm role là user cho mỗi đối tượng.

    Tạo một hàm login nhận vào 2 tham số email và password.

    Yêu cầu:

    Nếu thông tin hợp lệ với một trong các đối tượng đã đăng ký, trả về thông tin của đối tượng đó.

    Nếu không, báo cho người dùng rằng “Thông tin đăng nhập không hợp lệ”.

    Input:

    const data = [];
    const dataRegister = handleRegister(
    "Nguyen Van A",
    "123456",
    "nguyenvana@email.com"
    );
    const dataRegister = handleRegister(
    "Nguyen Van B",
    "1234567",
    "nguyenvanb@email.com"
    );
    const dataLogin = handleLogin("Nguyen Van B", "1234567");
    Output:

    data = [
    {
        name: "Nguyen Van A",
        password: "123456",
        email: "nguyenvana@email.com",
        role: "user",
    },
    {
        name: "Nguyen Van B",
        password: "1234567",
        email: "nguyenvanb@email.com",
        role: "user",
    },
    ];
    dataLogin = {
    name: "Nguyen Van B",
    password: "1234567",
    email: "nguyenvanb@email.com",
    role: "user",
    };
*/

function Account (username, password, email) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.role = 'user';
}

const data = [];

var handleRegister = function (name, password, email) {
    if(!name || !password || !email) 
    {
        console.log("Thong tin đăng ký không đầy đủ");
        return;
    }
    
    var existEmail = data.some((account) => account.email === email);

    if(existEmail) {
        console.log('Email đã tồn tại');
        return;
    }

    const newUser = new Account(name, password, email);
    data.push(newUser);
    console.log('Tạo tài khoản thành công');
    return newUser;
}

var handleLogin = function (email, password) {
    const account = data.find((account) => account.email === email && account.password === password);
    
    if(!account) {
        console.log('Thông tin đăng nhập không hợp lệ');
        return;
    }

    console.log('Đăng nhập thành công', account);
    return account
}

const user1 = handleRegister(
    "Nguyen Van A",
    "123456",
    "nguyenvana@gmail.com"
);

const user2 = handleRegister(
    "Nguyen Van B",
    "1234567",
    "nguyenvanb@email.com"
);
  
console.log(data);

const dataLogin = handleLogin("nguyenvanb@email.com", "1234567");
