let secretNumber, attemptsNumber;
let maxNumber = 10;
let outNumbers = [];
let winSound = new Audio("sounds/winBell.wav");
let wrongSound = new Audio("sounds/errorXP.wav");
let newGameSound = new Audio("sounds/newgame.wav");
initialConditions();

function asignarTextoElemento(element, text) {
    let x = document.querySelector(element);
    x.innerHTML = text;
}

function verifyEnter(e) {
    if (e.keyCode === 13) {
        verifyTry();
    }
}
function verifyTry() {
    let userNumber = parseInt(document.getElementById("inputUserNumber").value);
    if (userNumber === secretNumber) {
        asignarTextoElemento("p", `Well done! You guessed the number! (In ${attemptsNumber} ${attemptsNumber == 1 ? "attempt" : "attempts"})`);
        winSound.play();
        document.getElementById("reboot").removeAttribute("disabled");
    } else {
        if (userNumber < secretNumber) {
            asignarTextoElemento("p", "The secret number is higher");
        } else {
            asignarTextoElemento("p", "The secret number is lower");
        }
        attemptsNumber++;
        wrongSound.play();
        cleanNumberBox();
    }
}

function newGame() {
    initialConditions();
    cleanNumberBox();
    document.querySelector("#reboot").setAttribute("disabled", "true");
    newGameSound.play();
}

function initialConditions() {
    asignarTextoElemento("h1", "Secret Number Game");
    asignarTextoElemento("p", `Enter a number from 1 to ${maxNumber}`);
    secretNumber = randomNumberGenerator();
    attemptsNumber = 1;
}

function randomNumberGenerator() {
    let generateNumber = Math.floor(Math.random() * maxNumber) + 1;
    if (outNumbers.includes(generateNumber)) {
        if (outNumbers.length < maxNumber) {
            return randomNumberGenerator();
        } else {
            let lastNumber = outNumbers[maxNumber - 1]; // Sirve maxNumber por ser números continuos. Para que el último no se repita con el primero del nuevo array limpio.
            outNumbers = [lastNumber];
            return randomNumberGenerator();
        }
    } else {
        outNumbers.push(generateNumber);
        return generateNumber;
    }
}

function cleanNumberBox() {
    document.querySelector("#inputUserNumber").value = "";
}