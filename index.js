const {mdLinks } = require("md-links");
const { resolve, join, parse } = require('node:path');
// "./some/example.md"
const archivo = 'README.md'
mdLinks(archivo)
  .then(links => {
                links.forEach(element => {
                                    console.log( {
                                        href: element,
                                        text: parse(element).name,
                                        file: join(__dirname, path)
                                    })
                });

    // => [{ href, text, file }, ...]
  })
  .catch(console.error);

// mdLinks("./some/example.md", { validate: true })
//   .then(links => {
//     // => [{ href, text, file, status, ok }, ...]
//   })
//   .catch(console.error);

// mdLinks("./some/dir")
//   .then(links => {
//     // => [{ href, text, file }, ...]
//   })
//   .catch(console.error);
