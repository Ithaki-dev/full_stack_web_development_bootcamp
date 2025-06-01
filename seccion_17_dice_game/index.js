var number = Math.floor(Math.random() * 6) + 1; // Genera un número aleatorio entre 1 y 6
console.log("Número aleatorio generado:", number);
// Use the random number you created in the last step to pick out a random dice image between dice1.png to dice 6.png then place this image inside the left <img> element.
var diceImage_player_1 = "dice" + number + ".png";
console.log("Nombre de la imagen del dado:", diceImage_player_1);
var diceImageElement = document.querySelector(".img1"); // Selecciona el elemento <img> de la izquierda
diceImageElement.setAttribute("src", "images/" + diceImage_player_1); // Establece el atributo src de la imagen

// Now do the same for the right player
var number2 = Math.floor(Math.random() * 6) + 1; // Genera un segundo número aleatorio entre 1 y 6
console.log("Número aleatorio generado para el segundo jugador:", number2);
var diceImage_player_2 = "dice" + number2 + ".png";
console.log("Nombre de la imagen del dado del segundo jugador:", diceImage_player_2);
var diceImageElement2 = document.querySelector(".img2"); // Selecciona el elemento <img> de la derecha
diceImageElement2.setAttribute("src", "images/" + diceImage_player_2); // Establece el atributo src de la imagen del segundo jugador
// Now use an if/else statement to change the h1 text to show which player won.
if (number > number2) {
    document.querySelector("h1").innerHTML = "Player 1 Wins!";
} else if (number < number2) {
    document.querySelector("h1").innerHTML = "Player 2 Wins!";
} else {
    document.querySelector("h1").innerHTML = "It's a Draw!";
}