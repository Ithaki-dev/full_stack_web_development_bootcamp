// Make a fucntion to calculate the BMI (Body Mass Index) of a person
function calculateBMI(weight, height) {
    if (height <= 0) {
        throw new Error("Height must be greater than zero.");
    }
    return "The BMI is: " + (weight / (height * height));
}

// Example usage:
console.log(calculateBMI(70, 1.75));