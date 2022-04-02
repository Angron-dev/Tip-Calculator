class TipCalculator {
  constructor() {
    this.buttons = document.querySelectorAll("button");
    this.billInput = document.querySelector("#bill-input");
    this.peopleInput = document.querySelector("#people-input");
    this.tipResult = document.querySelector("#tip-result");
    this.totalResult = document.querySelector("#total-result");
    this.foreignCurrencyResult = document.querySelector("#foreign-currency");
    this.error = document.querySelector("#error");
    this.labelInput = document.querySelector("#label-input");
    this.select = document.querySelector(".currency__select");
    this.events();
  }
  events() {
    this.buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        for (let x = 0; x < this.buttons.length; x++) {
          this.buttons[x].classList.remove("active");
          this.buttons[x].classList.remove("customActive");
        }
        this.btnCheck(btn);
      });
    });
    this.billInput.addEventListener("input", () => {
      this.inputCheck();
    });
    this.peopleInput.addEventListener("input", () => {
      this.inputCheck();
    });
    this.select.addEventListener("change", () => {
      this.fetchApi(this.select);
      this.changeSybol(this.select);
    });
  }
  btnCheck(button) {
    if (button.value == "custom") {
      this.customBtn(button);
    } else if (button.value == "reset") {
      this.resetBtn(button);
    } else {
      this.regularBtn(button);
    }
  }
  inputCheck() {
    let buttonValue;
    for (let i = 0; i < this.buttons.length; i++) {
      if (this.buttons[i].classList.contains("active")) {
        buttonValue = this.buttons[i].value;
        this.displayResult(buttonValue);
      } else {
        if (this.buttons[i].classList.contains("customActive")) {
          buttonValue = this.buttons[i].children[0].value;
          this.displayResult(buttonValue);
        }
      }
    }
  }
  regularBtn(btn) {
    btn.classList.add("active");
    this.displayResult(btn.value);
  }
  customBtn(btn) {
    btn.classList.add("customActive");
    const customInput = btn.children[0];
    customInput.addEventListener("keyup", () => {
      this.displayResult(customInput.value);
    });
    customInput.addEventListener("click", () => {
      this.displayResult(customInput.value);
    });
  }
  resetBtn(btn) {
    this.error.style.display = "none";
    this.labelInput.style.border = "2px solid white";
    document.querySelector("#custom-input").value = "";
    btn.classList.add("disabled");
    btn.disabled = true;
    this.billInput.value = "";
    this.peopleInput.value = "";
    this.tipResult.innerText = "zł 0.00";
    this.totalResult.innerText = "zł 0.00";
    this.select.selectedIndex = null;
    this.foreignCurrencyResult.innerText = "zł 0.00";
  }
  count(buttonValue) {
    const tipOnPerson = (this.billInput.value * (buttonValue / 100)) / this.peopleInput.value;
    const result = this.errorCheck(tipOnPerson);
    return result;
  }
  displayResult(buttonValue) {
    const resetBtn = document.querySelector(".reset-btn");
    resetBtn.disabled = false;
    resetBtn.classList.remove("disabled");
    const result = this.count(buttonValue);
    if (result == undefined || result == 0) {
      this.tipResult.innerText = "zł 0.00";
      this.totalResult.innerText = "zł 0.00";
    } else {
      this.tipResult.innerText = "zł " + result[1].toFixed(2);
      this.totalResult.innerText = "zł " + result[0].toFixed(2);
      this.fetchApi(this.select);
    }
  }
  errorCheck(tipOnPerson) {
    if (this.peopleInput.value == "" || this.peopleInput.value < 1) {
      this.error.style.display = "block";
      this.labelInput.style.border = "2px solid red";
    } else {
      this.error.style.display = "none";
      this.labelInput.style.border = "2px solid white";
      const total = this.billInput.value / this.peopleInput.value + tipOnPerson;
      return [total, tipOnPerson];
    }
  }
  fetchApi(select) {
    let pln;
    if (select.value == "PLN") {
      pln = 1;
      this.displayExchange(pln);
    } else {
      fetch(`http://api.nbp.pl/api/exchangerates/rates/a/${select.value}/`)
        .then((response) => response.json())
        .then((data) => {
          const exchange = data.rates[0].mid;
          const exchangeToPln = 100 / exchange / 100;
          pln = Math.round(exchangeToPln * 100) / 100;
          this.displayExchange(pln);
        });
    }
  }
  displayExchange(pln) {
    let result = this.totalResult.innerText;
    if (result == "zł 0.00") {
      this.foreignCurrencyResult.innerText = this.changeSybol(this.select) + "0.00";
    } else {
      result = result.replace("zł ", "");
      result = Number(result);
      this.foreignCurrencyResult.innerText = this.changeSybol(this.select) + (result * pln).toFixed(2);
    }
  }
  changeSybol(select) {
    switch (select.value) {
      case "PLN":
        return "zł ";
      case "USD":
        return "$ ";
      case "EUR":
        return "€ ";
      case "GBP":
        return "£ ";
      case "UAH":
        return "₴ ";
      case "HUF":
        return "Ft ";
      case "ILS":
        return "₪ ";
      case "CHF":
        return "fr ";
      case "NOK":
        return "kr ";
    }
  }
}

const tipCalculator = new TipCalculator();
