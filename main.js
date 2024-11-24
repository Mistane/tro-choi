
const words = ["Hifumi daisuki", "dark dark bruh bruh", "shinonome ena"];
const rows = document.querySelector(".container__row");
const button = document.querySelector(".btn");

display = function(){
    words.map((word) => {
        let rowAnswer = document.createElement("div");
        rowAnswer.classList.add("row__ans");

        let rowBG = document.createElement("div");
        rowBG.classList.add("row__ans--background");
        for(let i = 0; i < word.length; i++){
            //tao row box
            let rowBox = document.createElement("span");
            rowBox.classList.add("row__box");

            //tao background box
            let backgroundBox = document.createElement("span");
            backgroundBox.classList.add("background__box");

            if(word[i] == ' ') continue;
            rowBox.innerHTML = `${word[i]}`;
            console.log(rowBox);
            rowAnswer.append(rowBox);
            rowBG.append(backgroundBox);
            
        }
        rowAnswer.append(rowBG);
        rows.append(rowAnswer);
    })
}

display();

const answers = document.querySelectorAll(".row__ans");

answers.forEach((answer) => {
    answer.addEventListener("click", ()=>{
        const background = answer.querySelector(".row__ans--background");
        const backgroundBox = answer.querySelectorAll(".background__box");
        background.classList.toggle("active");
        backgroundBox.forEach((box)=>{
            box.classList.toggle(".active");
        })
    })  
})
