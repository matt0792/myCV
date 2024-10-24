let albumImages = document.querySelectorAll(".album-image");
let albumDescription = document.getElementById("album-description");
let albumTitle = document.getElementById("album-title");
let portLinks = document.getElementById("portLinks")

let albumTitles = [
  "A Biography of Decay (2023)",
  "GHOST IN THE MACHINE (2024)",
  "Flower Gardens and the Company of Growing Things (TBA)",
];

let albumDescriptions = [
  "An experimental 7-track electronic album that focuses on storytelling and sound design",
  "Heavily distorted basslines and deep rhythmic grooves on a 6 track dance EP",
  "Soft, gentle piano tones accompanied by glistening textural pads",
];

let activeAlbum = null;

// Add mouseover event listener to change description text and add active class 
albumImages.forEach((album) => {
  album.addEventListener("mouseover", () => {
    if (activeAlbum) {
      activeAlbum.classList.remove("active");
    }
    album.classList.add("active");
    activeAlbum = album;
    let index = album.getAttribute("data-index");
    albumTitle.textContent = albumTitles[index];
    albumDescription.textContent = albumDescriptions[index];
    portLinks.classList.remove("hidden")
  });
});
