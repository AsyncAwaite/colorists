import { header, page, footer } from "./elements";
const menu = header.querySelector(".menu");
const headerBtn = document.querySelector(".btn");
const forWhoSection = page.querySelector('.for-who')
const adaptiveElements = () => {
  if (matchMedia("(max-width: 992px)").matches) {
const forWhoSectionBtn = forWhoSection.querySelector('.btn')
forWhoSectionBtn.innerHTML += `
<div class="course-name pos-a">
<svg class="icon">
  <use xlink:href="#course-name"></use>
</svg>
</div>`
  }
  if (matchMedia("(max-width: 768px)").matches) {
    const mobileMenu = menu;
    const footerBtn = headerBtn;
    footerBtn.classList.add("btn-buy");
    headerBtn.parentElement.remove();
    headerBtn.remove();
    menu.remove(); 
    footer.insertAdjacentElement("afterend", footerBtn);
    const burger = document.createElement("button");
    burger.innerHTML = `
    <span></span>
    <span></span>
    `;
    burger.classList.add("burger", "not-active");

    const instaLink = document.createElement("a");
    instaLink.innerHTML = `
    <svg class="icon">
    <use xlink:href="#instagram"></use>
</svg>
    `;
    instaLink.href = "#";
    instaLink.classList.add("social-link", "social-link_header");
    header.prepend(burger);
    header.appendChild(instaLink);
    const mobileMenuWrapper = document.createElement("div");
    header.appendChild(mobileMenuWrapper);
    mobileMenuWrapper.classList.add("blur-card", "pos-a", "mobile");
    mobileMenuWrapper.appendChild(mobileMenu);
    burger.addEventListener("click", function () {
      this.classList.toggle("active");
      this.classList.toggle("not-active");
      mobileMenuWrapper.classList.toggle("open");
    });
  

    const promoImgWrapper = document.querySelector(".promo-img-wrapper");

    const promoText = document.querySelector(".promo-text");
    const promoBtn = promoText.querySelector(".btn");
    const promoBtnCopy = promoBtn;
    promoBtn.remove();
    promoImgWrapper.appendChild(promoBtnCopy);

    console.log(promoBtnCopy);
  }
};
export default adaptiveElements;
