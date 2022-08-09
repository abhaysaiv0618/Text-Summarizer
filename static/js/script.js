const startButton = document.querySelector(".start");
const headingSection = document.querySelector(".heading-section");
const chooseLangSection = document.querySelector(".choose-language");

const englishButton = document.querySelector(".English");
const spanishButton = document.querySelector(".Spanish");
const frenchButton = document.querySelector(".French");
const germanButton = document.querySelector(".German");
const italianButton = document.querySelector(".Italian");

const inputText = document.querySelector(".input-text");
const summarizeButton = document.getElementById("btn-summarize");
const inputTextBox = document.getElementById("input-text-box");
const inputLenBox = document.getElementById("input-length-box");

const tryAgain = document.getElementById("try-again");

let language;

startButton.addEventListener("click", function () {
  //headingSection.classList.add("hidden");
  startButton.classList.add("hidden");
  chooseLangSection.classList.remove("hidden");
  // window.open("templates/summary.html");
});

englishButton.addEventListener("click", function () {
  language = "English";
  openLangInput(language);
});

spanishButton.addEventListener("click", function () {
  language = "Spanish";
  openLangInput(language);
});

frenchButton.addEventListener("click", function () {
  language = "French";
  openLangInput(language);
});

germanButton.addEventListener("click", function () {
  language = "German";
  openLangInput(language);
});

italianButton.addEventListener("click", function () {
  language = "Italian";
  openLangInput(language);
});

summarizeButton.addEventListener("click", function () {
  if (inputTextBox.value != "" && inputLenBox.value != "") {
    inputText.classList.add("hidden");
    let text = inputTextBox.value;
    let length = inputLenBox.value;
    chooseLangSection.classList.add("hidden");
    let dict_values = { text, length, language };
    const j = JSON.stringify(dict_values);
    $.ajax({
      url: "/test",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(j),
      success: function (result) {
        $("#p1").html(result);
      },
    });

    document.querySelector(".the-summary").classList.remove("hidden");
    document.getElementById("try-again").classList.remove("hidden");
  } else {
    alert("Fill in all input boxes neccessary!");
  }
});

tryAgain.addEventListener("click", function () {
  document.querySelector(".the-summary").classList.add("hidden");
  chooseLangSection.classList.remove("hidden");
  inputTextBox.value = "";
  inputLenBox.value = "";
  tryAgain.classList.add("hidden");
});

//functions
function openLangInput(language) {
  inputText.classList.remove("hidden");
  document.getElementById(
    "input-text-box"
  ).placeholder = `Insert ${language} Text `;
}
