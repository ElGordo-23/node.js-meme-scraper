// enable file system
const fs = require('node:fs');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
// const download = require('download'); <--- Illegal! Still in code for future reference.

// create new folder in project directory (.)
fs.mkdir('./memes', { recursive: true }, (err) => {
  if (err) throw err;
});

// async function to fetch all html, 'await' to let it load completely, 'await' only available in async.
async function getImages() {
  const response = await fetch(
    'https://memegen-link-examples-upleveled.netlify.app/',
  );

  // load the html body into cheerio as text
  const htmlBody = await response.text();

  const $ = cheerio.load(htmlBody);

  // look for all the images, and access the source attribute, save it in an array
  const imageUrls = $('img')
    .map((i, x) => $(x).attr('src'))
    .toArray();

  // get the first 10 URLs
  const tenUrls = imageUrls.slice(0, 10);

  // loop over the array, download all the memes.
  for (let i = 0; i < tenUrls.length; i++) {
    const download = async () => {
      const urlResponse = await fetch(tenUrls[i]);
      const memes = await urlResponse.buffer();
      fs.writeFile(`./memes/meme-${i + 1}.jpg`, memes, () => {
        console.log(`
        aw yisss, dank memes`);
      });
    };
    download();
  }
}
// Call the function to run the whole thing.

getImages();

// Have a funny comment.

setTimeout(function () {
  console.log(`Success!
  Yeah boiiii!`);
}, 2 * 1000);

// tenUrls.forEach((element) => download(element, filePath)); <---- much more elegant, but illegal way to download.
