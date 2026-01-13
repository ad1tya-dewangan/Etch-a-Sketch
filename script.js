const sizeBtn = document.querySelector(".size-btn");
const rainbowBtn = document.querySelector(".rainbow");
const darkenBtn = document.querySelector(".darken-btn");
const toggelgrid = document.querySelector(".toggle-grid-line");
const clearBtn = document.querySelector(".clear");
const container = document.querySelector("#grid-container");

let isDrawing = false;

window.addEventListener("mousedown", () => isDrawing = true);
window.addEventListener("mouseup", () => isDrawing = false);

let sqrValue = 16; //default grid size
fillGrid();

function fillGrid(){
    for(let i=0; i<sqrValue*sqrValue; i++){
        const sqr = document.createElement("div");
        sqr.classList.add("sqr");
        sqr.style.width = `${100/sqrValue}%`;
        sqr.style.height = `${100/sqrValue}%`;

        sqr.addEventListener("dragstart", e => e.preventDefault()); // stop default drag behaviour of browser 

        sqr.addEventListener("mouseover", () => {
            if(isDrawing){
                sqr.classList.add("draw");
            }
        });

        container.appendChild(sqr);
    }
}

sizeBtn.addEventListener("click", () => {
    container.innerHTML = "";
    sqrValue = parseInt(prompt("Enter the no. of square/side (1 to 100):"));
    if(sqrValue !== null){
        return alert("invalid number");
    }
    
    if(sqrValue >= 1 && sqrValue <= 100){
        fillGrid();
    }
    else{
        sqrValue = parseInt(prompt("Please Enter a number in the range of 1 to 100 only :"));
        fillGrid();
    }
});

rainbowBtn.addEventListener("click", () => {
    const sqr = document.querySelectorAll(".sqr");
    sqr.forEach((s) => {
        s.addEventListener("mouseover", () => {
            if (isDrawing) {
                s.style.backgroundColor = getRandomRGB();
            }
        });
    })
});

darkenBtn.addEventListener("click", () => {
    const sqr = document.querySelectorAll(".sqr");
    sqr.forEach((s) => {
        s.addEventListener("mouseover" , () => {
            if (isDrawing) {
                s.style.backgroundColor = "black";
                let currOpc = parseFloat(s.style.opacity) || 0;
                if (currOpc < 1) {
                    s.style.opacity = currOpc + 0.1;
                }
            }
        })
    })
})

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
function getRandomRGB(){
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}
