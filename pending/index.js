var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var iddonhang = document.getElementById("iddonhang");
let params = new URLSearchParams(location.search);
var start = params.get('start');
var id = params.get('id');
var idkey = params.get('idkey');
var totalSeconds = 0;

if (id) {
    iddonhang.innerText = id
}

if (start) {
    setInterval(setTime, 1000);
} else {
    setInterval(setTimeNull, 1000);
}

function setTimeNull() {
    ++totalSeconds
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function setTime() {
    var timeNow = Date.now()
    var totalSeconds = Math.floor((timeNow - start) / 1000);
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}

firebase.database().ref(`donhang/${id}`).on("value", snapshot => {
    console.log(snapshot.val().trangthai);
    if (snapshot.val().trangthai) {
        window.open(`../success/index.html?id=${id}`, "_self");

    }
    
    // var div = order
    // var div = div.replaceAll('%DANHSACH%', snapshot.val().danhsach)
    // var div = div.replaceAll('%ID%', snapshot.val().id)
    // var div = div.replaceAll('%IDKEY%', snapshot.key)
    // var div = div.replaceAll('%GIA%', snapshot.val().gia)
    // if (list >= 2) {
        // $('.listOrder').prepend(div)
    // }
    // ++list
})