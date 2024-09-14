const textprodcut = document.getElementsByClassName("total-product-cheap");


const dbproductms = JSON.parse(localStorage.getItem("product"))
let search = document.getElementById("search")
let inpsearch = document.getElementById("inpsearch")
let filter = document.getElementById("filter")
const totalCart = document.getElementById("totalCart")

// const cart = JSON.parse(localStorage.getItem("cart")) || []


let listCategory = document.getElementById("list-category")

let categoryIdChoose = 0

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

function renderCategory() { // Để vẽ ra 4 cái sản phẩm đề mục đầu của category và 4 chủng loại như là ...
  let dbCategory = JSON.parse(localStorage.getItem("categories"));
  let dbproductms = JSON.parse(localStorage.getItem("product"));

  let stringHTML = ""
  for (let i = 0; i < dbCategory.length; i++) {
    // Trả về mảng với những phần tử có chỉ số categoryId và id trung nhau
    const listProduct = dbproductms.filter(el => el.categoryId == dbCategory[i].id)

    stringHTML +=
      `
      <main class="main-product" onclick="clickCategory(${dbCategory[i].id})" >
          <img
            style="height: 55px; width: 100px"
            src="../Image/cate1.jpg"
            alt=""
          />
          <p>
            <a>
              ${dbCategory[i].name} <br />
              <span>${listProduct.length} product</span>
            </a>
          </p>
      </main> 
    `
  }
  // Sau đó cộng chuỗi với stringHTML cho all
  stringHTML +=
    `
      <main class="main-product" onclick="clickCategory(0)" >
          <img
            style="height: 55px; width: 100px"
            src="../Image/cate1.jpg"
            alt=""
          />
          <p>
            <a>
              Tất cả <br />
              <span>${dbproductms.length} product</span>
            </a>
          </p>
      </main> 
    `

  listCategory.innerHTML = stringHTML


}
renderCategory()


function redermodal() {
  let dbproductms = JSON.parse(localStorage.getItem("product"));
  dbproductms = dbproductms.filter((el) => el.productName.toLowerCase().includes(inpsearch.value.trim().toLowerCase()))



  const categorydb = JSON.parse(localStorage.getItem("categories"))

  if (categoryIdChoose != 0) {
    dbproductms = dbproductms.filter(el => el.categoryId == categoryIdChoose)
  }


  switch (filter.value) {
    case '0':
      break;
    case '1':
      dbproductms = dbproductms.filter((el) => el.price >= 2000000 && el.price < 4000000)
      break;
    case '2':
      dbproductms = dbproductms.filter((el) => el.price >= 4000000 && el.price < 8000000)
      break;
    case '3':
      dbproductms = dbproductms.filter((el) => el.price >= 8000000 && el.price < 12000000)
      break;
    case '4':
      dbproductms = dbproductms.filter((el) => el.price >= 12000000 && el.price < 15000000)
      break;
    case '5':
      dbproductms = dbproductms.filter((el) => el.price >= 15000000)
      break;
  }


  let stringHTML = ""
  for (let i = 0; i < dbproductms.length; i++) {

    stringHTML += ` <div class="new-product" onclick="detailProduct(${dbproductms[i].id})">
                <img
                  style="width: 195px; height: 197px"
                  class="img-product"
                  src="${dbproductms[i].image}"
                  alt=""
                />
                <div class="text-marshall-small">
                  <p class="cheap-ms">${dbproductms[i].productName}</p>
                  <p class="color-ms-cheap">${categorydb.find(el => el.id == dbproductms[i].categoryId).name}</p>
                  <p class="Star-Yellow-Cheap">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                  </p>
                  <p style="font-size: 14px; font-weight: bold">
                    <i style="font-size: 15px" class="fa-solid fa-check"></i> 
                    ${dbproductms[i].inventory}
                  </p>
                  <p>
                    <span class="bold-ms">  ${new Intl.NumberFormat("vi-VN", { style: "decimal" }).format(
      dbproductms[i].price
    )}VNĐ     
                    </span>
                  </p>
                  <p  onclick = "addProduct(${dbproductms[i].id})">
                    <i class="fa-solid fa-circle"></i
                    ><i
                      style="padding: 5px; color: #af6349; font-size: 15px"
                      class="fa-solid fa-circle"
                    ></i>
                  </p>
                  <p>
                    <button class="smart-ms">
                      Lựa Chọn Các Tùy Chọn
                    </button>
                  </p>
                  <div class="infor-news-small">
                    <p class="black">-34%</p>
                  </div>
                </div>
              </div>
        `
  }

  textprodcut[0].innerHTML = stringHTML
  const textSelectElements = document.querySelectorAll('.smart-ms');
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


renderCart()




filter.onchange = function () {
  redermodal()
}
search.onclick = function () {
  redermodal()
}
function clickCategory(cate) {
  categoryIdChoose = cate
  redermodal()
}


function detailProduct(IDproduct) {
  localStorage.setItem("productId", JSON.stringify(IDproduct));
  window.location.href = "../../chitietsp/chitietsp.html"

}
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



// renderCart(): Hàm này cập nhật số lượng sản phẩm trong giỏ hàng.
// userLogin: Lấy thông tin người dùng từ localStorage.
// cart: Lấy giỏ hàng từ thông tin người dùng.
// // totalProduct: Tính tổng số lượng sản phẩm trong giỏ hàng.
// totalCart.innerHTML: Cập nhật số lượng sản phẩm trong giỏ hàng lên phần tử HTML có id "totalCart".



// renderCategory(): Hàm này hiển thị danh sách các danh mục sản phẩm.
// dbCategory: Lấy dữ liệu danh mục từ localStorage.
// dbproductms: Lấy dữ liệu sản phẩm từ localStorage.
// stringHTML: Tạo chuỗi HTML cho các danh mục sản phẩm.
// listProduct: Lọc sản phẩm theo mã danh mục.
// listCategory.innerHTML: Cập nhật nội dung HTML của phần tử danh mục.


// //redermodal(): Hàm này cập nhật nội dung sản phẩm hiển thị dựa trên tìm kiếm, lọc, và phân loại.
// dbproductms: Lọc sản phẩm theo tên sản phẩm và mã danh mục.
// switch (filter.value): Áp dụng bộ lọc giá sản phẩm.
// stringHTML: Tạo chuỗi HTML cho danh sách sản phẩm.
// textprodcut[0].innerHTML: Cập nhật nội dung sản phẩm hiển thị.
// textSelectElements.forEach: Thay đổi nội dung nút khi di chuột qua.

//Cuối cùng xử lý sự kiện