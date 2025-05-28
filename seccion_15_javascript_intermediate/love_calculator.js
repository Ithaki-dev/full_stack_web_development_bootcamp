// Make a love calculator
function calculateLoveScore(name1, name2) {
  const loveScore = Math.random() * 100;
  
  if (loveScore > 80) {
    return "You are a match made in heaven!";
  }
  else if (loveScore > 50 && loveScore <= 80) {
    return "You are doing well!";
  }
  else {
    return "You might need to work on your relationship.";
  }
}

// Example usage
const name1 = "Alice";
const name2 = "Bob";
const loveScore = calculateLoveScore(name1, name2);
console.log(loveScore);