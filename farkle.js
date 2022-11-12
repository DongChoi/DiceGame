"use strict";

let diceArr = [];
let clickedDicearr = [];
let diceRolledCounter = {};
let diceClickedCounter = {};
let prevDicePoints = 0;
let clickedPoints = 0;
const ROLLEDONE = 100;
const ROLLEDFIVE = 50;
const TRIPLES = {
  1: 1000,
  2: 200,
  3: 300,
  4: 400,
  5: 500,
  6: 600,
};

function initializeDice() {
  for (let i = 0; i < 6; i++) {
    diceArr[i] = {};
    diceArr[i].id = "die" + (i + 1);
    diceArr[i].value = i + 1;
    diceArr[i].clicked = 0;
  }
}

/*Rolling dice values*/
function rollDice() {
  prevDicePoints += clickedPoints;
  clickedPoints = 0;
  document.querySelector(".potential-score").innerHTML = prevDicePoints;
  console.log("rolling or rerolling some die! Lady luck be with you");
  diceRolledCounter = {};
  diceClickedCounter = {};
  clickedDicearr = [];
  for (let i = 0; i < 6; i++) {
    if (diceArr[i].clicked === 0) {
      const dieIdBeingRolled = i + 1;

      diceArr[i].value = Math.floor(Math.random() * 6 + 1);
      updateDiceImg(dieIdBeingRolled);
    }
  }
  let score = checkForPoints(diceArr, diceRolledCounter);
  if (score == 0) {
    handleBust();
  }
}
function handleBust() {
  alert("OMG YOU BUSTED");
  document.querySelector(
    ".dice"
  ).innerHTML = `<img src="images/1.png" id="die1" data-number="0" onclick="diceClick(this)">
<img src="images/2.png" id="die2" data-number="1" onclick="diceClick(this)">
<img src="images/3.png" id="die3" data-number="2" onclick="diceClick(this)">
<img src="images/4.png" id="die4" data-number="3" onclick="diceClick(this)">
<img src="images/5.png" id="die5" data-number="4" onclick="diceClick(this)">
<img src="images/6.png" id="die6" data-number="5" onclick="diceClick(this)">`;
}

/* Handle dice click */
function diceClick(img) {
  let i = img.getAttribute("data-number");
  img.classList.toggle("transparent");
  if (diceArr[i].clicked === 0) {
    diceArr[i].clicked = 1;
    clickedDicearr.push(diceArr[i]);
  } else {
    diceArr[i].clicked = 0;
    const index = clickedDicearr.indexOf(diceArr[i]);
    clickedDicearr.splice(index, 1);
  }
  clickedPoints = checkForClickedPoints(clickedDicearr, diceClickedCounter);
  document.querySelector(".potential-score").innerHTML =
    prevDicePoints + clickedPoints;
  console.log(diceClickedCounter);
}

//Check for house rules to add up potential points
function checkForPoints(dieArr, diceCounter) {
  let score = 0;
  for (let i = 0; i < dieArr.length; i++) {
    if (dieArr[i].clicked == 0) {
      const rolledNumber = dieArr[i].value;

      if (rolledNumber in diceCounter) {
        diceCounter[rolledNumber]++;
        if (rolledNumber == 1) {
          score += 100;
          if (diceCounter[rolledNumber] == 3) {
            score += TRIPLES[1] - 200;
          }
        } else if (rolledNumber == 5) {
          score += 50;
          if (diceCounter[rolledNumber] == 3) {
            score += TRIPLES[5] - 100;
          }
        } else {
          if (diceCounter[rolledNumber] == 3) {
            score += TRIPLES[rolledNumber];
          }
        }
      } else {
        diceCounter[rolledNumber] = 1;
        if (rolledNumber == 1) {
          score += 100;
        }
        if (rolledNumber == 5) {
          score += 50;
        }
      }
    }
  }
  console.log(score);
  return score;
}

function checkForClickedPoints(dieArr, diceCounter) {
  let score = 0;
  for (let i = 0; i < dieArr.length; i++) {
    const rolledNumber = dieArr[i].value;

    if (rolledNumber in diceCounter) {
      diceCounter[rolledNumber]++;
      if (rolledNumber == 1) {
        score += 100;
        if (diceCounter[rolledNumber] == 3) {
          score += TRIPLES[1] - 300;
        }
      } else if (rolledNumber == 5) {
        score += 50;
        if (diceCounter[rolledNumber] == 3) {
          score += TRIPLES[5] - 150;
        }
      } else {
        if (diceCounter[rolledNumber] == 3) {
          score += TRIPLES[rolledNumber];
        }
      }
    } else {
      diceCounter[rolledNumber] = 1;
      if (rolledNumber == 1) {
        score += 100;
      }
      if (rolledNumber == 5) {
        score += 50;
      }
    }
  }
  diceClickedCounter = {};
  console.log(score);
  return score;
}
/*Updating images of dice given values of rollDice*/
function updateDiceImg(dieId) {
  //   console.log("updatingDiceImg");
  const dieIndex = dieId - 1;
  let diceImageName = `images/${diceArr[dieIndex].value}.png`;
  //   console.log("Whats the die id?", dieId);
  document.getElementById(`die${dieId}`).setAttribute("src", diceImageName);
}

function bankScore() {
  document.querySelector(".score").innerHTML = prevDicePoints + clickedPoints;
  document.querySelector(".potential-score").innerHTML = 0;
  clickedPoints = 0;
  handleWin();
}

function handleWin() {
  if (document.querySelector(".score").innerHTML >= 10000) {
    alert("YOU WIN!");
  }
  document.querySelector(
    ".dice"
  ).innerHTML = `<img src="images/1.png" id="die1" data-number="0" onclick="diceClick(this)">
  <img src="images/2.png" id="die2" data-number="1" onclick="diceClick(this)">
  <img src="images/3.png" id="die3" data-number="2" onclick="diceClick(this)">
  <img src="images/4.png" id="die4" data-number="3" onclick="diceClick(this)">
  <img src="images/5.png" id="die5" data-number="4" onclick="diceClick(this)">
  <img src="images/6.png" id="die6" data-number="5" onclick="diceClick(this)">`;
}
