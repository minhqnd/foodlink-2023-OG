var list = 1
let cart = [];
firebase.database().ref("donhang").on("child_added", snapshot => {
    // console.log(snapshot.val());
    if (!snapshot.val().trangthai) {
        snapshot.val().danhsach.forEach(element => {
            cart.push(element)
        });
        var div = order
        var div = div.replaceAll('%DANHSACH%', snapshot.val().danhsach.join("<br>"))
        var div = div.replaceAll('%ID%', snapshot.val().id)
        var div = div.replaceAll('%IDKEY%', snapshot.key)
        var div = div.replaceAll('%TIME%', snapshot.val().time)
        var div = div.replaceAll('%GIA%', snapshot.val().gia + '₫')
        $('.listOrder').prepend(div)
    }
    $('.tonghop').empty()
    $('.tonghop').text(consolidateOrders(cart))
})

function consolidateOrders(orders) {
    const orderMap = new Map();
    
    for (let order of orders) {
      const count = parseInt(order.match(/\d+/)[0]);
      const name = order.replace(`(${count}) `, "");
      
      if (!orderMap.has(name)) {
        orderMap.set(name, count);
      } else {
        orderMap.set(name, orderMap.get(name) + count);
      }
    }
    
    const consolidatedOrders = Array.from(orderMap, ([name, count]) => `(${count}) ${name}`);
    
    return consolidatedOrders;
  }
  

$(document).ready(function () {
    // Lặp qua tất cả các thẻ div có class "badge" và thuộc tính data-time

    setInterval(function () {
        $(".badge[data-time]").each(function () {
            var $badge = $(this);
            // Lấy giá trị của thuộc tính data-time
            var dataTime = $badge.data("time");
            // Chuyển đổi giá trị data-time thành đối tượng ngày
            var date = new Date(parseInt(dataTime));
            // Tính toán thời gian đã trôi qua từ thời điểm data-time đến hiện tại
            var timeDiff = new Date() - date;
            // Cập nhật thời gian theo từng giây
            timeDiff += 1000;
            // Hiển thị thời gian đã trôi qua theo định dạng giờ:phút:giây
            $badge.text(msToTime(timeDiff));
        }, 1000);
    });

    // Hàm chuyển đổi miliseconds thành định dạng giờ:phút:giây
    function msToTime(duration) {
        var seconds = parseInt((duration / 1000) % 60),
            minutes = parseInt((duration / (1000 * 60)) % 60);
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        return minutes + ":" + seconds;
    }
});



var order = `<div class="col-xl-5 removeid%IDKEY%">
<div class="card text-center">
    <div class="card-body">
        <h3 data-time='%TIME%' class="badge badge-xl light badge-secondary">00:00</h3>
        <h4 class="card-text">%DANHSACH%</h4>
        <p class="card-text text-dark">Lấy tại quầy - %GIA% - %ID%</p>
    </div>
    <div class="card-footer">
        <a  href="javascript:hoanthanh('%IDKEY%')"  class="btn btn-primary">Hoàn thành</a>
    </div>
</div>
</div>`

function hoanthanh(id) {
    firebase.database().ref(`donhang/${id}`).update({
        trangthai: true
    }).then(result => {
        firebase.database().ref(`tongdon`).set(firebase.database.ServerValue.increment(1));
        firebase.database().ref(`donhientai`).set(firebase.database.ServerValue.increment(-1));
        $(`.listOrder`).empty()
        cart = []
        console.log('Đăng thành công!')
        firebase.database().ref("donhang").on("child_added", snapshot => {
            // console.log(snapshot.val());
            if (!snapshot.val().trangthai) {
                snapshot.val().danhsach.forEach(element => {
                    cart.push(element)
                });
                var div = order
                var div = div.replaceAll('%DANHSACH%', snapshot.val().danhsach.join("<br>"))
                var div = div.replaceAll('%ID%', snapshot.val().id)
                var div = div.replaceAll('%IDKEY%', snapshot.key)
                var div = div.replaceAll('%TIME%', snapshot.val().time)
                var div = div.replaceAll('%GIA%', snapshot.val().gia + '₫')
                $('.listOrder').prepend(div)
            }
            $('.tonghop').empty()
            $('.tonghop').text(consolidateOrders(cart))
        })
    })
}


