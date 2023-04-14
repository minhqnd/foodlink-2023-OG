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

var danhsach = []


function add(data) {
    // console.log($('.cart-btn .tien').text());
    var tien = $('.cart-btn .tien').text() * 1 + $(data).data("gia") * 1 + '.000'
    $('.tien').text(tien)
    danhsach.push($(data).data("tensanpham"))
    var div = listcardtemp
    var div = div.replaceAll('%ANH%', $(data).data("anh"))
    var div = div.replaceAll('%GIA%', $(data).data("gia"))
    var div = div.replaceAll('%TENSANPHAM%', $(data).data("tensanpham"))
    $('.listcard').append(div)
}

var listcardtemp = `<div class="box">
<i class="fas fa-times"></i>
<img src="%ANH%" loading="lazy" alt="">
<div class="content">
    <h3>%TENSANPHAM%</h3>
    <span>Số lượng : </span>
    <input type="number" name="" value="1" id="" onChange="console.log('cc')">
    <br>
    <span>Giá : </span>
    <span class="price"> %GIA% </span>
</div>
</div>`




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



