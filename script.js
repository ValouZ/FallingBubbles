const bubbleContainer = document.getElementById("app-bubble-container");
let circle = document.querySelector(".circle");

class Bubble {
    diameter = 50;
    red = 255;
    blue = 255;
    green = 255;
    constructor(diameter, red, blue, green) {
        this.diameter = diameter;
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.color = "rgb(" + red + "," + green + "," + blue + ")";
    }
}  

// let firstBubble = new Bubble();

// Ajout des évènements à la page
bubbleContainer.addEventListener("mousemove", callMoveCircle);
// bubbleContainer.addEventListener("mousemove", function(e){ moveCircle(e, new Bubble());} );
bubbleContainer.addEventListener("mousedown", createBubble);
// bubbleContainer.addEventListener("mouseup", addBubble);
// bubbleContainer.addEventListener("click", function(e){ addBubble(e, newBubble);} );

function callMoveCircle(event){
    moveCircle(event, new Bubble());
}

function createBubble(event){
    let diameter = getRandomInt(25, 150) * 2;
    let red = getRandomInt(0, 256);
    let green = getRandomInt(0, 256);
    let blue = getRandomInt(0, 256);
    let bubble = new Bubble(diameter, red, blue, green);
    bubbleContainer.removeEventListener("mousemove", callMoveCircle);
    bubbleContainer.addEventListener("mousemove", callMoveCircle);
    moveCircle(event, bubble);
    // addBubble(event, bubble);
}

function moveCircle(event, bubble) {
	TweenLite.to(circle, 0, {
        css: {
            width: bubble.diameter,
            height: bubble.diameter,
            background: bubble.color, 
            left: event.clientX + (bubble.diameter / 2),
            top: event.clientY + (bubble.diameter / 2)
        }
    });
}

// On ajoute une nouvelle bulle à la page
function addBubble(event, bubble){
    
    console.log(bubble);
    let x = event.clientX - (bubble.diameter / 2);
    let y = event.clientY - (bubble.diameter / 2);
    // console.log("X - " + x + " / Y - " + y);
    let displayedBubble = document.createElement("div");

    displayedBubble.classList.add("bubble");
    displayedBubble.style.backgroundColor = bubble.color;
    displayedBubble.style.width = bubble.diameter + "px";
    displayedBubble.style.height = bubble.diameter + "px";
    displayedBubble.style.left = x + "px";
    displayedBubble.style.top = y + "px";

    // circle.style.backgroundColor = bubble.color;
    // circle.style.width = bubble.diameter + "px";
    // circle.style.height = bubble.diameter + "px";

    bubbleContainer.appendChild(displayedBubble);
    makeBubblesFall(10);
}

// Fait tomber les bulles si il y en a un nombre = au nombre choisit
function makeBubblesFall(numberOfBubbles){
    let bubbles = document.getElementsByClassName("bubble");
    if (bubbles.length >= numberOfBubbles){
        for(let i = 0; i < bubbles.length; i++){
            bubbles[i].classList.add("fall")
        }
        bubbleContainer.removeEventListener("click", addBubble);
        setTimeout( () => {
            while (bubbles.length > 0){
                bubbleContainer.removeChild(bubbles[bubbles.length - 1]);
            }
            bubbleContainer.addEventListener("click", addBubble);
        }, 2200);
    }
}

// Permet de générer des nombres aléatoires
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
