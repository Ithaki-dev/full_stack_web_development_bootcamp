/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
  .prompt([
    {
      type: 'input',
      name: 'url',
      message: 'Enter the URL you want to convert to a QR code:',
    },
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    console.log(`You entered: ${answers.url}`);
    // Generate QR code
    var qr_png = qr.image(answers.url, { type: 'png' });
    qr_png.pipe(fs.createWriteStream('qrcode.png'));

  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
        console.error('Prompt could not be rendered in the current environment.');
    } else {
      // Something else went wrong
      console.error('An error occurred:', error);
    }

  });
