const nameproduct = document.getElementById("name-product")
const imageid = document.getElementById("imageid")
const newprice = document.getElementById("newprice")
const totalCart = document.getElementById("totalCart")
const btnPlus = document.getElementById("btn-plus")
const btnMinus = document.getElementById("btn-minus")
const inputQuantity = document.getElementById("input-quantity")
const errorMessage = document.getElementById("error-message")
const btnAddToCart = document.getElementById("btn-add-to-cart")

function renderCart() {

    let userLogin = JSON.parse(localStorage.getItem("user-login"));
    const cart = userLogin.cart
    let totalProduct = cart.reduce(function (acc, cur) {
        return (acc += cur.quantity);
    }, 0);
    totalCart.innerHTML = totalProduct; //cart.length
} renderCart()


function renderDetails() {
    const dbProduct = JSON.parse(localStorage.getItem("product")) || []
    const productId = JSON.parse(localStorage.getItem("productId"))


    const product = dbProduct.find(el => el.id == productId)

    nameproduct.innerHTML = product.productName
    imageid.src = product.image
    newprice.innerHTML = Number(product.price).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
}
renderDetails()

btnMinus.addEventListener('click', function () {
    if (+inputQuantity.value > 1) {
        inputQuantity.value = +inputQuantity.value - 1
    }
})

btnPlus.addEventListener('click', function () {
    //Phải đi từ 0
    if (+inputQuantity.value > 1) {
        inputQuantity.value = +inputQuantity.value + 1
    }
})

btnAddToCart.addEventListener('click', function () {

    const userLogin = JSON.parse(localStorage.getItem("user-login"))
    if (!userLogin) {
        alert("Ban chua dang nhap de mua hang")
        return
    }

    if (inputQuantity.value <= 0) {
        errorMessage.innerHTML = "Không hợp lệ xin vui lòng nhập lại"
    }
    else {
        errorMessage.innerHTML = ""
    }

    const cart = userLogin.cart
    const productId = JSON.parse(localStorage.getItem("productId"))

    const index = cart.findIndex(el => el.productId == productId)

    if (index === -1) {
        cart.push({
            productId: productId,
            quantity: +inputQuantity.value
        })
        userLogin.cart = cart
        localStorage.setItem("user-login", JSON.stringify(userLogin))
    } else {
        cart[index].quantity += +inputQuantity.value
        userLogin.cart = cart
        localStorage.setItem("user-login", JSON.stringify(userLogin))
    }

    const count = cart.reduce((total, item) => {
        return total += item.quantity
    }, 0)
    totalCart.innerHTML = count



    // const count = cart.length
    // totalCart.innerHTML = count
    // alert("Thanhf cong")

})

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