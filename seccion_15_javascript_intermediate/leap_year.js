// Create a funciton to calculate if a year is a leap year
function isLeapYear(year) {
    if (year % 4 === 0) {
        if (year % 100 === 0) {
            if (year % 400 === 0) {
                return "Leap year"; // Leap year
            } else {
                return "Not a leap year"; // Not a leap year
            }
        } else {
            return "Leap year"; // Leap year
        }
    } else {
        return "Not a leap year"; // Not a leap year
    }
}
// Example usage
console.log(isLeapYear(2020)); // "Leap year"
console.log(isLeapYear(2021)); // "Not a leap year"