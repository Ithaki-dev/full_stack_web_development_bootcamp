//  create a function that tells us how many days, weeks and months we have left if we live until 90 years old.
function timeLeftUntil90(age) {
    var yearsLeft = 90 - age;
    var daysLeft = yearsLeft * 365;
    var weeksLeft = Math.floor(daysLeft / 7);
    var monthsLeft = yearsLeft * 12;

    console.log("You have " + daysLeft + " days, " + weeksLeft + " weeks, and " + monthsLeft + " months left.");
}

// Call the function with your current age
timeLeftUntil90(30); // Replace 30 with your current age