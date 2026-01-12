const sizeBtn = document.querySelector(".size-btn");
const container = document.querySelector(".container");

let sqrValue = 16;

fillGrid();

sizeBtn.addEventListener("click", () => {
    removeGrid();
    sqrValue = parseInt(prompt("Enter the no. of square/side (1 to 100):"));
    fillGrid();
});

function removeGrid(){
    container.innerHTML = "";
}

function fillGrid(){
    for(let i=0; i<sqrValue*sqrValue; i++){
        const sqr = document.createElement("div");
        sqr.classList.add("grid");
        sqr.style.width = `${100/sqrValue}%`;
        sqr.style.height = `${100/sqrValue}%`;

        // sqr.addEventListener("mouseenter", e =>{
        //     e.target.style.backgroundColor = "red";
        // });

        sqr.addEventListener("mouseenter", () => {
            sqr.classList.add("hover");
        });

        container.appendChild(sqr);
    }
}

