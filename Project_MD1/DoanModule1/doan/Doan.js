let user = document.getElementById("user")
let login = document.getElementsByClassName("login")
let body = document.getElementsByTagName("body")
let mark1 = document.getElementById("mark1")
let overlay = document.getElementsByClassName("overlay")
const soundmarshall = document.getElementsByClassName("sound-marshall");
const productcheap = document.getElementsByClassName("total-product-cheap");


const textselect = document.getElementById("text-select")
const textselectmain = document.getElementById("text-select-main")

const totalCart = document.getElementById("totalCart")

const cart = JSON.parse(localStorage.getItem("cart")) || []


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


const iploginemail = document.getElementById("iploginemail");
const iploginpass = document.getElementById("iploginpass")
user.onclick = function () {
  login[0].style.display = "block"
  overlay[0].style.display = "block"
}
mark1.onclick = function () {
  login[0].style.display = "none"
  overlay[0].style.display = "none"

}
overlay[0].onclick = function () {
  login[0].style.display = "none"
  overlay[0].style.display = "none"
}


let catedb = JSON.parse(localStorage.getItem("product"))
console.log(catedb);

function redermodal() {
  let catedb = JSON.parse(localStorage.getItem("product"));

  catedb = catedb.slice(0, 4)

  let stringHTML = ""
  for (let i = 0; i < catedb.length; i++) {
    stringHTML += ` <div class="list-marshall">
          <img
            style="width: 255px; height: 230px"
            src="${catedb[i].image
      }"
            alt=""
          />
          <div class="text-marshall">
            <p>${catedb[i].productName}</p></p>
            <p class="color-ms">TAI NGHE MARSHALL, IN-EAR</p>
            <p class="Star">
              <i class="fa-solid fa-star"" style="color: #eabf13;"></i>
              <i class="fa-solid fa-star"" style="color: #eabf13;" ></i>
              <i class="fa-solid fa-star"" style="color: #eabf13;" ></i>
              <i class="fa-solid fa-star"" style="color: #eabf13;" ></i>
              <i class="fa-solid fa-star"" style="color: #eabf13;" ></i>
            </p>
            <p><i class="fa-solid fa-check"></i> ${catedb[i].inventory}</p>
            <p style="font-weight: bold;" > ${new Intl.NumberFormat("vi-VN", { style: "decimal" }).format(
        catedb[i].price)} ₫</p>
            <p><i class="fa-solid fa-circle"></i></p>
            <p>
              <button id="text-select-main" >
                <a id="text-select"  class="text-select" style="color: white" href="">Lựa Chọn Các Tùy Chọn</a>
              </button>
            </p>
          </div>
          <div class="infor-news">
            <p class="green">NEW</p>
            <p class="red">HOT</p>
          </div>
        </div>
        `
  }
  soundmarshall[0].innerHTML = stringHTML


  const textSelectElements = document.querySelectorAll('.text-select');
  textSelectElements.forEach(element => {
    element.addEventListener('mouseover', function () {
      element.innerHTML = '<i class="fa-solid fa-cart-shopping"></i>';
    });
    element.addEventListener('mouseout', function () {
      element.textContent = 'Lựa Chọn Các Tùy Chọn';
    });
  });
}
redermodal()


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