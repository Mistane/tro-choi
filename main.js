const words = [
  "CHUA TRI",
  "MIA MAI",
  "DO KHOC DO CUOI",
  "GAY CUOI",
  "PHE PHAN",
  "DAO DUC",
];
const container = document.querySelector(".container__row");

display = function () {
  words.map((word, index) => {
    let row = document.createElement("div");
    row.classList.add("row__ans");
    row.classList.add(`row${index + 1}`);
    row.setAttribute("data-set", `${index}`);

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
      row.append(rowBox);
      rowBG.append(backgroundBox);
    }
    row.append(rowBG);
    container.append(row);
  });
};

display();
// tao duoc het dong row ‐-------------------------------------

//Fisher-Yates algorithm
function randomize(string) {
  let arr = string.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join(" / ");
}

function change(string) {
  let tmp = string.toLowerCase();
  let arr = "";
  for (let i = 0; i < string.length; i++) {
    if (string[i] === " ") continue;
    arr += tmp[i];
  }
  return arr;
};

function dots(selector, message){
  let dot = "";
  let cnt = 0;
  const tmp = document.querySelector(selector);
  
  const interval = setInterval(() => {
    dot += ".";
    tmp.textContent = dot;
    ++cnt;
    
    if(cnt === 3){
      clearInterval(interval);
      setTimeout(() => {
        tmp.textContent = message;
      }, 250);
    }
  }, 750);
}

const errorMessage = ["Vấn đề kĩ năng", "Quá kém", "Quá yếu", "Không tập trung"];
const validMessage = ["Noice", "10 điểm", "sugoi", "ok bố hết ý tưởng"];
function printMSG(number){
  if(number === 2){
    let random = Math.floor(Math.random() * errorMessage.length);
    return errorMessage[random];
  }else if(number === 1){
    let random = Math.floor(Math.random() * validMessage.length);
    return validMessage[random];
  }
}

const panel = document.querySelector(".button-container");
const row__answer = document.querySelectorAll(".row__ans");
let panelSelected = false;

row__answer.forEach((row) => {
  row.addEventListener("click", (e) => {
    const value = e.currentTarget.dataset.set; // bat value hien tai
    if (panelSelected) return;
    panel.style.display = "flex";
    panelSelected = true;
    panel.innerHTML = `<div class="answer__panel">
            <p class="answer__msg"></p>
            <div class="answer__exit"><i class="fa-solid fa-x"></i></div>
            <p class="answer__hint">${randomize(change(words[value]))}</p>
            <div class="answer__nav">
                <button type="submit" class="answer__submit"><i class="fa-solid fa-magnifying-glass"></i></button>
                <input type="text" class="answer__input" id="answer__input" placeholder="Không cho 10đ -> cắt đồng" autocomplete="off">
            </div>
        </div>`;
        
        
    const inputField = document.querySelector(".answer__input");
    const answer = change(words[value]); // bat dap an
    const message = document.querySelector(".answer__msg");
    const submit = document.querySelector(".answer__submit");
   
    const exit = document.querySelector(".answer__exit");
    const rowBackground = row.querySelector(".row__ans--background");

    submit.addEventListener("click", () => handleSubmit(answer));
    
    inputField.addEventListener("input", () => {
      //rowBackground.classList.remove("error", "valid");
      message.innerHTML = "";
    });
    
    function handleSubmit(answer) {
    
      const userInput = change(inputField.value);
      if (userInput === "") {
        return;
      }
      inputField.value = "";
      message.innerHTML = ""
      message.classList.remove("valid", "error");
      
      let dot = "";
      let cnt = 0;
      const interval = setInterval(() => {
        dot += "●";
        message.innerHTML = dot;
        ++cnt;

        if (cnt === 3) {
          clearInterval(interval);
          setTimeout(() => {
            if (userInput == answer) {
              updateMessage(1);
              panel.style.display = "none";
              panelSelected = false;
            } else {
              updateMessage(2);
            }
          }, 500);
        }
      }, 500);
    }

    function updateMessage(number) {
      rowBackground.classList.remove("error", "valid");
      if (number === 1) {
        message.classList.remove("error");
        message.classList.add("valid");
        message.innerHTML = printMSG(1);
        rowBackground.classList.add("valid");
      } else if (number === 2) {
        message.classList.remove("valid");
        message.classList.add("error");
        message.innerHTML = printMSG(2);
        rowBackground.classList.add("error");
      }
    }

    exit.addEventListener("click", () => {
      rowBackground.classList.remove("error", "valid");
      panel.style.display = "none";
      panelSelected = false;
    })
  });
});
