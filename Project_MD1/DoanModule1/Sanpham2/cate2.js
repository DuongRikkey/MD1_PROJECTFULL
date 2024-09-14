const textproduct = document.getElementsByClassName("total-product-cheap");
const searchbutton = document.getElementById("searchbutton")
const inputSearch = document.getElementById("inputSearch")
let filter1 = document.getElementById("filter1")
let litmain = document.getElementsByClassName("list-main")
console.log(filter1);
let chooseId = 0
function renderCategory() {
    let dbCategory = JSON.parse(localStorage.getItem("categories"))
    dbCategory.splice(0, 3)
    let dbproductms = JSON.parse(localStorage.getItem("product"))
    dbproductms = dbproductms.splice(12, 16)
    let string = ""
    for (i = 0; i < dbCategory.length; i++) {
        const listProduct = dbproductms.filter((el) => el.categoryId == dbCategory[i].id)


        string += `
     <main class="main-product"onclick="Clickcate(${dbCategory[i].id})" >
              <img
                style="height: 55px; width: 100px"
                src="../Image/fix.jpg"
                alt=""
              />
              <p>
                <a href="">
                  ${dbCategory[i].name} <br />
                  <span>${listProduct.length} product</span>
                </a>
              </p>
            </main>
    `
    } string +=
        `
      <main class="main-product" onclick="Clickcate(0)" >
          <img
            style="height: 55px; width: 100px"
            src="../Image/cate1.jpg"
            alt=""
          />
          <p>
            <a href="">
              Tất cả <br />
              <span>${dbproductms.length} product</span>
            </a>
          </p>
      </main> 
    `
    litmain[0].innerHTML = string

} renderCategory()



function Renderearphone() {
    let dbproductms = JSON.parse(localStorage.getItem("product")) || []
    dbproductms = dbproductms.splice(12, 16)
    dbproductms = dbproductms.filter((el) => el.productName.toLowerCase().includes(inpsearch.value.toLowerCase().trim()))
    let categories = JSON.parse(localStorage.getItem("categories"))
    if (chooseId != 0) {
        dbproductms = dbproductms.filter(el => el.categoryId == chooseId)
    }
    //    -------------------------
    switch (filter1.value) {
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

    let stringearphone = "";
    for (i = 0; i < dbproductms.length; i++) {
        stringearphone += `
              <div class="new-product">
                  <img
                    style="width: 195px; height: 197px"
                    class="img-product"
                    src="${dbproductms[i].image}"
                    alt=""
                  />
                  <div class="text-marshall-small">
                    <p class="cheap-ms">MARSHALL MAJOR V</p>
                    <p class="color-ms-cheap">${categories.find((el) => el.id == dbproductms[i].categoryId).name}</p>
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
                      <span class="bold-ms">${new Intl.NumberFormat("vi-VN", { style: "decimal" }).format(
            dbproductms[i].price
        )}VN</span>
                    </p>
                    <p>
                      <i class="fa-solid fa-circle"></i>
                    </p>
                    <p>
                      <button class="smart-ms" href="">
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
    textproduct[0].innerHTML = stringearphone;
}
Renderearphone()

searchbutton.onclick = function () {
    Renderearphone()
}


filter1.onchange = function () {
    Renderearphone()
}
function Clickcate(categoryId) {
    chooseId = categoryId
    Renderearphone()

}