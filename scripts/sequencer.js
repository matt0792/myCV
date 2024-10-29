// Add click event listener to center circle
let channelButton = document.querySelectorAll(".channel-button");
channelButton.forEach(function (channelButton) {
  channelButton.addEventListener("click", function () {
    this.classList.toggle("active");
    if (channelButton.classList.contains("active")) {
    } else {
    }
  });
});

let intervalRate = 280;
let intervalId;
let currentStep = 0;
let stepIndicators = document.querySelectorAll(".step-indicator");
let kick = document.getElementById("kick");
let hat = document.getElementById("hat");
let snare = document.getElementById("snare");
let open = document.getElementById("open");
let chordI = document.getElementById("chordI");
let chordV = document.getElementById("chordV");
let chordVI = document.getElementById("chordVI");
let chordIV = document.getElementById("chordIV");
let channel1 = document.querySelectorAll(".ch1");
let channel2 = document.querySelectorAll(".ch2");
let channel3 = document.querySelectorAll(".ch3");
let channel4 = document.querySelectorAll(".ch4");

let chordArray = [chordI, chordV, chordVI, chordIV];

let generateChords = false;

const totalIndicators = stepIndicators.length;
const angleIncrement = 360 / totalIndicators;

stepIndicators.forEach((indicator, index) => {
  const angle = angleIncrement * index;
  indicator.style.transform = `rotate(${angle}deg) translate(0, -30px)`;
});

function updateInterval() {
  clearInterval(intervalId);
  intervalId = setInterval(loopSteps, intervalRate);
}

function loopSteps() {
  // Check the current step before updating classes
  if (
    stepIndicators[currentStep].classList.contains("active") &&
    channel1[currentStep].classList.contains("active")
  ) {
    kick.play();
  }
  if (
    stepIndicators[currentStep].classList.contains("active") &&
    channel2[currentStep].classList.contains("active")
  ) {
    hat.play();
  }
  if (
    stepIndicators[currentStep].classList.contains("active") &&
    channel3[currentStep].classList.contains("active")
  ) {
    snare.play();
  }
  if (
    stepIndicators[currentStep].classList.contains("active") &&
    channel4[currentStep].classList.contains("active")
  ) {
    open.play();
  }

  if (generateChords === true && (currentStep == 0 || currentStep == 7)) {
    randomChord();
  }

  // Remove 'active' class from all steps
  stepIndicators.forEach((indicator) => indicator.classList.remove("active"));

  // Move to the next step
  currentStep = (currentStep + 1) % stepIndicators.length;

  // Add 'active' class to the current step
  stepIndicators[currentStep].classList.add("active");
}

function increaseTempo() {
  if (intervalRate > 250) {
    intervalRate /= 1.13;
    updateInterval();
  }
}

function tempoMinus() {
  intervalRate *= 1.13;
  updateInterval();
}

document.addEventListener("DOMContentLoaded", () => {
  updateInterval();
});

function playChordI() {
  chordI.play();
}
function playChordV() {
  chordV.play();
}
function playChordVI() {
  chordVI.play();
}
function playChordIV() {
  chordIV.play();
}

let previousNumber = null;

function randomChord() {
  let randomNumber;
  do {
    randomNumber = Math.floor(Math.random() * 4);
  } while (randomNumber === previousNumber);

  previousNumber = randomNumber;

  let chordToPlay = chordArray[randomNumber];
  chordToPlay.play();
}

// Select the checkbox element
let switchInput = document.getElementById("chordGenSwitch");

// Add an event listener to toggle generateChords
switchInput.addEventListener("change", function () {
  generateChords = this.checked;
});
