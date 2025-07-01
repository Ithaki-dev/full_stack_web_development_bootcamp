// Select a ramdom name from a list and display it in the console
function whoPays(names) {
    // Select a random index from the names array
    const randomIndex = Math.floor(Math.random() * names.length);
    // Get the name at the random index
    const selectedName = names[randomIndex];
    // Display the selected name in the console
    console.log(`The person who pays is: ${selectedName}`);
}
// Example usage
const namesList = ["Alice", "Bob", "Charlie", "David", "Eve"];
// Call the function with the names list
whoPays(namesList);