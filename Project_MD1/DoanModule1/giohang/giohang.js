const creatproduct = document.getElementById("creat-product");
const namepay = document.getElementById("name");
const address = document.getElementById("address");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const orderNotes = document.getElementById("order-notes");
const ordersummary = document.getElementsByClassName("order-summary");

const productoder = document.getElementById("product-oder");
const total = document.getElementById("total");
const totaldemo = document.getElementById("total-demo");

const pagination = document.getElementById("pagination-user")
//Hiển thi tài khoản người dùng
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
    if (userLogin) {
        const cart = userLogin.cart
        let totalProduct = cart.reduce(function (acc, cur) {

            return (acc += cur.quantity);
        }, 0);
        totalCart.innerHTML = totalProduct;
    } // cart.length// cho trường hợp in ra từng sp ko phải in ra tất
}
renderCart()

// Sự kiện onclick của nút tạo sản phẩm
creatproduct.onclick = function () {
    const namepayment = namepay.value.trim();
    //Lấy giá trị tên người nhận hàng
    const addresspayment = address.value.trim();
    //Lgt diachỉ
    const phonepayment = phone.value.trim();
    //Lgt phone
    const emailpayment = email.value.trim();
    //lay gia tri email

    if (!namepayment) {
        alert("Bạn vui lòng không để trống tên");
        return;
    }
    if (!addresspayment) {
        alert("Bạn vui lòng không để trống địa chỉ nhận hàng");
        return;
    }
    if (!phonepayment) {
        alert("Bạn vui lòng không để trống số điện thoại");
        return;
    }


    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const userLogin = JSON.parse(localStorage.getItem("user-login"));

    let id = 1;
    if (orders.length > 0) {
        id = orders[orders.length - 1].id + 1
    }
    //Tạo đối tuong mua hàng mới
    const newOrderItem = {
        id: id,
        userId: userLogin.id,
        name: namepayment,
        address: addresspayment,
        phone: phonepayment,
        email: emailpayment,
        note: orderNotes.value,
        date: new Date(),
        status: 0,
        cart: userLogin.cart,
        total: totalPrice
    }

    orders.push(newOrderItem)
    //Thêm đơn hàng mới vào ds đơn hàng
    userLogin.cart = []
    //Xóa giỏ hàng sau khi đặt hàng

    localStorage.setItem('orders', JSON.stringify(orders))
    //Lưu lại vào local orders
    localStorage.setItem('user-login', JSON.stringify(userLogin))
    //Lưu lại vào local user-login
    window.location.href = "../doan/Doan.html"
    //Điều hướng về trang chủ
};


//Hiển thị thông tin thanh toàn
function renderPayment() {
    const userLogin = JSON.parse(localStorage.getItem("user-login"));
    //Lấy thông tin từ local
    const dbproductms = JSON.parse(localStorage.getItem("product"));
    //lấy danh sách sp
    const cart = userLogin.cart;
    //lấy giỏ hàng
    totalPrice = 0;//Khởi tạo
    let Stringpayment = "";
    for (let i = 0; i < cart.length; i++) {

        const product = dbproductms.find((el) => el.id == cart[i].productId);
        //tìm sản phẩm theo ID
        totalPrice += product.price * cart[i].quantity;
        //Cộng dồn giá trị sản phẩm vào giá trị đơn hagf
        Stringpayment += `

            <div
              style="width: 100%; display: flex; justify-content: space-between;text-align: center"
            >
              <p>${product.productName}</p>
             <div style="text-align: center> <p ">${cart[i].quantity}</p> </div>
              <p> ${Number(product.price * cart[i].quantity).toLocaleString(
            "it-IT",
            { style: "currency", currency: "VND" }
        )}</p>
            </div>
        `;
    }

    productoder.innerHTML = Stringpayment;
    total.innerHTML = Number(totalPrice).toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
    totaldemo.innerHTML = Number(totalPrice).toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
}
renderPayment();
//Hiển thị thông tin thanh toán
