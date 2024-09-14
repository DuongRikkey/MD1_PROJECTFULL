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
//Chế độ thêm mới hoặc cập nhật sản phẩm
let idUd = 0;
// ID sản phẩm hiện tại cập nhật
let imageBase64 = null //b1image
//Biến lưu trữ ảnh sản phẩm dưới dạng Base 64
const nameiput = document.getElementById("nameiput")
const priceinput = document.getElementById("priceinput")
const inventoryinput = document.getElementById("inventoryinput")
const inputcate = document.getElementById("inputcate")
const inputimg = document.getElementById("inputimg")
const listnewp = document.getElementById("list-newp")
const smart = document.getElementsByClassName("category-smart")
const img = document.getElementById("image-product");
const texth2 = document.getElementById("texth2");
//Phan trang
let totalPage = 1
let curentPage = 1
let pagesize = 5
//End
// btnSearch.onclick=function(){
//     const dbCategory=localStorage.getItem("")
// }
//Mở đóng Form nhập liệu
createbtn[0].onclick = function () {
    nameiput.value = ""
    priceinput.value = ""
    document.getElementById("nameiput").value = "";
    document.getElementById("priceinput").value = "";
    document.getElementById("inventoryinput").value = "";
    document.getElementById("inputcate").value = "";
    document.getElementById("inputimg").src = "";
    img.src = "";
    overlay.style.display = "block"
    //Hiển thị overlay
    newproduct.style.display = "block"
    texth2.innerHTML = "Creat New Product"
    //Hiển thị form thêm sản phẩm
}
cancel.onclick = function () {
    overlay.style.display = "none"
    // An
    newproduct.style.display = "none"

}



let stringproduct = "";
//Biến lưu trữ danh sách danh mục sản phẩm
function renderProduct() {
    const dbrenderProduct = JSON.parse(localStorage.getItem("categories"));
    //Lấy danh mục từ Local
    for (i = 0; i < dbrenderProduct.length; i++) {
        stringproduct +=
            ` <option value=${dbrenderProduct[i].id}>${dbrenderProduct[i].name}</option >`
    }
    listproduct[0].innerHTML = stringproduct;
    //Hiển thị danh mục sản phẩm

    // filterCategory.innerHTML = `<option value="0">Tất cả</option>` + stringproduct // Lọc category từ select
    filterCategory.innerHTML = `<option value="0">Tất cả</option> ` + stringproduct

}
renderProduct()
//Gọi hàm renđer danh mục sản pẩm

//Thêm ảnh
function encodeImageFileAsURL(element) {
    const file = element.files[0]; //Lấy file từ input
    const reader = new FileReader(); //tạo đối tượng filereader

    reader.onloadend = function () {
        document.getElementById('image-product').src = reader.result //B2
        imageBase64 = reader.result //B2 imgage //Lưu ảnh dưới dạng base64
    }

    reader.readAsDataURL(file); // Đọc file dưới dạng Data Url
}

//Thêm hoặc cập nhật sản phẩm
creat.onclick = function () {
    const nameproduct = nameiput.value.trim()
    const nameprice = priceinput.value.trim()
    //lấy sản phẩm từ ô input từ bỏ khoảng trống
    const productdb = JSON.parse(localStorage.getItem("product")) || []
    //lấy sản phẩm từ Localstorage

    //Kiểm tra nếu tên sản phẩm trống

    // if (nameprice <= 0) {
    //     alert("ko thỏa mãn")
    //     return;
    // }

    if (!nameproduct) {
        error.innerHTML = "Không được để trống" //Hiển thị thông báo lỗi
        error.style.color = "red" //Đổi màu chữ lỗi
        return;

    }
    //KiỂM TRA SẢN PHẨM ĐÃ TỒN TẠI CHƯA
    const vitri = productdb.findIndex((element) => {
        return element.productName.toLowerCase() === nameproduct.toLowerCase()
    })


    if (vitri !== -1 && productdb[vitri].id !== idUd) {
        alert("Đã trùng tên")

        return;//Nếu đã sản phẩm đã tồn tại và không phải sản phẩm hiện tại
    }

    let id = 1;//ID mặc định
    if (productdb.length > 0) {
        id = productdb[productdb.length - 1].id + 1
        //Tạo ID mới cho sản phẩm
    }
    if (idUpdateGlobal == "add") {
        //Thêm sản phẩm mới
        const smart = {
            id: id,
            productName: nameiput.value,
            image: imageBase64,  //b3 image
            price: +priceinput.value,
            categoryId: +inputcate.value,
            inventory: inventoryinput.value
        };
        productdb.push(smart) // Thêm sản phẩm vào danh sách
        localStorage.setItem("product", JSON.stringify(productdb));
        //Lưu danh sách sản phẩm vào local
        imageBase64 = null //Xóa ánh
        overlay.style.display = "none"; //Ân overlay
        newproduct.style.display = "none";//An form theo sản phẩm


    } else {
        //Cập nhật sản phẩm hiện tại
        let idUpdateGlobalindex = productdb.findIndex(e => e.id === idUd)
        productdb[idUpdateGlobalindex].productName = nameiput.value;
        productdb[idUpdateGlobalindex].price = priceinput.value;
        productdb[idUpdateGlobalindex].categoryId = inputcate.value;
        productdb[idUpdateGlobalindex].image = imageBase64;
        productdb[idUpdateGlobalindex].inventory = inventoryinput.value;
        localStorage.setItem("product", JSON.stringify(productdb))
        //Lưu danh sách và cập nhật Localstorage

        document.getElementById("nameiput").value = "";
        document.getElementById("priceinput").value = "";
        document.getElementById("inventoryinput").value = "";
        document.getElementById("inputcate").value = "";
        document.getElementById("inputimg").src = "";
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
    //Lấy danh sách sp từ local Storage
    const categorydb = JSON.parse(localStorage.getItem("categories")) || []
    //Lấy danh mục phẩm từ local
    productdb = productdb.filter((el) => el.productName.toLowerCase().includes(inputSearch.value.trim().toLowerCase()))
    // lOc tên từ Input xem trùng khônng

    // phân loại loa theo ID truyền vào từ category
    //Lọc theo danh mục

    if (+filterCategory.value !== 0) {
        productdb = productdb.filter((el) => el.categoryId == +filterCategory.value)
    }

    //Lọc theo giá
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


    let start = (curentPage - 1) * pagesize
    let end = start + pagesize

    productdb = productdb.slice(start, end)
    // tăng dần giảm dần theo name
    switch (sortall.value) {
        case `bandau`:
            break;
        case `tangdan`:
            productdb.sort((a, b) => a.productName.localeCompare(b.productName));
            break;
        case `giamdan`:
            productdb.sort((a, b) => b.productName.localeCompare(a.productName))
            break;
    }


    let stringHTML = "";
    for (let i = 0; i < productdb.length; i++) {
        stringHTML += `
            <tr >
                <td>${productdb[i].id}</td>
                <td>
                    <img width="100px" src="${productdb[i].image}" />
                </td>
                <td>${productdb[i].productName}</td></td>
                <td>${Number(productdb[i].price).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</td>
                <td>${categorydb.find(el => el.id == productdb[i].categoryId)?.name}</td>
                
                
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
    inputcate.value = giatri.categoryId
    document.getElementById('image-product').src = giatri.image
    inventoryinput.value = giatri.inventory

    idUd = idcanedit;
    idUpdateGlobal = "update"
    overlay.style.display = "block";
    newproduct.style.display = "block";
    renderSkills();


    texth2.innerHTML = "Update"
    return;
}
btnSearch.onclick = function () {
    // Thực hiện tìm kiếm sản phẩm

    // Lọc danh sách sản phẩm dựa trên tìm kiếm
    let productdb = JSON.parse(localStorage.getItem("product")) || [];
    // productdb = productdb.filter((el) => el.productName.toLowerCase().includes(inputSearch.value.trim().toLowerCase()))

    // Cập nhật pagesize dựa trên số lượng sản phẩm tìm được
    // Ví dụ: nếu có ít hơn 5 sản phẩm, hiển thị tất cả trong một trang
    if (productdb.length < 5) {
        pagesize = productdb.length;
    } else {
        pagesize = 5; // Đặt giá trị mặc định của pagesize
    }

    // Gọi hàm để hiển thị sản phẩm với pagesize mới
    renderSkills();
}


filterPrice.onchange = function () {
    let productdb = JSON.parse(localStorage.getItem("product")) || [];
    // productdb = productdb.filter((el) => el.productName.toLowerCase().includes(inputSearch.value.trim().toLowerCase()))

    // Cập nhật pagesize dựa trên số lượng sản phẩm tìm được
    // Ví dụ: nếu có ít hơn 5 sản phẩm, hiển thị tất cả trong một trang
    if (productdb.length < 5) {
        pagesize = productdb.length;
    } else {
        pagesize = 3; // Đặt giá trị mặc định của pagesize
    }

    renderSkills()
}

filterCategory.onchange = function () {
    let productdb = JSON.parse(localStorage.getItem("product")) || [];
    if (+filterCategory.value !== 0) {
        productdb = productdb.filter((el) => el.categoryId == +filterCategory.value)
    }

    // Cập nhật pagesize dựa trên số lượng sản phẩm tìm được
    // Ví dụ: nếu có ít hơn 5 sản phẩm, hiển thị tất cả trong một trang
    curentPage = 1; // Reset to first page
    renderSkills()
}
sortall.onchange = function () {
    if (productdb.length < 5) {
        pagesize = productdb.length;
    } else {
        pagesize = 3; // Đặt giá trị mặc định của pagesize
    }

    renderSkills()
}
//Phan trang
function renderPagination() {
    let productdb = JSON.parse(localStorage.getItem("product")) || []
    productdb = productdb.filter((el) => el.productName.toLowerCase().includes(inputSearch.value.trim().toLowerCase()))
    totalPage = Math.ceil(productdb.length / pagesize)

    let stringHTML = ""

    stringHTML += `<a class="page-button" onclick="clickPage('prev')" >&lt;</a>`;

    for (let i = 1; i <= totalPage; i++) {
        stringHTML += `<a onclick="changePage(${i})" class="page-button ${curentPage == i ? "blackpink" : ""}" >${i}</a>`
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
function renderAccount() {
    const userLogin = JSON.parse(localStorage.getItem("admin-login"))
    if (userLogin) {
        document.getElementById("login").innerHTML = userLogin.fullname
        document.getElementById("btn-logout").style.display = "block"
        // welcome.innerHTML = "Chào mừng bạn đã quay trở lại !!!"
        // welcome.style.fontSize = "15px"
    }
    else {
        document.getElementById("login").innerHTML = `<button> <a href="../../LoginRegister/Register.html">Login</a> </button>`
        document.getElementById("btn-logout").style.display = "none"
        // welcome.innerHTML = ""
    }
}
renderAccount()
//Đăng xuất

document.getElementById("btn-logout").onclick = function () {
    localStorage.removeItem("admin-login")
    renderAccount()
    // welcome.innerHTML = ""
}