const listoder = JSON.parse(localStorage.getItem("orders"))
const listcategory = document.getElementById("list-category")
const searchuser = document.getElementById("searchuser")
const buttonsearch = document.getElementById("search")
const pagination = document.getElementById("pagination-user")



let pagesize = 5
let curentPage = 1
let totalPage = 1

//Hiển thị danh sách đơn hàng
function renderListoder() {

//Lấy danh sách đơn hàng từ Local
    let listoder = JSON.parse(localStorage.getItem("orders")) || []
    //lọc danh sách dự theo ô tìm kiếm
    listoder = listoder.filter((el) => el.name.toLowerCase().trim().includes(searchuser.value.trim().toLowerCase()))
    switch (sortall.value) {
        case "bandau":
            break;
        case "tangdan":
            listoder.sort((a, b) => a.name.localeCompare(b.name));
            //Sắp xếp tăng dần
            break;
        case "giamdan":
            listoder.sort((a, b) => b.name.localeCompare(a.name));
            // Sắp xếp giảm dân
            break;

    }
    let start = (curentPage - 1) * pagesize
    let end = start + pagesize
    listoder = listoder.slice(start, end)

    let string = ""
    for (i = 0; i < listoder.length; i++) {
        string += `
         <tr>
    
            <td>${listoder[i].userId}</td>
            <td>${listoder[i].name}</td>
            <td>${listoder[i].address}</td>
            <td>${listoder[i].phone}</td>
            <td>${listoder[i].email}</td>
            <td>${listoder[i].note}</td>
            <td>${listoder[i].date}</td>
            <td>${listoder[i].status == 0 ? "Mới đặt" : listoder[i].status == 1 ? "Đồng ý" : "Hủy"}</td>
        
            <td>   ${Number(listoder[i].total).toLocaleString(
            "it-IT",
            { style: "currency", currency: "VND" }
        )}</td>
           <td>
            <button onclick="DetailsProduct(${listoder[i].id})">Details</button>
            <td>
            <button style="display: ${listoder[i].status == 0 ? "" : "none"};" onclick="updateStatus(${listoder[i].id}, 1)" >Chấp nhận</button>
            <button style="display: ${listoder[i].status == 0 ? "" : "none"};" onclick="updateStatus(${listoder[i].id}, 2)" >Từ chối</button>
            </td>
        </tr>
        `
    } listcategory.innerHTML = string

    //Hiển thi phân trang
    renderPagination()
}
renderListoder()
//Gọi hàm để hiển thi danh sách đơn hàng ngay khi được tải
 

//Hàm cập nhật trạng thái đơn hàng
function updateStatus(orderId, status) {
    const listoder = JSON.parse(localStorage.getItem("orders")) || []
//Tìm chỉ số cần cập nhập
    const index = listoder.findIndex(el => el.id == orderId)
// cập nhập trạng thái
    listoder[index].status = status
    //Đưa lên Local
    localStorage.setItem('orders', JSON.stringify(listoder))
    renderListoder()
}
//Sự kiện thay đổi lựa chọn sắp xếp
sortall.onchange = function () {
    renderListoder()
    //Hiển thị lại danh sách đơn hàng khi sắp xếp

}

// sự kiện tìm kiếm
buttonsearch.onclick = function () {
    renderListoder()
    //hiện thị đơn hàng khi nhấn tìm tìm
}

//Phân trang
function renderPagination() {
    let listoder = JSON.parse(localStorage.getItem("orders")) || []
    totalPage = Math.ceil(listoder.length / pagesize)
    let stringHTML = ""

    stringHTML += `<a class="page-button" onclick="clickPage('prev')" >&lt;</a>`;

    for (let i = 1; i <= totalPage; i++) {
        stringHTML += `<a onclick="changePage(${i})" class="page-button ${curentPage == i ? "blackpink" : ""}" id="${i}">${i}</a>`
    }

    stringHTML += `<a class="page-button" onclick="clickPage('next')" >&gt;</a>`;
    pagination.innerHTML = stringHTML
}
function changePage(i) {
    curentPage = i
    renderListoder()
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
    renderListoder()
}




function renderAccount() {
    const userLogin = JSON.parse(localStorage.getItem("admin-login"))
    if (userLogin) {
        document.getElementById("login").innerHTML = userLogin.fullname
        document.getElementById("btn-logout").style.display = "block"
        welcome.innerHTML = "Chào mừng bạn đã quay trở lại !!!"
        welcome.style.fontSize = "15px"
    }
    else {
        document.getElementById("login").innerHTML = `<button> <a href="../../LoginRegister/Register.html">Login</a> </button>`
        document.getElementById("btn-logout").style.display = "none"
        welcome.innerHTML = ""
    }
}
renderAccount()
//Đăng xuất

document.getElementById("btn-logout").onclick = function () {
    localStorage.removeItem("admin-login")
    renderAccount()
    welcome.innerHTML = ""
}
function DetailsProduct(id) {
    localStorage.setItem("orderID", JSON.stringify(id))
    window.location.href = "./bill.html"
}
