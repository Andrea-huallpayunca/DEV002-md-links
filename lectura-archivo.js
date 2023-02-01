const fs = require('fs'); 

const path = require('path');

const archivo = 'README.md'

const url = /\(https?:\/\/[^\s$.?#].[^\s]*\)/g ;

const getLinks = (data)=>{return data.toString().match(url); }

fs.readFile(ruta, 'utf-8', (err, data)=>{
    if(err){
      throw (err)
    } else if (data){

    //   let linksU = data.toString().match(url);
    //   console.log(linksU)
      return getLinks(data)
      // --> retorna lista de: '(https://es.wikipedia.org/wiki/Markdown)',
        
    }

  })

// const exist = (ruta) => {fs.existsSync(ruta)}

console.log(fs.existsSync(archivo))
// retorna: trues(porque si existe)

// const validateFalse = (ruta) =>{
//     const ext = path.parse(ruta);
//     // const array = arrayLinks(ruta);

//     if ( ext.ext == '.md'){
//         fs.readFile(ruta, 'utf-8', (err, data)=>{
//             if(err){
//               throw (err)
//             } else if (data){
//                  data.forEach(element => {
//                     return {
//                         href: element,
//                         text: ext.name,
//                         file: path.join(__dirname, ruta)
//                     }  
//                  });
//             }
//         })     
//     }
// }





// console.log(validateFalse(archivo))

// const getTextLink = link => link.match(/[^[\]]+/)[0];



// ----- Leer directorios -----
// fs.readdir('test', 'utf-8', (err,files)=>{
//   if(err){
//     throw (err)
//   } else {
//     console.log(files)
//   }
// })

// ------------------------------------------------------------------------------------------
const path = 'README.md'
readFile(path, { encoding: 'utf8' });
// const url = /\(https?:\/\/[^\s$.?#].[^\s]*\)/g ;



console.log(getLinks(readFile(path)))

// abriendo 1 archivo-retornando objeto por link
// readFile(path)
// .then(data=>{
//     // let arrayF = data.toString().match(url)
//     let arrayF = getLinks(data);
//     arrayF.forEach(element => {
//                             console.log( {
//                                 href: element,
//                                 text: parse(element).name,
//                                 file: join(__dirname, path)
//                             }  )
//                          });
    

// })

    
// const LeerArchivo =(path, data) =>{
//     readFile(path)

// }

// readdir(path)
//     .then(data=>{
//         let arrayD = []
//         data.forEach(element=>{
//             if(parse(element).ext !== ''){
//                 readdir(path)
//             } else if (parse(element).ext == '.md'){
//                 readFile(element)
//             }
//         })
//     })

module.exports={
    mdLinks,
}