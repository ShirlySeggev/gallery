'use strict';



function openCanvas() {
    document.querySelector('.offcanvas-btn').classList.toggle('offcanvas-btn-open');
    document.querySelector('.offcanvas-aside').classList.toggle('offcanvas-aside-open');
}



function onContact(ev) {
    ev.preventDefault();
    var sendTo = 'shirlyarcusin@gmail.com';
    var subject = document.querySelector('#subject').value;
    var body = document.querySelector('#textarea').value;

    var url = `https://mail.google.com/mail/?view=cm&fs=1&to=${sendTo}&su=${subject}&body=${body}`;
    window.open(url);
}