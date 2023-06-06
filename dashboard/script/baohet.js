document.querySelector(".jsFilter").addEventListener("click", function () {
  document.querySelector(".filter-menu").classList.toggle("active");
});

document.querySelector(".grid").addEventListener("click", function () {
  document.querySelector(".list").classList.remove("active");
  document.querySelector(".grid").classList.add("active");
  document.querySelector(".products-area-wrapper").classList.add("gridView");
  document
    .querySelector(".products-area-wrapper")
    .classList.remove("tableView");
});

document.querySelector(".list").addEventListener("click", function () {
  document.querySelector(".list").classList.add("active");
  document.querySelector(".grid").classList.remove("active");
  document.querySelector(".products-area-wrapper").classList.remove("gridView");
  document.querySelector(".products-area-wrapper").classList.add("tableView");
});

var modeSwitch = document.querySelector('.mode-switch');
modeSwitch.addEventListener('click', function () {
  document.documentElement.classList.toggle('light');
  modeSwitch.classList.toggle('active');
});

$.getJSON('https://order-app-moi-default-rtdb.asia-southeast1.firebasedatabase.app/sanpham.json', function (data) {
  console.log(data)
  for (item in data) {
    console.log(data[item]);
    render(data[item], item)
  }
}).fail(function (error) {
  console.log('cc')
});


template = `<div id='%ID%' class="products-row">
<button class="cell-more-button">
<svg onclick="click(this)" fill="#fff" height="99px" width="99px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-230.39 -230.39 921.55 921.55" xml:space="preserve" stroke="#fff" stroke-width="0.00460775"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="1.8431000000000002"></g><g id="SVGRepo_iconCarrier"> <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55 c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55 c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505 c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55 l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719 c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"></path> </g></svg>
</button>
<div class="product-cell image">
  <img src="%ANH%" alt="Ảnh sản phẩm" loading="lazy">
  <span>%TENSANPHAM%</span>
</div>
<div class="product-cell category"><span class="cell-label">Danh mục:</span>Món chính</div>
<div class="product-cell status-cell">
  <span class="cell-label">Trạng thái:</span>
  <span class="status active">Hoạt động</span>
</div>
<div class="product-cell sales"><span class="cell-label">Thời gian:</span>%TIME%</div>
<!-- <div class="product-cell stock"><span class="cell-label">Kho:</span>36</div> -->
<div class="product-cell price"><span class="cell-label">Giá:</span>%GIA%</div>
</div>`

templateFalse = `<div id='%ID%' class="products-row">
<button class="cell-more-button">
<svg onclick="click(this)" fill="#fff" height="99px" width="99px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-230.39 -230.39 921.55 921.55" xml:space="preserve" stroke="#fff" stroke-width="0.00460775"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="1.8431000000000002"></g><g id="SVGRepo_iconCarrier"> <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55 c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55 c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505 c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55 l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719 c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"></path> </g></svg>
</button>
<div class="product-cell image">
  <img src="%ANH%" alt="Ảnh sản phẩm" loading="lazy">
  <span>%TENSANPHAM%</span>
</div>
<div class="product-cell category"><span class="cell-label">Danh mục:</span>Món chính</div>
<div class="product-cell status-cell">
  <span class="cell-label">Trạng thái:</span>
  <span class="status disabled">Hết</span>
</div>
<div class="product-cell sales"><span class="cell-label">Thời gian:</span>%TIME%</div>
<!-- <div class="product-cell stock"><span class="cell-label">Kho:</span>36</div> -->
<div class="product-cell price"><span class="cell-label">Giá:</span>%GIA%</div>
</div>`

function render(data, id) {
  console.log(data.trangthai)
  var div = template
  if (data.trangthai != undefined) {
    if (!data.trangthai) {
      var div = templateFalse
    }
  } 
  var div = div.replaceAll('%ANH%', data.anh)
  var div = div.replaceAll('%GIA%', data.gia)
  var div = div.replaceAll('%ID%', id)
  var div = div.replaceAll('%TIME%', convertTime(data.time))
  var div = div.replaceAll('%TENSANPHAM%', data.tensanpham)
  $('.products-area-wrapper').prepend(div)
}

//make a funtion click to show the value of button
function click(e) {
  id = $(e).parent().parent().attr('id')
  let text = `Bạn chắc chắn báo hết món có ID "${id}"?`;
  if (confirm(text) == true) {
    // $(e).parent().parent().remove()
    statusProduct(id)
  }
}

//convert time to dd/mm/yy
function convertTime(time) {
  var date = new Date(time);
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yy = date.getFullYear();
  var time = dd + '/' + mm + '/' + yy;
  return time;
}

//delete an element from firebase by key
function statusProduct(key) {
  // firebase.database().ref(`sanpham/${key}`).remove()
  // firebase.database().ref(`tongsanpham`).set(firebase.database.ServerValue.increment(-1));
  firebase.database().ref(`sanpham/${key}`).update({
    trangthai: false
  }).then(result => {
    //change status
  })
}