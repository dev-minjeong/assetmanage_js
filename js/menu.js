const openMenuBtn = document.querySelector('#menubtn_group');
const closeMenuBtn = document.querySelector('#myMenubar').firstChild;
const menuBar = document.querySelector('#myMenubar');

function openMenubtn() {
  menuBar.style.setProperty('display', 'block');
}
function closeMenubtn() {
  menuBar.style.setProperty('display', 'none');
}
openMenuBtn.addEventListener('click', openMenubtn);
