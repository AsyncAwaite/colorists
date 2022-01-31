import IMask from "imask";
export default class Form {
  constructor(forms) {
    this.forms = document.querySelectorAll(forms);
    this.inputs = document.querySelectorAll("input");
    this.message = {
      loading: "assets/icons/spinner.svg",
      success: "Спасибо! Скоро мы с вами свяжемся!",
      failure: "Что-то пошло не так...",
    };
    this.path = "/assets/services/telegramBot.php";
    this.req = {
      phone: false,
      name: false,
  
    };
  }

  clearInputs() {
    this.inputs.forEach((item) => {
      item.value = "";
      item.classList.remove("valid");
      this.req.phone = false;
      this.req.name = false;

    
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
      if (input.name === "name") {
        this.checkNameInput(input);
      } else if ( input.name === "tel") {
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


  disabledBtn () {

    this.forms.forEach((form) => {
   
  


      const submitBtn = form.querySelector(".btn__form");
    
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
    this.forms.forEach((item) => {
      item.addEventListener("submit", (e) => {

        e.preventDefault();
        let loadMessage = document.createElement('img');
        loadMessage.src =  this.message.loading;
        loadMessage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;
        messageBox.insertAdjacentElement('afterbegin', loadMessage); 
        if (this.req.phone && this.req.name) {
   
          const formData = new FormData(item);
          this.postData(this.path, formData)
            .then((res) => {
         
              messageBox.innerHTML = "";
              closeModal(".modal");
              setTimeout(() => {
        
                openModal(".modal", "data-thank");
              }, 1000);
             
            })
            .catch(() => {
              messageBox.textContent = this.message.failure;
            })
            .finally(() => {
              this.clearInputs();

              setTimeout(() => {
                
                closeModal(".modal");
              }, 5000);
            });
        } else {
          if (!this.req.phone && !this.req.name) {
            messageBox.textContent = `пожалуйста заполните номер телефона и Ваше имя`;
            setTimeout(() => {
              messageBox.textContent = "";
            }, 5000);
          } else if (!this.req.name) {
            messageBox.textContent = `введите Ваше имя`;
            setTimeout(() => {
              messageBox.textContent = "";
            }, 5000);
          } else {
            messageBox.textContent = `пожалуйста заполните номер телефона`;
            setTimeout(() => {
              messageBox.textContent = "";
            }, 5000);
          }
        }
      });
    });

  }
}
