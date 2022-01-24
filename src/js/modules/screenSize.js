const screenSize = function () {
  const callback = document.querySelector("#callback");
  const text = callback.querySelector(".callback__text");
  const icon = callback.querySelector(".phone-icon");
  const close = callback.querySelector(".close");
  let over = false;
  icon.addEventListener("mouseover", () => {
    
   if (!over) {
    show();
    over = true;
   }
     
    
    
  });
 
  close.addEventListener("click", (e) => {
    e.stopPropagation();
    show();
    over = false;
  });
  function show() {
    text.classList.toggle("show");
    icon.classList.toggle("show");
  }
};

export default screenSize;
