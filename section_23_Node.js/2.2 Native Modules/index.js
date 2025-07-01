const fs = require('node:fs/promises');

fs.writeFile('message.txt', 'Hello, Node.js!', (err) => {
    if (err) {
        console.error('Error writing file:', err);
    } else {
        console.log('File written successfully');
    }
});

// read the file
fs.readFile('message.txt', 'utf8')
    .then(data => {
        console.log('File content:', data);
    })
    .catch(err => {
        console.error('Error reading file:', err);
    });
