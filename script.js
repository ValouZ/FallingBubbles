const bubbleContainer = document.getElementById("app-bubble-container");
let circle = document.querySelector(".circle");
// On randomize le nombre de bulles sur la page
let numberOfBubbles = getRandomInt(10, 21);

// La classe Bubble va permettre d'instancier des bulles avec des nouvelles propriétés à chaque fois
class Bubble {
    constructor(diameter, red, blue, green) {
        this.diameter = diameter;
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.color = "rgb(" + red + "," + green + "," + blue + ")";
    }
}  

// On crée une bulle à l'initialisation pour que la bulle 
// qui sert de curseur ai les bonnes proriétés
let bubble = createBubble();

// Ajout des évènements à bubbleContainer
bubbleContainer.addEventListener("mousemove", (event) => { moveCircle(event, bubble) });
bubbleContainer.addEventListener("click", addBubble);

// Fonction permettant la création d'une nouvelle bulle totalement aléatoire
function createBubble(){
    let diameter = getRandomInt(25, 150) * 2;
    let red = getRandomInt(0, 256);
    let green = getRandomInt(0, 256);
    let blue = getRandomInt(0, 256);
    return (new Bubble(diameter, red, blue, green));
}

// Fonction permet de déplacer notre bulle curseur en lui attribuant les bonnes couleur
function moveCircle(event, bubble) {
    // On attribue les propriétés css suivante à la div ayant pour classe circle
	TweenLite.to(circle, 0, {
        css: {
            width: bubble.diameter,
            height: bubble.diameter,
            background: bubble.color, 
            // Position de la bulle horizontalement
            left: event.clientX - (bubble.diameter / 2),
            // Position de la bulle verticalement
            top: event.clientY - (bubble.diameter / 2)
        }
    });
}

// On ajoute une nouvelle bulle à bubbleContainer
function addBubble(event){
    // On récupère sa position en X et en Y qu'on centre
    let x = event.clientX - (bubble.diameter / 2);
    let y = event.clientY - (bubble.diameter / 2);

    // Création d'une nouvelle div qui permettra la création d'une bulle
    let displayedBubble = document.createElement("div");

    // Ajout de toutes les spécificités de la bulle par rapport aux données 
    // aléatoires de l'objet bubble
    displayedBubble.classList.add("bubble");
    displayedBubble.style.backgroundColor = bubble.color;
    displayedBubble.style.width = bubble.diameter + "px";
    displayedBubble.style.height = bubble.diameter + "px";
    displayedBubble.style.left = x + "px";
    displayedBubble.style.top = y + "px";

    // Ajout de la nouvelle bulle à bubbleContainer
    bubbleContainer.appendChild(displayedBubble);
    // Réinitialisation de la bulle avec de nouvelles propriétés
    bubble = createBubble();
    // On appelle moveCircle ici uniquement pour actualiser l'affichage du curseur
    moveCircle(event, bubble);
    // Au bout de x (parametre) bulles, on les faits tomber
    makeBubblesFall(numberOfBubbles);
}

// Fait tomber les bulles si il y en a un nombre = au nombre passé en paramètre
function makeBubblesFall(nB){
    // On récupère l'ensemble des bulles de bubbleContainer
    let bubbles = document.getElementsByClassName("bubble");
    if (bubbles.length == nB){
        // On réinitialise le nombre de bulles affichables à l'écran
        numberOfBubbles = getRandomInt(10, 21);
        // Ajout de la classe fall à chaque bulles
        for(let i = 0; i < bubbles.length; i++){
            bubbles[i].classList.add("fall");
        }
        // On empêche l'utilisateur de rajouter des bulles en même temps que l'animation se lance
        bubbleContainer.removeEventListener("click", addBubble);    
        // On supprime une à une les bulles de bubbleContainer et on remet l'écoute d'ajout de bulles à la fin du timer
        setTimeout( () => {
            while (bubbles.length > 0){
                bubbleContainer.removeChild(bubbles[bubbles.length - 1]);
            }
            bubbleContainer.addEventListener("click", addBubble);
        }, 2000);
    }
}

// Permet de générer des nombres aléatoires
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}