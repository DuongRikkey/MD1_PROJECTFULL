// Thêm category
const btnagree = document.getElementById("btn-Agree")
//// Nút để thêm hoặc cập nhật danh mục
const input = document.getElementById("category-input-name")
// Ô nhập liệu tên danh mục
const error1 = document.getElementById("error-1")
// Vùng hiển thị thông báo lỗi
const btncancel = document.getElementById("btn-Cancel")
// Nút để hủy thao tác nhập liệu
const listcategory = document.getElementById("list-category")
// Vùng hiển thị danh sách danh mục
const Updatename = document.getElementById("Updatename")
// Vùng hiển thị trạng thái "Thêm" hoặc "Cập nhật"



const inputSearch = document.getElementById("input-search")
// Ô nhập liệu tìm kiếm danh mục
const btnSearch = document.getElementById("btn-search")
// Nút để tìm kiếm danh mục
const sortall = document.getElementById("sortall")
// Menu chọn sắp xếp danh mục
let idUpdateGlobal = null;
// Biến lưu ID của danh mục đang được chỉnh sửa

let filtercategory = document.getElementById("filter-category ");
const pagesize = 5;
const totalpgae = 1
btnagree.onclick = function () {
    const categoryname = input.value.trim()
    //Lấy giá trị từ ô nhập liệu
    const dbCategory = JSON.parse(localStorage.getItem("categories")) || []
    //Lây danh mục từ local storage hoặc lấy mảng rỗng
    if (!categoryname)
    //Kiểm tra nếu ô nhập liệu rỗng 
    {
        error1.innerHTML = "Mời bạn nhập lại"
        return;

    }
    //Kiểm tra xem danh mục tồn tại chưa
    const vitri = dbCategory.findIndex((element) => {
        return element.name.toLowerCase() === categoryname.toLowerCase()
    })

    //Nếu đã tồn tại
    if (vitri !== -1) {
        error1.innerHTML = "Đã có sản phẩm này";
        return;
    }
    //Tạo id cho danh mục mới
    let id = 1;
    if (dbCategory.length > 0) {
        id = dbCategory[dbCategory.length - 1].id + 1
        //ID cuối cùng công thêm ID mới
    }

    //Nếu đang chỉnh sửa danh mịc
    if (idUpdateGlobal) {
        let idUpdateGlobalindex = dbCategory.findIndex(e => e.id === idUpdateGlobal)
        //Tìm vị trí danh mục cập nhập
        dbCategory[idUpdateGlobalindex].name = categoryname;//Cập nhập danh mục
        localStorage.setItem("categories", JSON.stringify(dbCategory)) //Lưu dữ liệu lên trên loco
        idUpdateGlobal = null; // Resert ID chỉnh sửa
        renderCategory()// Cập nhật danh mục
        input.value = ""//Xóa ô giá trị nhập liệu
        Updatename.innerHTML = "Them danh muc" // Đổi trạng thái thêm
        return;
    }
    //Tạo đối tượng mới tạo trường danh mục thêm vào
    const Overvieww = {
        id: id,
        name: categoryname
    }
    // let index = dbCategory.findIndex((c) => c.id == Overvieww.id)
    // console.log(index);

    //Thêm danh mục mới vào mảng
    dbCategory.push(Overvieww)
    console.log(dbCategory);
    //Lưu danh mục vào local
    localStorage.setItem("categories", JSON.stringify(dbCategory))
    //Xóa khai báo lỗi
    error1.innerHTML = ""
    // xóa giá trị ô nhập liệu
    input.value = ""
    //Them vao
    renderCategory()


} // Cập nhập danh sách danh mục

//Xử lý thao tác hủy
btncancel.onclick = function () {
    input.value = ""
    //Xóa giá trị ô input
    error1.innerHTML = ""
    //Xóa giá trị lỗi
}
//Hiện thị danh mục
function renderCategory() {
    let dbCategory = JSON.parse(localStorage.getItem("categories")) || []
    //Lấy danh sách từ LocalStorage

    dbCategory = dbCategory.filter((el) => el.name.toLowerCase().includes(inputSearch.value.trim().toLowerCase()))
    //Lọc danh mục theo từ khóa tìm kiếm sử dụng cho nút search

    //Sắp xếp danh mục theo tiêu chí
    switch (sortall.value) {
        case `bandau`:
            break;
        case `tangdan`:
            dbCategory.sort((a, b) => a.name.localeCompare(b.name));
            //Sắp xếp tăng dần
            break;
        case `giamdan`:
            dbCategory.sort((a, b) => b.name.localeCompare(a.name))
            break;
    }
    let string = "";

    for (i = 0; i < dbCategory.length; i++) {
        string +=
            `<tr>
                <td>${i + 1}</td>
                <td>${dbCategory[i].id}</td>
                <td>${dbCategory[i].name}</td>
                <td>
                <button onclick="enterEdit(${dbCategory[i].id})">Update</button>
                 <button onclick="deletecategory(${dbCategory[i].id})">Delete</button>
                </td>
            </tr>
            `
    }
    listcategory.innerHTML = string // Cập nhập vùng hiển thị danh mục
    // listcategory.innerHTML.reverse()
}
renderCategory() //Gọi hàm và hiển thị danh mục ngay khi trang được tải



function deletecategory(idDelete) {
    if (confirm("Bạn có chắc xóa hay không")) {
        const dbCategory = JSON.parse(localStorage.getItem("categories")) || []
        //Lấy danh mục từ LocalStorage
        let vitri = dbCategory.findIndex(element => element.id == idDelete)
        //Tìm vị trí trong danh mục
        dbCategory.splice(vitri, 1)
        //Xóa tại vị trí
        localStorage.setItem("categories", JSON.stringify(dbCategory))
        //Gửi dữ liệu lên trên Local
        renderCategory()
        //Cập nhật danh mục
    }
}
function enterEdit(idcanedit) {
    const dbCategory = JSON.parse(localStorage.getItem("categories")) || []
    //Lấy danh sách từ local storage
    let giatri = dbCategory.find(function (element) {
        return element.id === idcanedit;
    })//Tìm danh mục cần chỉnh sửa
    //Khai báo giá trị tu
    input.value = giatri.name;
    //Hiện thị danh mục trong ô nhập liệu
    idUpdateGlobal = idcanedit
    //Lưu ID dang mục cần chỉnh sửa
    localStorage.setItem("categories", JSON.stringify(dbCategory))
    // Đưa lên local

    renderCategory()
    Updatename.innerHTML = "Update";
    //Cập nhật nội dung cho Updatename
    return;


}

btnSearch.onclick = function () {
    renderCategory()
    //Cập nhập danh mục theo từ khóa tìm kiếm
};
//Bước cuối
sortall.onchange = function () {
    renderCategory()
    //Cập nhật danh mục theo tiêu chí sắp xếp
}


//Đăng nhập
function renderAccount() {
    const userLogin = JSON.parse(localStorage.getItem("admin-login"))
    if (userLogin) {
        document.getElementById("login").innerHTML = userLogin.fullname
        //Hiển thị tên người dùng và đăng nhập
        document.getElementById("btn-logout").style.display = "block"
        //Hiển thị nút đăng xuất
        welcome.innerHTML = "Chào mừng bạn đã quay trở lại !!!"
        welcome.style.fontSize = "15px"
    }
    else {
        //Nếu khác thì chuyển hướng sang trang đăng nhập đăng ký
        document.getElementById("login").innerHTML = `<button> <a href="../../LoginRegister/Register.html">Login</a> </button>`
        document.getElementById("btn-logout").style.display = "none"
        //Nút đăng xuất ẩn đi
        welcome.innerHTML = ""
    }
}
renderAccount()
//hiển thị thông tin đăng nhập 
document.getElementById("btn-logout").onclick = function () {
    localStorage.removeItem("admin-login")
    //Xóa thong tin dang nhap tu Local storage
    renderAccount()
    //Cap nhat thong tin dang nhạp
    welcome.innerHTML = ""
}