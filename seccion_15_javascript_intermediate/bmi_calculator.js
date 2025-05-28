function bmiCalculator (weight, height) {
    var bmi = weight / (height * height);
    // get the rounded value of bmi
    bmi = Math.round(bmi * 10) / 10; // Round to one decimal place
    var interpretation;
    if (bmi > 24.9) {
        interpretation = "Your BMI is " + bmi + ". You are overweight.";
    }
    if (bmi < 18.5) {
        interpretation = "Your BMI is " + bmi + ". You are underweight.";
    } 
    if(bmi >= 18.5 && bmi <= 24.9 ) {
        interpretation = "Your BMI is " + bmi + ". You have a normal weight.";
    }
    return interpretation;
}