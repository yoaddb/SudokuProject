
const register = () => {

    let username = document.getElementById('name');
    let password = document.getElementById('pw');
    let confirm = document.getElementById('pw-conf');
    let err = document.getElementById('err');
    let errMsg = '';

    if (username.value === '') {
        username.style.borderColor = 'red';
        errMsg += 'Username is required.' + '<br/>';
    }
    else {
        username.style.borderColor = 'lightgrey';
    }

    if (password.value === '' || confirm.value === '' || password.value !== confirm.value) {
        password.style.borderColor = confirm.style.borderColor = 'red';
        errMsg += 'Passwords must match.';
    }
    else {
        password.style.borderColor = confirm.style.borderColor = 'lightgrey';
    }

    err.innerHTML = errMsg;

    // Client side validation successful
    if (errMsg === '') {
        localStorage.setItem('username', username.value);
        localStorage.setItem('password', password.value);
        redirect('../login/login.html');
    }
}

const redirect = (path) => {
    location.href = path;
}



