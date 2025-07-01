// Create a function to sing the "99 Bottles of Beer" song
function singBottlesOfBeer() {
    for (let i = 99; i > 0; i--) {
        console.log(`${i} bottles of beer on the wall, ${i} bottles of beer.`);
        console.log(`Take one down and pass it around, ${i - 1} bottles of beer on the wall.`);
    }
    console.log("No more bottles of beer on the wall, no more bottles of beer.");
    console.log("Go to the store and buy some more, 99 bottles of beer on the wall.");
}

// Call the function to start singing
singBottlesOfBeer();