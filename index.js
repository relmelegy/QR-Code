async function main() {
  const inquirer = await import('inquirer');
  
  const qr = require('qr-image');
  const fs = require('fs');

  async function generateQRFromURL() {
      // Step 1: Get user input for URL
      // Note the change here to `inquirer.default.prompt`
      const answers = await inquirer.default.prompt([
          {
              type: 'input',
              name: 'url',
              message: 'Enter the URL to generate a QR code:',
              validate: function(value) {
                  var pass = value.match(
                      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
                  );
                  if (pass) {
                      return true;
                  }
                  return 'Please enter a valid URL';
              },
          },
      ]);

      const { url } = answers;

      // Step 2: Generate QR code
      const qrSVG = qr.image(url, { type: 'png' });
      qrSVG.pipe(fs.createWriteStream('QRCode.png'));
      console.log('QR code generated successfully: QRCode.png');

      // Step 3: Save user input to a text file
      fs.writeFileSync('URL.txt', url);
      console.log('User input saved to URL.txt');
  }

  // Don't forget to call your `generateQRFromURL` function
  await generateQRFromURL();
}

main().catch(console.error);