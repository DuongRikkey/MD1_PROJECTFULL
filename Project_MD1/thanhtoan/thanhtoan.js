const card = document.getElementById("cart-total")
const totalmoney = document.getElementById("total-money")
const totalcurrent = document.getElementById("total-current")
const pay = document.getElementById("pay")
const btnChangePage = document.getElementById("btpayment")


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


function renderPayment() {
  const userLogin = JSON.parse(localStorage.getItem("user-login"))
  const dbproductms = JSON.parse(localStorage.getItem("product"))
  const cart = userLogin.cart
  let totalPrice = 0;
  let Stringpayment = ""
  for (let i = 0; i < cart.length; i++) {
    const product = dbproductms.find((el) => el.id == cart[i].productId)
    totalPrice += product.price * cart[i].quantity
    Stringpayment +=
      ` <div class="cart-item">
          <div class="item-info">
            <img
              src="${product.image
      }"
              alt="Marshall Emberton Diamond Jubilee - Black"
            />
            <div>
              <p>${product.productName}</p>
            </div>
          </div>
          <div class="item-price"> ${Number(product.price).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
      }</div>
          <div class="item-quantity">
            <button onclick="minusQuantity(${cart[i].productId})" >-</button>  
            <span>${cart[i].quantity}</span>
            <button onclick="plusQuantity(${cart[i].productId})" >+</button>
          </div>
          <div class="item-total"> ${Number(product.price * cart[i].quantity).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
      } đ</div>
        </div>
        
        `
  } card.innerHTML = Stringpayment
  totalmoney.innerHTML = Number(totalPrice).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
  totalcurrent.innerHTML = Number(totalPrice).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })

}
renderPayment()

function plusQuantity(productId) {
  //lây thông tin người dùng từ Local
  const userLogin = JSON.parse(localStorage.getItem('user-login'))
  //Cập nhật lại giỏ hàng
  const cart = userLogin.cart
  //Tùm chỉ số giò hàng dựa theo productID
  const index = cart.findIndex(el => el.productId == productId)
  //Tăng số lượng sản phẩm lên 1
  cart[index].quantity += 1
  //Cập nhật lại giỏ hàng
  userLogin.cart = cart
  //Lưu lại thông tin người dùng vào LocalStorage
  localStorage.setItem('user-login', JSON.stringify(userLogin))
  renderPayment()
}

function minusQuantity(productId) {
  const userLogin = JSON.parse(localStorage.getItem('user-login'))
  //Lấy thông tin đăng nhập từ LocalStorage
  const cart = userLogin.cart
  //Cập nhật lại giỏ hàng
  const index = cart.findIndex(el => el.productId == productId)
  //Tìm chỉ số sp thông qua productID

  if (cart[index].quantity == 1) {
    //Nếu sản phẩm bằng 1 xóa nó ra khỏi giỏ hàng
    cart.splice(index, 1)
    //cập nhật lại giỏ hàng
    userLogin.cart = cart
    //Cập nhật lại trên Local
    localStorage.setItem('user-login', JSON.stringify(userLogin))
    //Vẽ ra màn hình
    renderPayment()
    return
  }
  //nếu sp hơn hơn 1 giảm đi 1 sp
  cart[index].quantity -= 1
  //Cập nhật lại giỏi hàng
  userLogin.cart = cart
  //Đưa lên local
  localStorage.setItem('user-login', JSON.stringify(userLogin))
  //Cập nhập lại
  renderPayment()
}

function confirmDeletion() {
  // Hiển thị hộp thoại xác nhận
  const userconfirmed = confirm("Xác nhận thanh toán");

  if (userconfirmed) {
    // Người dùng nhấn "OK"
    console.log("Người dùng đã xác nhận mua hàng.");
    // Thực hiện hành động xóa ở đây
  } else {
    // Người dùng nhấn "Cancel"
    console.log("Người dùng đã hủy hành động mua hàng.");
    // Không làm gì cả hoặc thực hiện hành động khác ở đây
  }
}

pay.onclick = function () {
  if (totalCart.innerHTML <= 0) {

    window.location.href = "http://127.0.0.1:5500/admin/manage-category/category.html"
    renderPayment()
  }
}


btnChangePage.onclick = function () {
  const userLogin = JSON.parse(localStorage.getItem('user-login'))
  //Lấy thông tin đăng nhập từ LocalStorage
  if (userLogin.cart == 0) {
    alert("ban ko co san pham de mua")
    return;
  }

  window.location.href = ".././DoanModule1/giohang/giohang.html"
}