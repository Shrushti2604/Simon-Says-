let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
document.getElementById("start-btn").addEventListener("click", startGame);
document.addEventListener("keypress", startGame);

function startGame() {
    if (!started) {
        console.log("Game Started");
        started = true;
        levelUp();
    }
}

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    // Generate a new color and flash it
    let randomIdx = Math.floor(Math.random() * 4);
    let randomColor = btns[randomIdx];
    gameSeq.push(randomColor);
    console.log(gameSeq);
    let randbtn = document.getElementById(randomColor);
    gameFlash(randbtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over!! Your Score was <b>${level}</b><br> Press any key to start`;
        document.querySelector("body").style.color = "red";

        setTimeout(function () {
            reset();
            document.querySelector("body").style.color = "white";
        }, 1500);
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
    btn.addEventListener("touchstart", function(event) {
        event.preventDefault(); // Prevent default touch behavior
        btnPress.call(this); // Call btnPress with the correct context
    });
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}