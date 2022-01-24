import IMask from "imask";
export default class Form {
  constructor(forms) {
    this.forms = document.querySelectorAll(forms);
    this.inputs = document.querySelectorAll("input");
    this.message = {
      loading: "Загрузка...",
      success: "Спасибо! Скоро мы с вами свяжемся!",
      failure: "Что-то пошло не так...",
    };
    this.path = "/assets/services/telegramBot.php";
    this.req = {
      phone: false,
      name: false,
      email: false,
      oferta: false,
      policy: false
    };
  }

  clearInputs() {
    this.inputs.forEach((item) => {
      item.value = "";
      item.classList.remove("valid");
      this.req.phone = false;
      this.req.name = false;
      this.req.oferta = false;
      this.req.policy = false;
      this.req.email = false;
      // item.nextElementSibling.textContent = "";
    });
  }
  createMask(input) {
    let maskOptions = {
      mask: "+38 (000) 000 - 00 - 00",
      lazy: false,
    };
    let mask = new IMask(input, maskOptions);
  }

  checkInputs() {
    let inputs = document.querySelectorAll(".form__input");
    inputs.forEach((input) => {
      if (input.name === "wbe-name") {
        this.checkNameInput(input);
      } else if (input.name === "wbe-email") {
        this.checkEmailInput(input);
      } else if ( input.name === "wbe-tel" && !input.classList.contains('ru')) {
        this.checkPhoneInput(input);
      } 
      
      else {
        return;
      }
    });
  }
  checkNameInput(input) {
    input.addEventListener("keypress", function (e) {
      if (e.key.match(/[\d]/gi)) {
        e.preventDefault();
      }
    });
    input.addEventListener("input", () => {
      if (input.value.length > 2) {
 
        input.classList.add("valid");
        input.classList.remove("invalid");
        // input.nextElementSibling.textContent = "";
        this.req.name = true;
      } else {
        input.classList.add("invalid");
        input.classList.remove("valid");
        // input.nextElementSibling.textContent = "Введите Ваше имя";
      }
    });
  }
  checkPhoneInput(input) {
    this.createMask(input);
    input.addEventListener("input", () => {
      if (input.value.indexOf("_") === -1) {
     
        input.classList.add("valid");
        input.classList.remove("invalid");
        // input.nextElementSibling.textContent = "";
        this.req.phone = true;
      } else {
        input.classList.add("invalid");
        input.classList.remove("valid");
        // input.nextElementSibling.textContent =            "Введите номер согласно шаблона";
      }
    });
  }

  checkEmailInput(input) {
    input.addEventListener("input", () => {
      let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (reg.test(input.value) == true) {
        input.classList.add("valid");
        input.classList.remove("invalid");
        this.req.email = true;
      } else {
        input.classList.add("invalid");
        input.classList.remove("valid");
      }
    });
  }

  disabledBtn () {

    this.forms.forEach((form) => {
      const chekBox = form.querySelectorAll(".form__checkbox");
  


      const submitBtn = form.querySelector(".btn__form");
      chekBox.forEach((item) => {
     console.log(item)
        item.addEventListener("click", function () {
          if (this.classList.contains("active")) {
            console.log(this)
            this.classList.remove("active");
            // this.classList.add("this");
            submitBtn.classList.add("disabled");
            return;
          } else {
            console.log(1)
            submitBtn.classList.remove("disabled");
            this.classList.add("active");
            // this.classList.remove("this");
            return;
          }
        });
      });
    });
  }

  async postData(url, data) {
    let res = await fetch(url, {
      method: "POST",
      body: data,
    });
    return await res.text();
  }

  init() {
    // this.checkPhoneInputs();
    this.checkInputs();
    // this.disabledBtn();
    

  }
}
