const {
  existRoute,
  getLinks,
  partsRoute
 } = require("./md-links");
 const { readFile, readdir} = require('node:fs/promises');
 const {arrayN, filesMd} =require('./functions')

let carpeta = 'C:\Proyectos\Proyecto 4\DEV002-md-links\Prueba'
let carpeta2 = 'Prueba'

const mdLinks  = (path, options) => {
  return new Promise ((resolve, reject)=>{

  if(existRoute(path) ){

      if(partsRoute(path).ext =='.md'){
         readFile(path)
         .then(data=>{
          // console.log(getLinks(data))
          resolve (getLinks(data));
         })
         
      } 
      // else if (){

      // } else {
      //   reject( new Error ('No se encontraron archivos .md'))
      // }
      // else if (!partsRoute(element).ext){
      //   arrayN;
      //   let newData=filesMd(path);
      //   resolve(mdLinks(newData))
      // }
  }
  else {
      reject('La ruta ingresada no existe.')
  }
})}




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

module.exports={
  mdLinks
}