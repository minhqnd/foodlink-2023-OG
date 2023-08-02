$.getJSON(`https://order-app-moi-default-rtdb.asia-southeast1.firebasedatabase.app/donhientai.json`, function (data) {
    //change data off input value id tensanpham
    
    document.getElementById('donhang').value = data;
}).fail(function (error) {
  console.log('cc')
});

console.log('cccc')