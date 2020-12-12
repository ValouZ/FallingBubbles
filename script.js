const bubbleContainer = document.getElementById("app-bubble-container");

function Bubble(){
    this.diameter = getRandomInt(25,150) * 2;
    this.red = getRandomInt(0, 256);
    this.green = getRandomInt(0, 256);
    this.blue = getRandomInt(0, 256);
    this.color = "rgb(" + this.red + "," + this.green +"," + this.blue + ")";
}  

// Ajout de l'évènement à la page
bubbleContainer.addEventListener("click", addBubble);

// On ajoute une nouvelle bulle à la page
function addBubble(e){
    let bubble = new Bubble();
    let x = e.clientX - (bubble.diameter / 2);
    let y = e.clientY - (bubble.diameter / 2);
    console.log("X - " + x + " / Y - " + y);
    let displayedBubble = document.createElement("div");
    displayedBubble.classList.add("bubble");
    displayedBubble.style.backgroundColor = bubble.color;
    displayedBubble.style.width = bubble.diameter + "px";
    displayedBubble.style.height = bubble.diameter + "px";
    displayedBubble.style.left = x + "px";
    displayedBubble.style.top = y + "px";
    bubbleContainer.appendChild(displayedBubble);
    makeBubblesFall(10);
}

// Fait tomber les bulles si il y en a un nombre = au nombre choisit
function makeBubblesFall(numberOfBubbles){
    let bubbles = document.getElementsByClassName("bubble");
    if (bubbles.length == numberOfBubbles){
        for(let i = 0; i < bubbles.length; i++){
            bubbles[i].classList.add("fall");
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
