
const listcategory = document.getElementById("list-category");
const COMEBACKS = document.getElementById("COMEBACKS");
//Hàm hihển thị chi tiết đơn hàng
function renderPayment() {
  //Lấy ID đơn từ local
  const orderID = JSON.parse(localStorage.getItem("orderID"));
  //Lấy danh sách sp
  const dbproductms = JSON.parse(localStorage.getItem("product"));
  //Danh sách đơn hàng
  const orders = JSON.parse(localStorage.getItem("orders"));
  //Tìm đơn hàng tương ưng với order
  let Oderdetails = orders.find((el) => el.id == orderID);
  const cart = Oderdetails.cart;
  let totalPrice = 0;
  let Stringpayment = "";
  for (let i = 0; i < cart.length; i++) {
    const product = dbproductms.find((el) => el.id == cart[i].productId);
    //Tìm sản phẩm tương ứng với product
    totalPrice += product.price * cart[i].quantity;
    //Tính tổng sản phẩm
    Stringpayment += `
           <tr>
                      <td>  <img width="100px"
              src="${product.image}"
      }"
              alt="Marshall Emberton Diamond Jubilee - Black"
            /> ${product.productName}</td>
                      <td>${Number(product.price).toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    })}</td>
                      <td>${cart[i].quantity}</td>
                      <td>${Number(
      product.price * cart[i].quantity
    ).toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    })}</td>
                    </tr> 
          `;
  }
  listcategory.innerHTML = Stringpayment;
}
//Xử lý sự kiện cho nút trở lại
renderPayment();
COMEBACKS.onclick = function () {
  //chuyển hướng về trang listoder
  window.location.href = "./listoder.html";
};
