$.getJSON(`https://order-app-moi-default-rtdb.asia-southeast1.firebasedatabase.app/donhientai.json`, function (data) {
    //change data off input value id tensanpham
    
    document.getElementById('donhang').value = data;
}).fail(function (error) {
  console.log('cc')
});

console.log('cccc')

firebase.database().ref("donhientai").on("change", snapshot => {
    // console.log(snapshot.val());
    // if (!snapshot.val().trangthai) {
    //     snapshot.val().danhsach.forEach(element => {
    //         cart.push(element)
    //     });
    //     var div = order
    //     var div = div.replaceAll('%DANHSACH%', snapshot.val().danhsach.join("<br>"))
    //     var div = div.replaceAll('%ID%', snapshot.val().id)
    //     var div = div.replaceAll('%IDKEY%', snapshot.key)
    //     var div = div.replaceAll('%TIME%', snapshot.val().time)
    //     var div = div.replaceAll('%GIA%', snapshot.val().gia + '₫')
    //     $('.listOrder').prepend(div)
    // }
    // $('.tonghop').empty()
    // $('.tonghop').text(consolidateOrders(cart))
    console.log('cccccccc')
    console.log(snapshot.val())
})