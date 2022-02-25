const imgs = document.querySelectorAll(".img-wrap img");
const imgInfo = document.querySelector("#imgInfo");

function imgInfoOpen(event) {
    const thisImg = event.target.src;
    imgInfo.classList.remove("hidden");
}

function imgInfoClose(event) {
    imgInfo.classList.add("hidden");
}

imgs.forEach(img => img.addEventListener("click", imgInfoPopup));
imgInfo.addEventListener("click", imgInfoClose);