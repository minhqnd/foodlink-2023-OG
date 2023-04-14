let searchForm = document.querySelector('.search-form-container');

document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
    cart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

let cart = document.querySelector('.shopping-cart-container');

$('.cart-btn').click(function () {
    // $('.all').hide();
    // $(".shopping-cart-container")[0].scrollIntoView();
    all.classList.toggle('active');
    cart.classList.toggle('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
});

let loginForm = document.querySelector('.login-form-container');

document.querySelector('#login-btn').onclick = () => {
    $(".header").toggleClass('headerSticky')
    loginForm.classList.toggle('active');
    searchForm.classList.remove('active');
    cart.classList.remove('active');
    navbar.classList.remove('active');
}

let navbar = document.querySelector('.footer .navbar');
let all = document.querySelector('.all');

document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
    all.classList.toggle('active');
    searchForm.classList.remove('active');
    cart.classList.remove('active');
    loginForm.classList.remove('active');
}

window.onscroll = () => {
    navbar.classList.remove('active');
}

document.querySelector('.home').onmousemove = (e) => {

    let x = (window.innerWidth - e.pageX * 2) / 90;
    let y = (window.innerHeight - e.pageY * 2) / 90;

    document.querySelector('.home .home-parallax-img').style.transform = `translateX(${y}px) translateY(${x}px)`;
}

document.querySelector('.home').onmouseleave = () => {

    document.querySelector('.home .home-parallax-img').style.transform = `translateX(0px) translateY(0px)`;
}



function sendthanhtoan() {
    firebase.database().ref().child('thanhtoan').push({
        'thanhtoan': 'test'
    });
    window.open('../pending/index.html', "_self");

}

$.getJSON('https://order-app-moi-default-rtdb.asia-southeast1.firebasedatabase.app/sanpham.json', function (data) {
    console.log(data)
    for (item in data) {
        console.log(data[item]);
        render(data[item], item)
    }
}).fail(function (error) {
    console.log('cc')
});

var template = `<div class="box">
<a href="#" class="fas fa-heart"></a>
<div class="image">
    <img src="%ANH%" loading="lazy" alt="">
</div>
<div class="content">
    <h3>%TENSANPHAM%</h3>
    <div class="price">%GIA%<span>%UPGIA%</span></div>
    <a data-id='%ID%' data-tensanpham='%TENSANPHAM%' data-anh='%ANH%' data-gia='%GIA%' onclick="add(this)" class="btn">Thêm</a>
</div>
</div>`

function render(data, id) {
    // console.log(data.tensanpham)
    var div = template
    var div = div.replaceAll('%ANH%', data.anh)
    var div = div.replaceAll('%GIA%', data.gia)
    var div = div.replaceAll('%ID%', id)
    var div = div.replaceAll('%UPGIA%', data.gia * 1 + 10 + '.000')
    var div = div.replaceAll('%TENSANPHAM%', data.tensanpham)
    $('.listDoAn').append(div)
}

var productList = []


function add(data) {
    // Lấy thông tin sản phẩm từ thuộc tính data của nút "Thêm"
    var id = $(data).data('id');
    var name = $(data).data('tensanpham');
    var image = $(data).data('anh');
    var price = $(data).data('gia');

    // Kiểm tra sản phẩm đã tồn tại trong danh sách chưa
    var product = getProductById(id);
    if (product !== null) {
        // Nếu sản phẩm đã tồn tại, tăng số lượng và cập nhật tổng tiền
        product.quantity++;
        product.totalPrice = product.quantity * price;
    } else {
        // Nếu sản phẩm chưa tồn tại, thêm vào danh sách
        var product = {
            id: id,
            name: name,
            image: image,
            price: price * 1,
            quantity: 1,
            totalPrice: price * 1
        };
        productList.push(product);
    }
    updateCart(productList)
}

// Hàm tìm kiếm sản phẩm trong danh sách theo ID
function getProductById(id) {
    for (var i = 0; i < productList.length; i++) {
        if (productList[i].id === id) {
            return productList[i];
        }
    }
    return null;
}

function tongTien(productList) {
    var moneys = 0
    productList.forEach(data => {
        moneys = moneys + data.totalPrice
    })
    return moneys
}

function tongDon(productList) {
    var dons = 0
    productList.forEach(data => {
        dons = dons + data.quantity
    })
    return dons
}

function updateCart(productList) {
    $('.listcard').empty()
    $('.tien').text(tongTien(productList) + '.000')
    $('.badge').text(tongDon(productList))
    productList.forEach(data => {
        var div = listcardtemp
        var div = div.replaceAll('%ANH%', data.image)
        var div = div.replaceAll('%ID%', data.id)
        var div = div.replaceAll('%TOTALPRICE%', data.totalPrice + '.000')
        var div = div.replaceAll('%PRICE%', data.price)
        var div = div.replaceAll('%SOLUONG%', data.quantity)
        var div = div.replaceAll('%TENSANPHAM%', data.name)
        $('.listcard').append(div)
    });

}

var listcardtemp = `<div class="box">
<i class="fas fa-times"></i>
<img src="%ANH%" loading="lazy" alt="">
<div class="content">
    <h3>%TENSANPHAM%</h3>
    <span>Số lượng: </span>
    <input data-id='%ID%' data-price='%PRICE%' type="number" name="" value="%SOLUONG%" id="" min=1 max=10 onChange="themSoLuong(this)">
    <br>
    <span>Giá: </span>
    <span class="price"> %TOTALPRICE% </span>
</div>
</div>`

function themSoLuong(input) {
    // Lấy giá trị của input
    var soLuong = input.value;

    // Lấy ID sản phẩm
    var id = $(input).data("id");

    // Lấy giá sản phẩm
    var price = $(input).data("price");

    // Tính toán tổng giá mới)
    var total = soLuong * price;

    // Tìm sản phẩm tương ứng trong productList và cập nhật số lượng và tổng giá mới
    for (var i = 0; i < productList.length; i++) {
        if (productList[i].id == id) {
            productList[i].soLuong = soLuong;
            productList[i].totalPrice = total;

            // Cập nhật lại giá trị của sản phẩm trên trang
            $(input).siblings(".price").text(total + '.000');
            $('.tien').text(tongTien(productList) + '.000')
            $('.badge').text(tongDon(productList))
            break;
        }
    }
}



function updonhang() {
    // if (checkcan(id)) {
    //     sendDonHang(id)
    // } else {
    //     sendDonHang(Math.floor(Math.random() * (999 - 100 + 1) + 100));
    // }
    // checkcan(id)
    var id = Math.floor(Math.random() * 90 + 10)

    firebase.database().ref(`donhang/${id}`).update({
        danhsach: danhsach,
        gia: $('.cart-btn .tien').text(),
        trangthai: false,
        id: id
    }).then(result => {
        //done
        // firebase.database().ref(`tongsanpham`).set(firebase.database.ServerValue.increment(1));
        console.log('Đăng thành công!')
        window.open(`../pending/index.html?id=${id}`, "_self");
    })
}

function sendDonHang(id) {
    firebase.database().ref(`donhang/${id}`).update({
        danhsach: danhsach,
        gia: $('.cart-btn .tien').text(),
        trangthai: false,
        id: id
    }).then(result => {
        //done
        // firebase.database().ref(`tongsanpham`).set(firebase.database.ServerValue.increment(1));
        console.log('Đăng thành công!')
        window.open(`../pending/index.html?id=${id}`, "_self");
    })
}

function checkcan(id) {
    firebase.database().ref(`donhang/${id}`).once("value", snapshot => {
        if (snapshot.exists()) {
            // sendDonHang(Math.floor(Math.random() * (999 - 100 + 1) + 100));
        } else {
            console.log('errrr');
            console.log(id);
            // sendDonHang(id)
        }
    }
    )
}



