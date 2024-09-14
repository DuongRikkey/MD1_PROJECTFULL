const listcategory = document.getElementsByClassName("list-category");
const btnSearch = document.getElementById("btn-search");
const inputSearch = document.getElementById("input-search");
let overlay = document.getElementById("overlay");
let newproduct = document.getElementById("newproduct");
let createbtn = document.getElementsByClassName("create-btn");
let cancel = document.getElementById("cancel");
let creat = document.getElementById("crate");
let listproduct = document.getElementsByClassName("list-product");
let filterCategory = document.getElementById("filter-category");
let filterPrice = document.getElementById("filter-price");
let paginationProduct = document.getElementById("pagination-product");
let error = document.getElementById("error");

let idUpdateGlobal = "add";
let idUd = 0;
let imageBase64 = null //b1image

const nameiput = document.getElementById("nameiput")
const priceinput = document.getElementById("priceinput")
const inventoryinput = document.getElementById("inventoryinput")
const inputcate = document.getElementById("inputcate")
const inputimg = document.getElementById("inputimg")
const listnewp = document.getElementById("list-newp")
const smart = document.getElementsByClassName("category-smart")
//Phan trang
let totalPage = 1
let curentPage = 1
let pagesize = 5
//End
// btnSearch.onclick=function(){
//     const dbCategory=localStorage.getItem("")
// }
createbtn[0].onclick = function () {
    overlay.style.display = "block"
    newproduct.style.display = "block"
}
cancel.onclick = function () {
    overlay.style.display = "none"
    newproduct.style.display = "none"
}

// createbtn[0].onclick = function(){

// }
let stringproduct = "";
function renderProduct() {
    const dbrenderProduct = JSON.parse(localStorage.getItem("categories"));
    for (i = 0; i < dbrenderProduct.length; i++) {
        stringproduct +=
            ` <option value=${dbrenderProduct[i].id}>${dbrenderProduct[i].name}</option >`
    }
    listproduct[0].innerHTML = stringproduct;

    // filterCategory.innerHTML = `<option value="0">Tất cả</option>` + stringproduct // Lọc category từ select
    filterCategory.innerHTML = `<option value="0">Tất cả</option> ` + stringproduct

}
renderProduct()

//Thêm ảnh
function encodeImageFileAsURL(element) {
    const file = element.files[0];
    const reader = new FileReader();

    reader.onloadend = function () {
        document.getElementById('image-product').src = reader.result //B2
        imageBase64 = reader.result //B2 imgage
    }

    reader.readAsDataURL(file);
}


creat.onclick = function () {
    const nameproduct = nameiput.value.trim()
    const productdb = JSON.parse(localStorage.getItem("product")) || []

    if (!nameproduct) {
        error.innerHTML = "Không được để trống"
        error.style.color = "red"
        return;

    }
    const vitri = productdb.findIndex((element) => {
        return element.productName.toLowerCase() === nameproduct.toLowerCase()
    })


    if (vitri !== -1 && productdb[vitri].id !== idUd) {
        console.log(vitri !== -1 && productdb[vitri].id !== idUd);

        return;
    }

    let id = 1;
    if (productdb.length > 0) {
        id = productdb[productdb.length - 1].id + 1
    }
    if (idUpdateGlobal == "add") {
        const smart = {
            id: id,
            productName: nameiput.value,
            image: imageBase64,  //b3 image
            price: +priceinput.value,
            categoryId: +inputcate.value,
            inventory: +inventoryinput.value
        };
        productdb.push(smart)
        localStorage.setItem("product", JSON.stringify(productdb));
        imageBase64 = null
        overlay.style.display = "none";
        newproduct.style.display = "none";


    } else {
        let idUpdateGlobalindex = productdb.findIndex(e => e.id === idUd)
        productdb[idUpdateGlobalindex].productName = nameiput.value;
        productdb[idUpdateGlobalindex].price = priceinput.value;
        localStorage.setItem("product", JSON.stringify(productdb))
        nameiput.value = ""
        priceinput.value = ""
        document.getElementById("nameiput").value = "";
        document.getElementById("priceinput").value = "";
        document.getElementById("inventoryinput").value = "";
        document.getElementById("inputcate").value = "";
        document.getElementById("inputimg").value = "";
        overlay.style.display = "none";
        newproduct.style.display = "none";
        idUpdateGlobal = "add";
        imageBase64 = null //b4 image
    }

    renderSkills();
}
//xong
function renderSkills() {
    let productdb = JSON.parse(localStorage.getItem("product")) || []
    const categorydb = JSON.parse(localStorage.getItem("categories")) || []

    // productdb = productdb.filter((el) => el.productName.toLowerCase().includes(inputSearch.value.trim().toLowerCase()))

    productdb = productdb.filter((el) => el.productName.toLowerCase().includes(inputSearch.value.toLowerCase().trim()))


    // Đây là tìm cate theo cate gốc
    if (+filterCategory.value !== 0) {
        productdb = productdb.filter((el) => el.categoryId === +filterCategory.value)
    }
    // if (+filterCategory.value !== 0) {
    //     productdb = productdb.filter((el) => el.categoryId === +filterCategory.value)
    // }

    switch (filterPrice.value) {
        case '0':
            break;
        case '1':
            productdb = productdb.filter((el) => el.price >= 2000000 && el.price < 4000000)
            break;
        case '2':
            productdb = productdb.filter((el) => el.price >= 4000000 && el.price < 8000000)
            break;
        case '3':
            productdb = productdb.filter((el) => el.price >= 8000000 && el.price < 12000000)
            break;
        case '4':
            productdb = productdb.filter((el) => el.price >= 12000000 && el.price < 15000000)
            break;
        case '5':
            productdb = productdb.filter((el) => el.price >= 15000000)
            break;
    }

    switch (filterPrice.value) {
        case '0':
            break;
        case '1':
            productdb = productdb.filter((el) => el.price >= 20000000 && el.price <= 11111111111)
            break;
        case '2':
            productdb = productdb.filter((el) => el.price >= 100000 && el.price <= 90000000)



    }

    let start = (curentPage - 1) * pagesize
    let end = start + pagesize

    productdb = productdb.slice(start, end)

    // switch (sortall.value) {
    //     case `bandau`:
    //         break;
    //     case `tangdan`:
    //         productdb.sort((a, b) => a.productName.localeCompare(b.productName));
    //         break;
    //     case `giamdan`:
    //         productdb.sort((a, b) => b.productName.localeCompare(a.productName))
    //         break;
    // }


    let stringHTML = "";
    for (let i = 0; i < productdb.length; i++) {
        console.log(`${categorydb.find(el => el.id == productdb[i].categoryId).name}`);
        stringHTML += `
            <tr >
                <td>${i + 1}</td>
                <td>
                    <img width="100px" src="${productdb[i].image}" />
                </td>
                <td>${productdb[i].productName}</td></td>
                <td>${Number(productdb[i].price).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</td>
                <td>${categorydb.find(el => el.id == productdb[i].categoryId).name}</td>
                <td>${categorydb.find(el => el.id === productdb[i].categoryId).name}</td>
                <td>${productdb[i].inventory}</td>

                <td class="actions">
                    <button onclick="enterEdit(${productdb[i].id})" type="button" class="update-btn">Update</button>
                    <button onclick="deletecategory(${productdb[i].id})"  type="button" class="delete-btn">Delete</button>
                </td >
            </tr >
        `;

    }
    listcategory[0].innerHTML = stringHTML;

    renderPagination()
}
renderSkills();


function deletecategory(idDelete) {
    if (confirm("Bạn có chắc xóa hay không")) {
        const productdb = JSON.parse(localStorage.getItem("product")) || []
        let vitri = productdb.findIndex(element => element.id == idDelete)
        productdb.splice(vitri, 1)
        localStorage.setItem("product", JSON.stringify(productdb))
        renderSkills();
    }
}
function enterEdit(idcanedit) {
    const productdb = JSON.parse(localStorage.getItem("product")) || []
    let giatri = productdb.find(function (element) {
        return element.id === idcanedit;
    })
    nameiput.value = giatri.productName;
    priceinput.value = giatri.price
    idUd = idcanedit;
    idUpdateGlobal = "update"
    overlay.style.display = "block";
    newproduct.style.display = "block";
}
btnSearch.onclick = function () {
    renderSkills()
}
// em mở cái file này lên
// wtf sao id toàn = 1 thế này, tham số trong cái enterEdit của em toàn là 1. Em thấy k
// em render ra sai r. Đoạn render ra của em đâu
//Render ra cai Edit ha anh?
// render ra toàn bộ sản phẩm

filterPrice.onchange = function () {
    renderSkills()
}

filterCategory.onchange = function () {
    renderSkills()
}
sortall.onchange = function () {
    renderSkills()
}
//Phan trang
function renderPagination() {
    let productdb = JSON.parse(localStorage.getItem("product")) || []

    totalPage = Math.ceil(productdb.length / pagesize)

    let stringHTML = ""

    stringHTML += `<a class="page-button" onclick="clickPage('prev')" >&lt;</a>`;

    for (let i = 1; i <= totalPage; i++) {
        stringHTML += `<a onclick="changePage(${i})" class="page-button ${curentPage == i ? "blackpink" : ""}" id="${i}">${i}</a>`
    }

    stringHTML += `<a class="page-button" onclick="clickPage('next')" >&gt;</a>`;

    paginationProduct.innerHTML = stringHTML
}

function changePage(i) {
    curentPage = i
    renderSkills()
}

function clickPage(status) {
    if (status == "prev") {
        if (curentPage > 1) {
            curentPage--
        }
    } else {
        if (curentPage < totalPage) {
            curentPage++
        }
    }
    renderSkills()
}
//Phan trang