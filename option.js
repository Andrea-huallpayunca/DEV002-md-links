// module.exports = () => {
//   // ...
// };


const fs = require('fs');
const path = require('path');
const archivo = './src/prueba.txt'

// ----- Leer un archivo y consolear contenido -----
// fs.readFile(archivo,'utf-8',(err,data)=>{
//   if(err){
//     throw (err)
//   } else {
//     console.log(data)
//   }
// })

// const url = https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)
const url = /\((https?:\/\/[^\s$.?#].[^\s]*)\)/g ;
const direccionR = /\[\w.+/g;
const link = /\[([^\[\]]*?)\]\((https?:\/\/[^\s$.?#].[^\s]*)\)/g ;
const direccionRelativa = /\(.\/\?:\/\/[^\s$.?#].[^\s]*)\)/g ;
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
    let linksDR = data.toString().match(direccionRelativa)

    // array += links
    // console.log(array)
    
    // console.log(links)
    // console.log(linksD)
    // console.log(linksU)
    console.log(linksDR)
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