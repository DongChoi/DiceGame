"use strict";

let diceArr = [];
let diceValueCounter = {};
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
  document.querySelector(".potential-score").innerHTML = 0;
  console.log("rolling or rerolling some die! Lady luck be with you");
  diceValueCounter = {};
  diceClickedCounter = {};
  for (let i = 0; i < 6; i++) {
    if (diceArr[i].clicked === 0) {
      const dieIdBeingRolled = i + 1;

      diceArr[i].value = Math.floor(Math.random() * 6 + 1);
      updateDiceImg(dieIdBeingRolled);
    }
  }
  let score = checkForPoints(diceArr, diceValueCounter);
  if (score == 0) {
    alert("BUSTED!");
    document.querySelector(
      ".dice"
    ).innerHTML = `<img src="images/1.png" id="die1" data-number="0" onclick="diceClick(this)">
	  <img src="images/2.png" id="die2" data-number="1" onclick="diceClick(this)">
	  <img src="images/3.png" id="die3" data-number="2" onclick="diceClick(this)">
	  <img src="images/4.png" id="die4" data-number="3" onclick="diceClick(this)">
	  <img src="images/5.png" id="die5" data-number="4" onclick="diceClick(this)">
	  <img src="images/6.png" id="die6" data-number="5" onclick="diceClick(this)">`;
  }
}

/* Handle dice click */
function diceClick(img) {
  let i = img.getAttribute("data-number");
  const clickedNumber = diceArr[i].value;
  img.classList.toggle("transparent");
  if (diceArr[i].clicked === 0) {
    diceArr[i].clicked = 1;
    if (clickedNumber in diceClickedCounter) {
      diceClickedCounter[clickedNumber]++;
      let triplePoints = checkForTriple(diceClickedCounter, clickedNumber);
      if (triplePoints && clickedNumber == 1) {
        clickedPoints -= 200;
      } else if (clickedNumber == 1) {
        clickedPoints += 100;
      }
      if (triplePoints && clickedNumber == 5) {
        clickedPoints -= 100;
      } else if (clickedNumber == 5) {
        clickedPoints += 50;
      }
      clickedPoints += triplePoints;
      clickedPoints += checkForOneAndFives(diceClickedCounter, clickedNumber);
    } else {
      diceClickedCounter[clickedNumber] = 1;
      clickedPoints += checkForOneAndFives(diceClickedCounter);
    }
  } else {
    diceArr[i].clicked = 0;
    diceClickedCounter[clickedNumber]--;
    if (diceClickedCounter[clickedNumber] == 0) {
      delete diceClickedCounter[clickedNumber];
    }
    if (diceClickedCounter[clickedNumber] == 2) {
      clickedPoints -= TRIPLES[clickedNumber];
    }
    if (clickedNumber == 1) {
      clickedPoints -= ROLLEDONE;
    }
    if (clickedNumber == 5) {
      clickedPoints -= ROLLEDFIVE;
    }
  }
  document.querySelector(".potential-score").innerHTML = clickedPoints;
}

//Check for house rules to add up potential points
function checkForPoints(diceArr, diceCounter) {
  let score = 0;
  for (let i = 0; i < 6; i++) {
    if (diceArr[i].clicked == 0) {
      const rolledNumber = diceArr[i].value;
      if (rolledNumber in diceCounter) {
        diceCounter[rolledNumber]++;
        score += checkForTriple(rolledNumber);
      } else {
        diceCounter[rolledNumber] = 1;
      }
    }
  }
  score += checkForOneAndFives(diceCounter);
  return score;
}

// checks if there are any ones and fives less than triple
function checkForOneAndFives(diceCounter) {
  console.log("checking for ones and fives", diceCounter);
  let fiveScore = 0;
  let oneScore = 0;
  if (5 in diceCounter && diceCounter[5] <= 2) {
    fiveScore = ROLLEDFIVE * diceCounter[5];
    const p = document.createElement("p");
    p.innerHTML = `You have rolled ${diceCounter[5]} five for 
		  ${fiveScore} points!`;
    document.querySelector(".announcement").append(p);
  }
  if (1 in diceCounter && diceCounter[1] <= 2) {
    oneScore = ROLLEDONE * diceCounter[1];
    const p = document.createElement("p");
    p.innerHTML = `You have rolled ${diceCounter[1]} one for 
		  ${oneScore} points!`;
    document.querySelector(".announcement").append(p);
  }
  console.log(fiveScore + oneScore);
  return fiveScore + oneScore;
}

// checks if there are any triples in the set
function checkForTriple(diceCounter, rolledNumber) {
  let score = 0;
  if (diceCounter[rolledNumber] == 3) {
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
  const dieIndex = dieId - 1;
  let diceImageName = `images/${diceArr[dieIndex].value}.png`;
  //   console.log("Whats the die id?", dieId);
  document.getElementById(`die${dieId}`).setAttribute("src", diceImageName);
}

function bankScore() {
  document.querySelector(".score").innerHTML = clickedPoints;
  document.querySelector(".potential-score").innerHTML = 0;
  clickedPoints = 0;
  handleWin();
}

function handleWin() {
  if (document.querySelector(".score").innerHTML >= 1000) {
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
