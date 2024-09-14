let btn = document.getElementById("btn");
console.log(btn);
let test1 = document.getElementById("test1");
let test2 = document.getElementById("test2");
let clickCount = 0; // Biến đếm số lần click

const inputname = document.getElementById("inputname");
const inputemail = document.getElementById("inputemail");
const inputphone = document.getElementById("inputphone");
const inputpass = document.getElementById("inputpass");
const inputpassconfirm = document.getElementById("inputpassconfirm");
const register = document.getElementById("register");
const login = document.getElementById("login");


let registerdb = JSON.parse(localStorage.getItem("register"));
let error1 = document.getElementById("error1");
let error2 = document.getElementById("error21");
let error3 = document.getElementById("error3");
let error4 = document.getElementById("error4");
let error5 = document.getElementById("error5");

let iploginemail = document.getElementById("iploginemail");
let iploginpass = document.getElementById("iploginpass");

// function renderCart() {

//     let userLogin = JSON.parse(localStorage.getItem("user-login"));
//     const cart = userLogin.cart
//     let totalProduct = cart.reduce(function (acc, cur) {
//         return (acc += cur.quantity);
//     }, 0);
//     totalCart.innerHTML = totalProduct;
// }
// renderCart()

btn.onclick = function () {
    if (clickCount % 2 === 0) {
        // Lần click chẵn (0, 2, 4,...): Hiển thị nội dung "Đăng ký"
        btn.innerHTML = "Đăng nhập";
        test1.style.display = "none";
        test2.style.display = "block";

        // Có thể thay đổi nội dung của test1, test2 tại đây nếu
    } else {
        // Lần click lẻ (1, 3, 5,...): Hiển thị lại nội dung ban đầu của button
        btn.innerHTML = "Đăng ký";
        test1.style.display = "block";
        test2.style.display = "none"; // Thay đổi thành nội dung
    }

    clickCount++; // Tăng biến đếm lên sau mỗi lần click
};

register.onclick = function () {
    let registerdb = JSON.parse(localStorage.getItem("users")) || []; // Trường hợp local storage chưa có dữ liệu

    const registername = inputname.value.trim();
    const registeremail = inputemail.value.trim();
    const registerphone = inputphone.value.trim();
    const registerpass = inputpass.value.trim();
    const registerpassconfirm = inputpassconfirm.value.trim();

    // Kiểm tra điều kiện nhập các trường thông tin
    let errorOccurred = false;

    if (!registername) {
        error1.innerHTML = "Mời bạn nhập lại không được để trống!";
        error1.style.color = "red";
        errorOccurred = true;
    } else {
        error1.innerHTML = "";
    }


    if (!registeremail) {

        error2.innerHTML = "Email chua nhap";
        error2.style.color = "red";
        errorOccurred = true;
    } else {
        error2.innerHTML = "";
    }

    const index = registerdb.findIndex((el) => el.email == registeremail);
    const indexphone = registerdb.findIndex((el) => el.phone == registerphone)
    console.log(registerdb.findIndex((el) => el.phone = registerphone));


    if (index !== -1) {
        error2.innerHTML = "Email bi trung!";
        error2.style.color = "red";
        errorOccurred = true;
    } else {
        error2.innerHTML = "";
    }


    if (!registerphone) {
        error3.innerHTML = "Mời bạn nhập lại không được để trống!";
        error3.style.color = "red";
        errorOccurred = true;
    } else if (registerphone.length !== 10) {
        error3.innerHTML = "Số điện thoại không chính xác";
        error3.style.color = "red";
        errorOccurred = true;
    }
    else {
        error3.innerHTML = ""

    }

    // Tìm vị trí trùng phải sau nhé
    if (indexphone !== -1) {
        error3.innerHTML = "Số điện thoại đã trùng lặp";
        errorOccurred = true;
    }
    else {
        error3.innerHTML = "";
    }
    if (!registerpass) {
        error4.innerHTML = "Mời bạn nhập lại không được để trống!";
        error4.style.color = "red";
        errorOccurred = true;
    } else if (registerpass.length <= 6) {
        error4.innerHTML = "Mật khẩu phải có ít nhất 6 ký tự";
        error4.style.color = "red";
        errorOccurred = true;
    } else {
        error4.innerHTML = "";
    }

    if (!registerpassconfirm) {
        error5.innerHTML = "Mời bạn nhập lại không được để trống!";
        error5.style.color = "red";
        errorOccurred = true;
    } else if (registerpass !== registerpassconfirm) {
        error5.innerHTML = "";
        alert("Mật khẩu không khớp")
        error5.style.color = "red";
        errorOccurred = true;
    } else {
        error5.innerHTML = "";
    }

    if (errorOccurred) {
        return;
    }

    if (!document.getElementById("terms").checked) {
        alert("Tich chon");
        return;
    }


    let id = 1;
    if (registerdb.length > 0) {
        id = registerdb[registerdb.length - 1].id + 1;
    }
    const Total = {
        id: id,
        fullname: registername,
        phone: registerphone,
        email: registeremail,
        password: registerpass,
        role: 0,
        status: true,
        cart: [],
    }
    registerdb.push(Total);
    localStorage.setItem("users", JSON.stringify(registerdb))

    inputname.value = "";
    inputemail.value = "";
    inputphone.value = "";
    inputpass.value = "";
    inputpassconfirm.value = "";
    error1.innerHTML = "";
    error2.innerHTML = "";
    error3.innerHTML = "";
    error4.innerHTML = "";
    error5.innerHTML = "";
    document.getElementById("terms").checked = false;


    alert("Đăng ký thành công!");
    btn.innerHTML = "Đăng Ký";
    test1.style.display = "block";
    test2.style.display = "none";

};





login.onclick = function () {
    let dbUsers = JSON.parse(localStorage.getItem("users")) || [];

    const account = {
        email: iploginemail.value,
        password: iploginpass.value,
    };
    //tìm vị trí email xem có khớp trong dữ liệu ko
    const userFind = dbUsers.find((el) => el.email == account.email);
    //const useFind= dbUsers.fin((el) => el.mail== account.email);

    console.log(userFind);

    if (!userFind) {
        alert("Thong tin sai");
        return;
    }


    if (userFind.password !== account.password) {
        console.log(userFind.password, account.password);
        alert("Thong tin sai");
        return;
    }


    if (!userFind.status) {
        alert("Tk bi khoa")
        return
    }

    if (userFind.role == 0) {
        localStorage.setItem("user-login", JSON.stringify(userFind));
        alert("Thành công")
        window.location.href = "../DoanModule1/doan/Doan.html"
    } else {
        localStorage.setItem("admin-login", JSON.stringify(userFind));
        window.location.href = "../admin/manage-user/user.html"
    }

};

function renderAccount() {
    const userLogin = JSON.parse(localStorage.getItem('user-login'))
    if (userLogin) {
        document.getElementById('text-name-account').innerHTML = userLogin.fullname

        document.getElementById('btn-logout').style.display = "block"
    } else {
        document.getElementById('text-name-account').innerHTML = `<button  > <a style="color: black" href="../../LoginRegister/Register.html">Login</a> </button>`
        document.getElementById('btn-logout').style.display = "none"
    }
}
renderAccount()

document.getElementById('btn-logout').onclick = function () {
    localStorage.removeItem('user-login')
    renderAccount()
}
function renderCart() {

    let userLogin = JSON.parse(localStorage.getItem("user-login"));
    const cart = userLogin.cart
    let totalProduct = cart.reduce(function (acc, cur) {
        return (acc += cur.quantity);
    }, 0);
    totalCart.innerHTML = totalProduct;
}
renderCart()