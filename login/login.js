
const login = () => {
    let name = document.getElementById('name');
    let pw = document.getElementById('pw');
    let err = document.getElementById('err');

    let username = localStorage.getItem('username');
    let password = localStorage.getItem('password');


    if (name.value === username && pw.value === password) {
        localStorage.setItem('guest', false);
        redirect('../level/level.html');
    }

    name.style.borderColor = pw.style.borderColor = 'red';
    err.innerHTML = 'Username or Password is incorrect';
};


const register = () => {
    redirect('../registration/register.html');
};

const guest = () => {
    localStorage.setItem('guest', true);
    redirect('../level/level.html');
};

const redirect = (path) => {
    location.href = path;
}

