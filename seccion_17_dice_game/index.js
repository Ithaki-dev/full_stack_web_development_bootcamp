var number = Math.floor(Math.random() * 6) + 1; // Genera un número aleatorio entre 1 y 6
console.log("Número aleatorio generado:", number);
// Use the random number you created in the last step to pick out a random dice image between dice1.png to dice 6.png then place this image inside the left <img> element.
var diceImage = "dice" + number + ".png";
console.log("Nombre de la imagen del dado:", diceImage);
var diceImageElement = document.querySelector(".img1"); // Selecciona el elemento <img> de la izquierda
diceImageElement.setAttribute("src", "images/" + diceImage); // Establece el atributo src de la imagen
