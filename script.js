// btns
const buttons = document.querySelectorAll("button");
//inputs
const billInput = document.querySelector("#bill-input");
const customInput = document.querySelector("#custom-input");
const peopleInput = document.querySelector("#people-input");
const inputs = document.querySelectorAll("input[type=number");
const labelInput = document.querySelector("#label-input");
// outputs
const error = document.querySelector("#error");
const tip = document.querySelector("#tip-result");
const totalTipOutput = document.querySelector("#total-result");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    for (let x = 0; x < buttons.length; x++) {
      buttons[x].classList.remove("active");
      buttons[x].classList.remove("customActive");
    }
    if (button.value == "custom") {
      button.classList.add("customActive");
    } else if (button.id == "reset-btn") {
      window.location.reload(true);
    } else {
      button.classList.add("active");
    }
    count();
  });
});
// apply function on inputs
for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("input", () => {
    count();
  });
}
// count function
const count = () => {
  buttons.forEach((button) => {
    let buttonValue = button.value;
    if (button.classList.contains("active")) {
      totalTip = billInput.value * (buttonValue / 100);
      check(totalTip);
    } else if (button.classList.contains("customActive")) {
      totalTip = billInput.value * (customInput.value / 100);
      check(totalTip);
    } else {
    }
  });
};
// error check
const check = (y) => {
  if (peopleInput.value == "" || peopleInput.value <= 0) {
    if (peopleInput.value < 0) {
      peopleInput.value = 0.0;
    }
    error.style.display = "block";
    labelInput.style.border = "2px solid red";
    tip.innerHTML = "$" + "0.00";
  } else {
    error.style.display = "none";
    labelInput.style.border = "2px solid white";
    tipOnPerson = y / peopleInput.value;
    totalTipOutput.innerHTML = "$" + Math.floor(totalTip * 100) / 100;
    tip.innerHTML = "$" + Math.floor(tipOnPerson * 100) / 100;
  }
};
