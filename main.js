const words = [
  "chua tri",
  "mia mai",
  "do khoc do cuoi",
  "gay cuoi",
  "phe phan",
  "dao duc",
];
const rows = document.querySelector(".container__row");
const button = document.querySelector(".btn");

display = function () {
  words.map((word, index) => {
    let rowAnswer = document.createElement("div");
    rowAnswer.classList.add("row__ans");
    rowAnswer.classList.add(`row${index + 1}`);
    rowAnswer.setAttribute("data-set", `${index}`);

    let rowBG = document.createElement("div");
    rowBG.classList.add("row__ans--background");
    for (let i = 0; i < word.length; i++) {
      //tao row box
      let rowBox = document.createElement("span");
      rowBox.classList.add("row__box");

      //tao background box
      let backgroundBox = document.createElement("span");
      backgroundBox.classList.add("background__box");

      if (word[i] == " ") continue;
      rowBox.innerHTML = `${word[i]}`;
      // console.log(rowBox);
      rowAnswer.append(rowBox);
      rowBG.append(backgroundBox);
    }
    rowAnswer.append(rowBG);
    rows.append(rowAnswer);
  });
};

display();

// const answers = document.querySelectorAll(".row__ans");

// answers.forEach((answer) => {
//     answer.addEventListener("click", ()=>{
//         const background = answer.querySelector(".row__ans--background");
//         const backgroundBox = answer.querySelectorAll(".background__box");
//         background.classList.toggle("active");
//         backgroundBox.forEach((box)=>{
//             box.classList.toggle(".active");
//         })
//     })
// })

//Fisher-Yates algorithm
function swap(string) {
  let arr = string.split("");

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr.join(" / ");
}

function change(string) {
  let arr = "";
  for (let i = 0; i < string.length; i++) {
    if (string[i] === " ") continue;
    arr += string[i];
  }
  return arr;
}

const errorMessage = ["Vấn đề kĩ năng", "Quá kém", "Quá yếu"];
const validMessage = ["Noice", "10 điểm", "sugoi", "ok bố hết ý tưởng"];
function printMSG(number){
  if(number === 1){
    let random = Math.floor(Math.random() * errorMessage.length);
    return errorMessage[random];
  }else if(number === 2){
    let random = Math.floor(Math.random() * validMessage.length);
    return validMessage[random];
  }
}

const panel = document.querySelector(".button-container");
const row__answer = document.querySelectorAll(".row__ans");
let panelSelected = false;

row__answer.forEach((row) => {
  row.addEventListener("click", (e) => {
    if (panelSelected) return;

    panel.style.display = "flex";
    panelSelected = true;
    const value = e.currentTarget.dataset.set;
    console.log(value);
    panel.innerHTML = `<div class="answer__panel">
            <p class="answer__msg"></p>
            <div class="answer__exit"><i class="fa-solid fa-x"></i></div>
            <p class="answer__hint">${swap(change(words[value]))}</p>
            <div class="answer__nav">
                <button type="submit" class="answer__submit"><i class="fa-solid fa-magnifying-glass"></i></button>
                <input type="text" class="answer__input" id="answer__input" placeholder="Không cho 10đ -> cắt đồng" autocomplete="off">
            </div>
        </div>`;

    const tmp = words[value];
    const answer__msg = document.querySelector(".answer__msg");
    const submit = document.querySelector(".answer__submit");
    const inputField = document.querySelector(".answer__input");
    const exit = document.querySelector(".answer__exit");
    const check = row.querySelector(".row__ans--background");

    submit.addEventListener("click", handleSubmit);

    function handleSubmit() {
      const answer = inputField.value;
      if(answer == "") return;
      console.log(answer);
      console.log(answer === tmp);
      if (answer == tmp) {
        answer__msg.classList.remove("error");
        answer__msg.classList.add("valid");
        answer__msg.innerHTML = printMSG(2);
        check.classList.add("active");
        
        panelSelected = false;
      } else{
        answer__msg.classList.remove("valid");
        answer__msg.classList.add("error");
        answer__msg.innerHTML = printMSG(1);
        
      }
        
      inputField.value = "";
    }

    exit.addEventListener("click", ()=>{
      panel.style.display = "none";
      panelSelected = false;
    })
  });
});
