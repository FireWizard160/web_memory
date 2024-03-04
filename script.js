
let pairsFound = 0;
let isSecondClick = false;
let timerInterval;
let cardArray = [];
let trys = 0;

function setName() {
    var name = prompt("Bitte gib deinen Namen ein:");

    var nameDisplay = document.getElementById("name");
    nameDisplay.textContent = "Spieler: " + name;
}

function startTimer() {
    var seconds = 0;
    var timerDisplay = document.getElementById("timer");

    timerInterval = setInterval(function() {
        seconds++;
        timerDisplay.textContent = "Zeit: " + seconds + " Sekunden";

        if (pairsFound === 8) {
            clearInterval(timerInterval);
            alert("You Win!");
        }
    }, 1000);
}


function createArray() {
    let cardNumber = 1;

    for (let i = 0; i < 4; i++) {
        cardArray[i] = [];

        for (let j = 0; j < 4; j++) {
            let card = document.createElement("img");
            card.src = "pics/memoryBg.png";
            card.id = "pics/card" + cardNumber + ".png";
            if (cardNumber === 8) {
                cardNumber = 1;
            } else {
                cardNumber++;
            }
            card.onclick = function () {
                clickCard(card);
            }
            cardArray[i][j] = card;
        }
    }
    cardArray = shuffle2DArray(cardArray);
}

function createBoard(){
    let spielbereich = document.getElementById("spielbereich");
    spielbereich.innerHTML = ""; // Löschen Sie das Spielfeld, bevor Sie neue Karten hinzufügen

    for (let i = 0; i < 4; i++) {
        let row = document.createElement("div");
        spielbereich.appendChild(row);

        for (let j = 0; j < 4; j++) {
            row.appendChild(cardArray[i][j]);
        }
    }
}

let openCard;
function clickCard(card) {
    console.log("Clicked card:", card);
    if (!isSecondClick) {
        card.src = card.id;
        openCard = card;
        isSecondClick = true;
    } else {
        trys++;
        card.src = card.id;
        if (card.id === openCard.id) {
            setTimeout(function () {

                openCard.src = "pics/memoryFound.png";
                card.src = "pics/memoryFound.png";
                pairsFound++;
                card.onclick = null;
                openCard.onclick = null;
            },1000);


        } else {

            setTimeout(function() {
                openCard.src = "pics/memoryBg.png";
                card.src = "pics/memoryBg.png";
            }, 1000);
        }
        isSecondClick = false;

    }
    // Anzeige der Versuche aktualisieren
    let tryDisplay = document.getElementById("trys");
    tryDisplay.textContent = "Versuche: " + trys;
}



function shuffle2DArray(array) {
    // Für jedes Element im 2D-Array
    for (let i = array.length - 1; i > 0; i--) {
        for (let j = array[i].length - 1; j > 0; j--) {
            // Zufällig auswählen eines anderen Elements
            const randomRow = Math.floor(Math.random() * (i + 1));
            const randomCol = Math.floor(Math.random() * (j + 1));

            // Vertauschen der Werte
            [array[i][j], array[randomRow][randomCol]] = [array[randomRow][randomCol], array[i][j]];
        }
    }
    return array;
}

window.onload = function() {
    setName();
    startTimer();
    createArray();
    createBoard();
};
