let params = new URLSearchParams(location.search);
// var start = params.get('start');
var id = params.get('id');
var storageRef = firebase.storage().ref();
document.getElementById('uploadthumb').addEventListener('change', upthumb, false);


$.getJSON(`https://order-app-moi-default-rtdb.asia-southeast1.firebasedatabase.app/sanpham/${id}.json`, function (data) {
    //change data off input value id tensanpham
    document.getElementById('tensanpham').value = data.tensanpham;
    document.getElementById('idsanpham').value = id;
    //change value of input check box id trangthai if true
    if (data.trangthai == true || data.trangthai == undefined) {
        document.getElementById('trangthai').checked = true;
        }
    //change value of input check box id trangthai if false
    else {
        document.getElementById('trangthai').checked = false;
    }
    
    document.getElementById('gia').value = data.gia;




}).fail(function (error) {
  console.log('cc')
});


function upthumb(evt) {
    console.log('cc');
    const file = evt.target.files[0];
    if (file.size / 1024 / 1024 > 10) {
        // $("#error").text('Thumbnail quá lớn, vui lòng giảm độ phân giải')
    } else {
        const storageRef = firebase.storage().ref("thumbnail/" + file.name);
        var metadata = {
            'contentType': file.type
        };
        const task = storageRef.put(file, metadata);
        task.on(
            "state_changed",
            function progress(snapshot) {
                const percentage =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(percentage);
                // $('.btn-primary').first().removeClass("btn-primary").addClass("btn-secondary");
            },
            function error() {
                console.log('Upload failed');
            },
            function complete() {
                task.then(function (cc) {
                    $('#ok').text('Đã tải ảnh')
                    // $('.btn-secondary').first().removeClass("btn-secondary").addClass("btn-primary");
                    cc.ref.getDownloadURL().then((url) => {
                        console.log(url);
                        $("#imgthumb").attr("src", url);
                    });
                });
            });
    }
}

// firebase.auth().onAuthStateChanged(function (user) {
//     if (user) {
//         console.log('Anonymous user signed-in.');
//         // console.log('Anonymous user signed-in.', user);
//         // document.getElementById('file').disabled = false;
//     } else {
//         console.log('There was no anonymous session. Creating a new anonymous user.');
//         auth.signInAnonymously();
//     }
// });

function upsanpham() {
    var idsanpham = $("#idsanpham").val()
    firebase.database().ref(`sanpham/${idsanpham}`).update({
        tensanpham: $("#tensanpham").val(),
        gia: $("#gia").val(),
        // anh: $('#tagselect').find(":selected").text(),
        trangthai: $("#trangthai").is(':checked'),
        time: Date.now(),
        anh: $('#imgthumb').attr('src')
    }).then(result => {
        //done
        firebase.database().ref(`tongsanpham`).set(firebase.database.ServerValue.increment(1));
        console.log('Đăng thành công!')
        window.open('./panel.html', "_self");
    })
}