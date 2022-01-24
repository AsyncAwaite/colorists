"use strict";
import { openModal, closeModal } from "./modules/popups";
import Form from "./modules/Forms";
import adaptiveElements from "./modules/adaptiveElements";
// import screenSize from "./modules/screenSize";

function scrollBar() {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrolled = (winScroll / height) * 100;
  document.getElementById("progress-bar").style.width = scrolled + "%";
}
window.addEventListener("load", () => {
  document.body.classList.add("loaded_hiding");
  document.body.classList.add("active");
  window.setTimeout(() => {
    document.body.classList.remove("active");
    document.body.classList.add("loaded");
    document.body.classList.remove("loaded_hiding");
    const preloader = document.querySelector(".preloader");
    preloader.remove();
  }, 2000);
});

window.onscroll = function () {
  try {
    scrollBar();
  } catch (e) {
    // console.log(e);
  }
};
window.addEventListener("DOMContentLoaded", function () {
  try {
    adaptiveElements();


   
    window.addEventListener("scroll", headerFixed);
    // callback();
    const heroHeight = hero.scrollHeight;
    let menuStatus = false;
    function headerFixed() {
      if (
        hero !== null &&
        window.pageYOffset >= heroHeight &&
        menuStatus === false
      ) {
        header.classList.add("header_fixed");
        menuStatus = true;
      } else if (window.pageYOffset < 100 && menuStatus === true) {
        menuStatus = false;
        header.classList.remove("header_fixed");
      } else {
        return;
      }
    }

    const btns = document.querySelectorAll(".btn");
    btns.forEach((btn) => {
      if (btn.getAttribute("data-modal") == "")
        btn.addEventListener("click", () => {
          openModal(".popup");
        });
    });
    const popup = document.querySelector(".popup");
    popup.addEventListener("click", (e) => {
      if (e.target === popup || e.target.getAttribute("data-close") == "") {
        closeModal(".popup");
      }
    });
  } catch (e) {
    // console.log(e);
  }
});
