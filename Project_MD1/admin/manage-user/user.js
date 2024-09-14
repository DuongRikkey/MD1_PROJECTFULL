const search = document.getElementById("search")
const searchuser = document.getElementById("searchuser");
const listcategory = document.getElementById("list-category");
const sortall = document.getElementById("sortall");
const logout = document.getElementById("logout");
const welcome = document.getElementById("welcome");


let totalPage = 1
let curentPage = 1
let pagesize = 5
let paginationUser = document.getElementById("pagination-user")



// let dbuser = JSON.parse(localStorage.getItem("users")) || []
// dbuser.push({
//     id: 1,
//     fullname: "admin",
//     email: "admmin@gmail.com",
//     phone: "0987654321",
//     role: 1,
//     status: true,
//     password: "admin123",
//     cart: []
// })
// localStorage.setItem('users', JSON.stringify(dbuser))

function Renderuser() {
    //Timf kiem
    let dbuser = JSON.parse(localStorage.getItem("users")) || []
    dbuser = dbuser.filter((el) => el.fullname.toLowerCase().includes(searchuser.value.trim().toLowerCase()))

    // -------------------------------------
    // sap xep be lon
    switch (sortall.value) {
        case `bandau`:
            break;
        case `tangdan`:
            dbuser.sort((a, b) => a.fullname.localeCompare(b.fullname));
            console.log(dbuser.sort((a, b) => a.fullname.localeCompare(b.fullname)));

            break;
        case `giamdan`:
            dbuser.sort((a, b) => b.fullname.localeCompare(a.fullname))
            break;
    }



    renderPagination()

    let start = (curentPage - 1) * pagesize
    let end = start + pagesize

    dbuser = dbuser.slice(start, end)

    let stringHTML = "";
    for (i = 0; i < dbuser.length; i++) {

        stringHTML += `   
            <tr>
                <td>${dbuser[i].id}</td>
                <td>${dbuser[i].fullname}</td>
                <td>${dbuser[i].phone}</td>
                <td>${dbuser[i].email}</td>
                <td>${dbuser[i].password}</td>
                <td>${dbuser[i].status ? "Active" : "Block"}</td>
                

                <td>${dbuser[i].role ? "Admin" : "User"}</td>
                <td>
                    <button onclick="changeStatus(${dbuser[i].id})" style="display: ${dbuser[i].role ? "none" : ""}" >Open/Block</button>
                </td>
            </tr>
        `
    }
    listcategory.innerHTML = stringHTML;

}
Renderuser()

sortall.onchange = function () {
    Renderuser()
}
search.onclick = function () {
    Renderuser()
}
//Phân trang như này
function renderPagination() {
    let dbuser = JSON.parse(localStorage.getItem("users")) || []

    totalPage = Math.ceil(dbuser.length / pagesize)

    let string = ""

    string += `<a class="page-button" onclick="clickPage('prev')" >&lt;</a>`;

    for (let i = 1; i <= totalPage; i++) {
        string += `<a onclick="changePage(${i})" class="page-button  ${curentPage == i ? "blackpink" : "blackping2"}">${i}</a>`
    }

    string += `<a class="page-button" onclick="clickPage('next')"  >&gt;</a>`;

    paginationUser.innerHTML = string;
}

function changePage(i) {
    curentPage = i
    Renderuser()
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
    Renderuser()
}

function changeStatus(idcandoi) {
    // lay local ve
    let dbuser = JSON.parse(localStorage.getItem("users")) || []
    // tim vi tri theo id
    let vitri = dbuser.findIndex(el => el.id == idcandoi);
    // doi staus tai vitri tim duoc thanh nguoc lai
    dbuser[vitri].status = !dbuser[vitri].status
    // luu len local
    localStorage.setItem("users", JSON.stringify(dbuser))
    // render
    Renderuser()
}
// Đăng nhập
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