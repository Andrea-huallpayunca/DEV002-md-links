// module.exports = () => {
//   // ...
// };


const fs = require('fs');
const path = require('path');
// const { argv } = require('process');
// const { env } = require('process');
const archivo = './src/prueba.txt'


// const validateFalse = [{href,
//   text,
//   file
// }]

// ----- Leer un archivo y consolear contenido -----

fs.readFile(archivo,'utf-8',(err,data)=>{
  if(err){
    throw (err)
  } else {
    let text = data.substring(0,50)
    // console.log(text +'...')
    // validateFalse.text= text
  }
})

// ----- Consoleando Links -----

const url = /\((https?:\/\/[^\s$.?#].[^\s]*)\)/g ;
const direccionR = /\[\w.+/g;
const link = /\[([^\[\]]*?)\]\((https?:\/\/[^\s$.?#].[^\s]*)\)/g ;
// const direccionRelativa = /\(.\/\?:\/\/[^\s$.?#].[^\s]*)\)/g ;
// ![](./inicio.png);


fs.readFile('README.md', 'utf-8', (err, data)=>{
  if(err){
    throw (err)
  } else if (data){
    const array = [];

    let links = data.toString().match(link);
    // --> retorna lista de: [Markdown](https://es.wikipedia.org/wiki/Markdown)',

    let linksD = data.toString().match(direccionR);
    // --> retorna lista de:   '[10. Achicando el problema](#10-achicando-el-problema)',
    //                 '[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado',
    let linksU = data.toString().match(url);
    // --> retorna lista de: '(https://es.wikipedia.org/wiki/Markdown)',

    // let linksDR = data.toString().match(direccionRelativa)

    // array += links
    // console.log(array)
    
    // console.log(links)
    // console.log(linksD)
    // console.log(linksU)

    // console.log(linksDR) fail
  }
})

// ----- Extensión del archivo ---- 
console.log(path.basename(archivo))
// --> retorna: prueba.txt

// ----- Leer directorios -----
// fs.readdir('test', 'utf-8', (err,files)=>{
//   if(err){
//     throw (err)
//   } else {
//     console.log(files)
//   }
// })



// open('myfile', 'r', (err, fd) => {
//   if (err) {
//     if (err.code === 'ENOENT') {
//       console.error('myfile does not exist');
//       return;
//     }

//     throw err;
//   }

//   try {
//     readMyData(fd);
//   } finally {
//     close(fd, (err) => {
//       if (err) throw err;
//     });
//   }
// });

// argv.forEach((val, index) => {
//   console.log(`${index}: ${val}`);
//   // validateFalse.file = `${index[1]}: ${val}`
// });

// retorna : 0: C:\Program Files\nodejs\node.exe
//           1: C:\Proyectos\Proyecto 4\DEV002-md-links\option

// console.log(env)

// console.log(validateFalse)


// let link1 = https://es.wikipedia.org/wiki/Markdowns

// fsPromises.readlink(link1, 'utf-8')

// const { readFile, readlink } = require('node:fs/promises');
const getTextLink = link => link.match(/[^[\]]+/)[0];
console.log('Este es el texto ' + getTextLink(archivo))

const http = require('http')
let link1 = 'https://es.wikipedia.org/wiki/Markdowns'

// const status = statusCode => (statusCode !== 200 ? 'fail' : 'ok');
// const getObjStatus = (statusCode, elem) => ({
//   ...elem,
//   status: statusCode,
//   message: status(statusCode),
// });

// const getProtocol = protocol => (protocol === 'https' ? https : http);


// readlink(link1,'utf-8')
const ext =path.parse(archivo)
console.log(ext.name   )
console.log(ext.ext)
console.log(path.parse('test'))

