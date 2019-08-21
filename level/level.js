
let guest = localStorage.getItem('guest');
if (guest === 'true') {
    // remove all but easy level from the DOM
    document.getElementById('intermediate').parentNode.remove();
    document.getElementById('hard').parentNode.remove();

    // center easy-level button
    document.getElementById('row').classList.add('justify-content-center');

    //display title
    document.getElementById('title').innerHTML += ' Guest!';
}
else {
    let username = localStorage.getItem('username');
    //display title
    document.getElementById('title').innerHTML += ' ' + username + '!';
}

startGame = (id) => {
    switch (id) {
        case 'easy': localStorage.setItem('level', 'easy'); break;
        case 'intermediate': localStorage.setItem('level', 'intermediate'); break;
        case 'hard': localStorage.setItem('level', 'hard'); break;
        default: break;
    }

    redirect('../game/game.html');
}

let redirect = (path) => {
    location.href = path;
}