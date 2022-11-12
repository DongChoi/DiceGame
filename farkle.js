"use strict";

let diceArr = [];
let diceValueCounter = {};
let prevDicePoints = 0;
let currentDicePoints = 0;
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
  console.log("rolling or rerolling some die! Lady luck be with you");
  for (let i = 0; i < 6; i++) {
    if (diceArr[i].clicked === 0) {
      const dieIdBeingRolled = i + 1;

      //   console.log("die id thats being rolled", dieIdBeingRolled);
      diceArr[i].value = Math.floor(Math.random() * 6 + 1);
      updateDiceImg(dieIdBeingRolled);
    }
  }
  checkForPoints(diceArr);
  console.log(diceValueCounter);
  //   console.log("New values for the Die", diceArr);
}

/* Handle dice click */
function diceClick(img) {
  let i = img.getAttribute("data-number");
  //   console.log(i);
  img.classList.toggle("transparent");
  if (diceArr[i].clicked === 0) {
    diceArr[i].clicked = 1;
  } else {
    diceArr[i].clicked = 0;
  }
}

//Check for house rules to add up potential points
function checkForPoints(diceArr) {
  for (let i = 0; i < 6; i++) {
    if (diceArr[i].clicked == 0) {
      const rolledNumber = diceArr[i].value;
      if (rolledNumber in diceValueCounter) {
        diceValueCounter[rolledNumber]++;
        checkForTriple(rolledNumber);
      } else {
        diceValueCounter[rolledNumber] = 1;
      }
    }
  }
  console.log(diceValueCounter);
  checkForOneAndFives();
  diceValueCounter = {};
}

function checkForOneAndFives() {
  let fiveScore = 0;
  let oneScore = 0;
  if (5 in diceValueCounter && diceValueCounter[5] <= 2) {
    fiveScore = ROLLEDFIVE * diceValueCounter[5];
    currentDicePoints = fiveScore;
    const p = document.createElement("p");
    p.innerHTML = `You have rolled ${diceValueCounter[5]} five for 
		  ${fiveScore} points!`;
    document.querySelector(".announcement").append(p);
  }
  if (1 in diceValueCounter && diceValueCounter[1] <= 2) {
    oneScore = ROLLEDFIVE * diceValueCounter[1];
    currentDicePoints = oneScore;
    const p = document.createElement("p");
    p.innerHTML = `You have rolled ${diceValueCounter[1]} five for 
		  ${oneScore} points!`;
    document.querySelector(".announcement").append(p);
  }
  return fiveScore + oneScore;
}

function checkForTriple(rolledNumber) {
  let score = 0;
  if (diceValueCounter[rolledNumber] == 3) {
    score = TRIPLES[rolledNumber];
    const p = document.createElement("p");
    p.innerHTML = `You have rolled a triple of ${rolledNumber} for 
		  ${TRIPLES[rolledNumber]} points!`;
    document.querySelector(".announcement").append(p);
  }
  return score;
}

/*Updating images of dice given values of rollDice*/
function updateDiceImg(dieId) {
  //   console.log("updatingDiceImg");
  let diceImageName = `images/${diceArr[dieId - 1].value}.png`;
  //   console.log("Whats the die id?", dieId);
  document.getElementById(`die${dieId}`).setAttribute("src", diceImageName);
}
