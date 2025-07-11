document.querySelectorAll(".drum").forEach(function(button) {
  button.addEventListener("click", handleClick);
});

function handleClick() {
    var buttonInnerHTML = this.innerHTML;
    // Add a class to animate the button when clicked
    switch (buttonInnerHTML) {
        case "w":
            var tom1 = new Audio("sounds/tom-1.mp3");
            tom1.play();
            break;
        case "a":
            var tom2 = new Audio("sounds/tom-2.mp3");    
            tom2.play();
            break;
        case "s":
            var tom3 = new Audio("sounds/tom-3.mp3");      
            tom3.play();
            break;
        case "d":
            var tom4 = new Audio("sounds/tom-4.mp3");
            tom4.play();
            break;
        case "j":
            var snare = new Audio("sounds/snare.mp3");
            snare.play();
            break;
        case "k":
            var kick = new Audio("sounds/kick-bass.mp3");          
            kick.play();
            break;
        case "l":
            var crash = new Audio("sounds/crash.mp3");            
            crash.play();
            break;
        default:
            console.log(buttonInnerHTML);
    }
}

document.addEventListener("keydown", function(event) {
    var key = event.key;
    // Add a class to animate the button when pressed
    switch (key) {
        case "w":
            var tom1 = new Audio("sounds/tom-1.mp3");
            tom1.play();
            break;
        case "a":
            var tom2 = new Audio("sounds/tom-2.mp3");    
            tom2.play();
            break;
        case "s":
            var tom3 = new Audio("sounds/tom-3.mp3");      
            tom3.play();
            break;
        case "d":
            var tom4 = new Audio("sounds/tom-4.mp3");
            tom4.play();
            break;
        case "j":
            var snare = new Audio("sounds/snare.mp3");
            snare.play();
            break;
        case "k":
            var kick = new Audio("sounds/kick-bass.mp3");          
            kick.play();
            break;
        case "l":
            var crash = new Audio("sounds/crash.mp3");            
            crash.play();
            break;
        default:
            console.log(key);
    }
});

// Add animation to the button when clicked
document.querySelectorAll(".drum").forEach(function(button) {
    button.addEventListener("click", function() {
        this.classList.add("pressed");
        setTimeout(() => {
            this.classList.remove("pressed");
        }, 100);
    });
});
// Add animation to the button when a key is pressed
document.addEventListener("keydown", function(event) {
    var key = event.key;
    var button = document.querySelector("." + key);
    if (button) {
        button.classList.add("pressed");
        setTimeout(() => {
            button.classList.remove("pressed");
        }, 100);
    }
});
