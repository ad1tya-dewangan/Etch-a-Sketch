const colorPicker = document.querySelector("#color-picker");
const penBtn = document.querySelector("#pen-btn");
const rainbowBtn = document.querySelector("#rainbow");
const darkenBtn = document.querySelector("#darken-btn");
const toggelgrid = document.querySelector("#toggle-grid-line");
const clearBtn = document.querySelector("#clear");
const container = document.querySelector("#grid-container");
const slider = document.querySelector(".slider");

let isDrawing = false;

window.addEventListener("mousedown", () => (isDrawing = true));
window.addEventListener("mouseup", () => (isDrawing = false));

let sqrValue = 16; //default grid size
fillGrid();

function fillGrid() {
  for (let i = 0; i < sqrValue * sqrValue; i++) {
    const sqr = document.createElement("div");
    sqr.classList.add("sqr");
    sqr.style.width = `${100 / sqrValue}%`;
    sqr.style.height = `${100 / sqrValue}%`;

    sqr.addEventListener("dragstart", (e) => e.preventDefault()); // stop default drag behaviour of browser

    container.appendChild(sqr);
  }
}

const sliderValue = document.querySelector(".slider-value");

slider.addEventListener("input", () => {
  container.innerHTML = "";
  sliderValue.textContent = `${slider.value}x${slider.value}`;
  sqrValue = slider.value;
  fillGrid();
});

let currentMode = "penMode";

document.addEventListener("mouseover", (e) => {
  if (isDrawing && e.target.classList.contains("sqr")) {
    if (currentMode === "penMode") {
      e.target.style.backgroundColor = `${colorPicker.value}`;
    } else if (currentMode === "rainbowMode") {
      e.target.style.backgroundColor = getRandomRGB();
      e.target.style.opacity = "1";
    } else if (currentMode === "darkenMode") {
      e.target.style.backgroundColor = "black";
      let currOpc = parseFloat(e.target.style.opacity) || 0;
      if (currOpc < 1) {
        e.target.style.opacity = currOpc + 0.2;
      }
    }
  }
});

penBtn.classList.add("active-button");

penBtn.addEventListener("click", (e) => {
  if (currentMode !== "penMode") {
    currentMode = "penMode";
    penBtn.classList.add("active-button");
    rainbowBtn.classList.remove("active-button");
    darkenBtn.classList.remove("active-button");
  }
});

rainbowBtn.addEventListener("click", (e) => {
  if (currentMode === "rainbowMode") {
    currentMode = "penMode";
    rainbowBtn.classList.remove("active-button");
    penBtn.classList.add("active-button");
  } else {
    currentMode = "rainbowMode";
    rainbowBtn.classList.add("active-button");
    penBtn.classList.remove("active-button");
    darkenBtn.classList.remove("active-button");
  }
});

darkenBtn.addEventListener("click", (e) => {
  if (currentMode === "darkenMode") {
    currentMode = "penMode";
    darkenBtn.classList.remove("active-button");
    penBtn.classList.add("active-button");
  } else {
    currentMode = "darkenMode";
    darkenBtn.classList.add("active-button");
    penBtn.classList.remove("active-button");
    rainbowBtn.classList.remove("active-button");
  }
});

toggelgrid.addEventListener("click", () => {
  container.classList.toggle("show-border");
  container.classList.toggle("hide-border");
  toggelgrid.classList.toggle("active-button");
});

clearBtn.addEventListener("click", () => {
  const sqr = document.querySelectorAll(".sqr");
  sqr.forEach((s) => {
    s.style.backgroundColor = "";
    s.style.opacity = "";
    s.classList.remove("draw");
  });
});

//function to get random rgb color
function getRandomRGB() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}
