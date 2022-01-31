import Swiper, {  Thumbs } from "swiper";
import SwiperCore, { Navigation, Pagination } from "swiper/core";
SwiperCore.use([Navigation, Pagination, Thumbs]);
import { page } from "./elements";
const reviewsWrapper = page.querySelector(".swiper-wrapper");

const renderRewies = () => {
  getRewies();

  
};

const swiperRewies = () => { 
   const swiper = new Swiper(".reviews", {
    slidesPerView: 3,
    spaceBetween: 36,
    loop: true,
    centeredSlides: true,
    navigation: {
      nextEl: ".next_rewies",
      prevEl: ".prev_rewies",
    },
    breakpoints: {
      1200: {
        slidesPerView: 3,
      },
 
      768: {
        slidesPerView: 2,
        centeredSlides: false,
       
      },
      600: {
        slidesPerView: 1,  
        centeredSlides: false,
      },
      320: {
        slidesPerView: 1,
        centeredSlides: false,
  
      },
    
    },
  });

};
const getRewies = async () => {
  try {
    let response = await fetch("./assets/services/rewies.json");
    let reviews = await response.json();
    let fragment = document.createDocumentFragment();

    reviews.forEach(({ img, title, review }) => {
      const div = document.createElement("div");
      const imgWrapper = document.createElement("div");
      const imgBody = document.createElement("img");
      const h3 = document.createElement("h3");
      const p = document.createElement("p");
      div.className = "swiper-slide reviews__item";
      imgWrapper.className = "img pos-r";
      imgBody.src = img;
      imgBody.alt = 'Картинка секции отзывы';
      imgBody.className = "loaded";
      imgWrapper.appendChild(imgBody);
      div.appendChild(imgWrapper)
      h3.innerText = title;
      p.innerText = review;
      div.appendChild(h3)
      div.appendChild(p)
     
      console.log(div);
      fragment.appendChild(div);
      console.log(fragment);
    });
    reviewsWrapper.appendChild(fragment);
    swiperRewies();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default renderRewies;
