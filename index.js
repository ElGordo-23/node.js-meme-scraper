// enable file system
const fs = require('fs');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const download = require('download');

//create new folder in project directory (.)
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

  //look for all the images, and access the source attribute, save it in an array
  const imageUrls = $('img')
    .map((item, x) => $(item, x).attr('src'))
    .toArray();

  //get the first 10 URLs
  const tenUrls = imageUrls.slice(0, 10);

  //specify where to save the images
  const filePath = `./memes`;

  //download the images using the download library

  tenUrls.forEach((element) => download(element, filePath));
}

getImages();

setTimeout(function () {
  console.log(`Success!
  Yeah boiiii!`);
}, 2 * 1000);
