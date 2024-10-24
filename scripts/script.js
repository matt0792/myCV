// Get elements
let centerCircle = document.getElementById("mainCircle");
let smallCircle = document.querySelectorAll(".small-circle")
let arrow = document.getElementById("arrow");
let backgroundElement = document.querySelector(".background");
let themeCycle = document.getElementById("themeCycle")
let swell = document.getElementById("swell")
let click = document.getElementById("click")

// Function to play audio
function playSwell() {
  swell.play()
}

// Easy way to scale effect
let movementStrength = 30;
let weight = 0.9;

// Array of preset gradients
let gradients = [
  "linear-gradient(45deg, #1e00ff, #ff00f2)",
  "linear-gradient(45deg, #fff025, #ff3300)",
  "linear-gradient(45deg, #1500ff, #1aff00)",
  "linear-gradient(45deg, #1500ff, #ff8400)",
];

let theme = JSON.parse(sessionStorage.getItem("theme")) || "";

$(document).ready(function () {
  if (theme === "") {
    newGradient();
  } else {
    setTheme();
  }
});

// Function to choose and set a new gradient
function newGradient() {
  // Chooses a random theme from array
  let randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

  // Set the gradient on the .background::before element
  backgroundElement.style.setProperty("--gradient", randomGradient);

  // Save to sessionStorage
  sessionStorage.setItem("theme", JSON.stringify(randomGradient));
}

function setTheme() {
  // Set the gradient on the .background::before element
  let gradient = JSON.parse(sessionStorage.getItem("theme"));
  backgroundElement.style.setProperty("--gradient", gradient);
}

// Add click event listener to center circle
document.getElementById("mainCircle").addEventListener("click", function () {
  this.classList.toggle("active");
  if (centerCircle.classList.contains("active")) {
    playSwell()
    indexContainer.classList.remove("hidden-cursor");
    arrow.classList.add("hidden");
    themeCycle.classList.remove("hidden")
    movementStrength = 0;
    weight = 1;
  } else {
    indexContainer.classList.add("hidden-cursor");
    arrow.classList.remove("hidden");
    themeCycle.classList.add("hidden")
    movementStrength = 30;
    arrow.innerHTML = '<i class="bi bi-arrow-right">';
    weight = 0.9;
  }
});

// Track mouse movement for parallax effect
document.addEventListener("mousemove", function (e) {
  // Find mouse position in window
  const pageX = e.pageX - window.innerWidth / 2;
  const pageY = e.pageY - window.innerHeight / 2;

  // Calculate offset
  const newX = (pageX / window.innerWidth) * movementStrength;
  const newY = (pageY / window.innerHeight) * movementStrength;

  // Apply effect
  centerCircle.style.transform = `translate(${newX}px, ${newY}px)`;
});

// Arrow position and rotation
// Track mouse movement
document.addEventListener("mousemove", function (e) {
  // Get mouse position
  const mouseX = e.pageX;
  const mouseY = e.pageY;

  // Get the center circle position
  const centerCircleRect = centerCircle.getBoundingClientRect();
  const centerX = centerCircleRect.left + centerCircleRect.width / 2;
  const centerY = centerCircleRect.top + centerCircleRect.height / 2;

  // calculate arrow position
  const arrowX = centerX + -20 + (mouseX - centerX) * weight;
  const arrowY = centerY + (mouseY - centerY) * weight;

  arrow.style.left = arrowX + "px";
  arrow.style.top = arrowY + "px";

  // Find angle between arrow and circle
  const angle =
    Math.atan2(centerY - mouseY, centerX - mouseX) * (180 / Math.PI);

  // Rotate arrow towards circel
  arrow.style.transform = `rotate(${angle}deg)`;
});

function clickPlay() {
  click.play()
}

// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function () {
  let smallLink = document.querySelectorAll(".small-link");

  smallLink.forEach(function (smallLink) {
    // Add event listener for mouseover (hover)
    smallLink.addEventListener("mouseover", clickPlay);
  });
});