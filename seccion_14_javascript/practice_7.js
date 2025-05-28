// Make a function to calculate the BMI (Body Mass Index) of a person
function bmiCalculator(weight, height) {
    if (weight / (height * height) > 25) {
        return "You are overweight.";
    }
    else if (weight / (height * height) < 18.5) {
        return "You are underweight.";
    } else {
        return "You have a normal weight.";
    }
}

// Example usage:
console.log(bmiCalculator(70, 1.75));