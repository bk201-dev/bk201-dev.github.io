let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

function openContactCard(){
    document.getElementById('contactCard').style.display = 'flex';
}

function closeContactCard(){
    document.getElementById('contactCard').style.display = 'none';
}