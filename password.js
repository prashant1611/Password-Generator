const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector(".password-lengthNumber");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const upperCaseCheck = document.querySelector(".upper-letter");
const lowerCaseChech = document.querySelector(".lower-letter");
const numberCheck = document.querySelector(".number");
const symbolCheck = document.querySelector(".symbol");
const indicator = document.querySelector(".data-indicator");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = "~`!@#$%^&*()_+?><,./}{][";

var password = "";
let passwordLength = 10;
let checkCount = 0;

handleSlider();

// set passwordLength
function handleSlider() {
  inputSlider.value = passwordLength;
  lengthDisplay.innerText = passwordLength;
}

//set Indicator
function setIndicator(color) {
  indicator.style.backgroundColor = color;
  //set shadow in indicator
}

//generate random integer
function getRanInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//generate random Number
function generateRandomNumber() {
  return getRanInteger(0, 9);
}

//generate random lowercase letter
function generateLowerCase() {
  return String.fromCharCode(getRanInteger(97, 122));
}

//generate random uppercase letter
function generateUpperCase() {
  return String.fromCharCode(getRanInteger(65, 90));
}

//to select random symbol
function generateSymbol() {
  const randNum = getRanInteger(0, symbols.length);
  return symbols.charAt(randNum);
}

//function to calculate strength of passward
function calcStrength() {
  let hasUpper = false;
  let hasLower = false;
  let hasNum = false;
  let hasSym = false;

  if (upperCaseCheck.checked) hasUpper = true;
  if (lowerCaseChech.checked) hasLower = true;
  if (numberCheck.checked) hasNum = true;
  if (symbolCheck.checked) hasSys = true;

  if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
    setIndicator("#0f0");
  } else if (
    (hasLower || hasUpper) &&
    (hasNum || hasSym) &&
    passwordLength >= 6
  ) {
    setIndicator("#ff0");
  } else {
    setIndicator("#f00");
  }
}

// now we create function for copy content
async function copyContent() {
  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "copied";
  } catch (e) {
    copyMsg.innerText = "failed";
  }

  //to make copy span visible

  copyMsg.classList.add("active");

  setTimeout(() => {
    copyMsg.classList.remove("active");
  }, 2000);
}

//event listener on slider
inputSlider.addEventListener("input", (e) => {
  passwordLength = e.target.value;
  handleSlider();
});

//event listener to copy content
copyBtn.addEventListener("click", () => {
  if (passwordDisplay.value) copyContent();
});

//event listener on checkbox to find box is checked or not

allCheckBox.forEach((checkbox) => {
  checkbox.addEventListener("change", handleCheckBoxChange);
});

function handleCheckBoxChange() {
  checkCount = 0;
  allCheckBox.forEach((check) => {
    if (check.checked) checkCount++;
  });

  //special condition for password
  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }
}
//shuffle password
function shufflePassword(array) {
  //fisher Yates Method
  for (let i = array.length - 1; i > 0; i--) {
    //random
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  let str = "";
  array.forEach((element) => {
    str += element;
  });
  return str;
}

//now we add addevent listener on generate password
generateBtn.addEventListener("click", () => {


  if (checkCount == 0) return;

  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }

  password = "";

  let funcArr = [];


  if (upperCaseCheck.checked) funcArr.push(generateUpperCase);

  if (lowerCaseChech.checked) funcArr.push(generateLowerCase);

  if (numberCheck.checked) funcArr.push(generateRandomNumber);

  if (symbolCheck.checked) funcArr.push(generateSymbol);

 

  for (let i = 0; i < funcArr.length; i++) {

    password += funcArr[i]();
 
  }



  for (let i = 0; i < passwordLength - funcArr.length; i++) {
    let randIndex = getRanInteger(0, funcArr.length);
    password += funcArr[randIndex]();
  }

  password = shufflePassword(Array.from(password));
  passwordDisplay.value = password;
  calcStrength();
});
