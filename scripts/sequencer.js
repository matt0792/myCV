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

let intervalRate = 500;
let intervalId;
let currentStep = 0;
let stepIndicators = document.querySelectorAll(".step-indicator");
let kick = document.getElementById("kick");
let hat = document.getElementById("hat");
let snare = document.getElementById("snare");
let fx = document.getElementById("fx");
let channel1 = document.querySelectorAll(".ch1");
let channel2 = document.querySelectorAll(".ch2");
let channel3 = document.querySelectorAll(".ch3");
let channel4 = document.querySelectorAll(".ch4");

const totalIndicators = stepIndicators.length;
const angleIncrement = 360 / totalIndicators;

stepIndicators.forEach((indicator, index) => {
  const angle = angleIncrement * index;
  indicator.style.transform = `rotate(${angle}deg) translate(0, -60px)`;
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
    fx.play();
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
    console.log("New interval rate:", intervalRate);
    updateInterval();
  }
}

function tempoMinus() {
  intervalRate *= 1.13;
  console.log("New interval rate:", intervalRate);
  updateInterval();
}

document.addEventListener("DOMContentLoaded", () => {
  updateInterval();
});
