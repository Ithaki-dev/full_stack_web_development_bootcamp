// Create a fibonacci generator function recive the number of terms to generate and return an array with the fibonacci sequence up to that number of terms.
function fibonacciGenerator(numTerms) {
    // Initialize the Fibonacci sequence array
    const fibonacciSequence = [];
    
    // Generate the Fibonacci sequence up to the specified number of terms
    for (let i = 0; i < numTerms; i++) {
        if (i === 0) {
            fibonacciSequence.push(0); // First term is 0
        } else if (i === 1) {
            fibonacciSequence.push(1); // Second term is 1
        } else {
            // Each subsequent term is the sum of the two preceding terms
            const nextTerm = fibonacciSequence[i - 1] + fibonacciSequence[i - 2];
            fibonacciSequence.push(nextTerm);
        }
    }
    
    return fibonacciSequence;
}

// Example usage:
const numTerms = 10; // Specify the number of terms to generate
const fibonacciSequence = fibonacciGenerator(numTerms);
alert(`Fibonacci sequence with ${numTerms} terms:`);
for (const term of fibonacciSequence) {
    console.log(term);
}