const firebaseErrors = {
    'auth/user-not-found': 'Không có người dùng tương ứng với email này',
    'auth/email-already-in-use': 'Địa chỉ email đã được sử dụng bởi một tài khoản khác.',
    'auth/weak-password': 'Mật khẩu phải có ít nhất 6 ký tự',
    'auth/wrong-password': 'Thông tin đăng nhập không đúng',
    'auth/too-many-requests': 'Quyền truy cập vào tài khoản này đã tạm thời bị vô hiệu hóa do nhiều lần đăng nhập không thành công. Bạn có thể khôi phục ngay lập tức bằng cách đặt lại mật khẩu của mình hoặc bạn có thể thử lại sau.'
};

function signup(form) {
    if (form.password.value == form.repassword.value) {
        firebase.auth().createUserWithEmailAndPassword(form.email.value, form.password.value)
            .then((userCredential) => {
                var user = userCredential.user;
                console.log(user)
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                // document.getElementsByClassName('password-help').textContent = errorMessage;
                document.querySelector('.password-help').innerHTML = firebaseErrors[errorCode] || errorMessage
            });
    } else {
        document.querySelector('.password-help').innerHTML = 'Mật khẩu không trùng khớp'
        console.log(form.password.value);
        console.log(form.repassword.value);
    }
}

function signin(form) {
    firebase.auth().signInWithEmailAndPassword(form.email.value, form.password.value)
        .then((userCredential) => {
            var user = userCredential.user;
            console.log(user)
            location.href = "home.html";
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            document.querySelector('.password-help').innerHTML = firebaseErrors[errorCode] || errorMessage
        });
}


