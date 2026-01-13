const sizeBtn = document.querySelector(".size-btn");
const rainbowBtn = document.querySelector(".rainbow");
const darkenBtn = document.querySelector(".darken-btn");
const toggelgrid = document.querySelector(".toggle-grid-line");
const clearBtn = document.querySelector(".clear");
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

    sqr.addEventListener("mouseover", () => {
      if (isDrawing) {
        sqr.classList.add("draw");
      }
    });

    container.appendChild(sqr);
  }
}

let sliderValue = document.querySelector(".slider-value");

slider.addEventListener("input", () => {
  container.innerHTML = "";
  sliderValue.textContent = `${slider.value}x${slider.value}`;
  sqrValue = slider.value;
  fillGrid();
});

document.addEventListener("mouseover", (e) => {
  if (isDrawing) {
    if (e.target.classList.contains("rainbowMode")) {
      e.target.style.backgroundColor = getRandomRGB();
    }
    if (e.target.classList.contains("darkenMode")) {
      e.target.style.backgroundColor = "black";
      let currOpc = parseFloat(e.target.style.opacity) || 0;
      if (currOpc < 1) {
        e.target.style.opacity = currOpc + 0.2;
      }
    }
  }
});

function setRainbowMode() {
  const square = document.querySelectorAll(".sqr");
  square.forEach((s) => {
    s.classList.toggle("rainbowMode");
  });
}

rainbowBtn.addEventListener("click", (e) => {
  setRainbowMode();
  e.target.classList.toggle("active-button");
});

function setDarkenMode() {
  const square = document.querySelectorAll(".sqr");
  square.forEach((s) => {
    s.classList.toggle("darkenMode");
  });
}

darkenBtn.addEventListener("click", (e) => {
  setDarkenMode();
  e.target.classList.toggle("active-button");
});

// rainbowBtn.addEventListener("click", () => {
//   const sqr = document.querySelectorAll(".sqr");
//   sqr.forEach((s) => {
//     s.addEventListener("mouseover", () => {
//       if (isDrawing) {
//         s.style.backgroundColor = getRandomRGB();
//       }
//     });
//   });
// });

// darkenBtn.addEventListener("click", () => {
//   const sqr = document.querySelectorAll(".sqr");
//   sqr.forEach((s) => {
//     s.addEventListener("mouseover", () => {
//       if (isDrawing) {
//         s.style.backgroundColor = "black";
//         let currOpc = parseFloat(s.style.opacity) || 0;
//         if (currOpc < 1) {
//           s.style.opacity = currOpc + 0.2;
//         }
//       }
//     });
//   });
// });

toggelgrid.addEventListener("click", () => {
  container.classList.toggle("show-border");
  container.classList.toggle("hide-border");
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
