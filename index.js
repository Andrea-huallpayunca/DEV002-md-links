const {
  existRoute,
  getLinks,
  partsRoute,
  arrayN,
  filesMd, 
  linksFiles
 } = require("./md-links");
//  const { readFile, readdir} = require('node:fs/promises');
//  const {arrayN, filesMd, linksFiles} =require('./functions')

// let carpeta2 = 'Prueba'

const mdLinks  = (path, options) => {
  return new Promise ((resolve, reject)=>{

  if(existRoute(path) ){

      if(partsRoute(path).ext =='.md'){
        // resuelve array de links
        resolve(linksFiles(path).then(data=> getLinks(data)))
         
      } 
      else if(!partsRoute(path).ext){
        arrayN;
        let newData=filesMd(path);

        // newData.forEach(file=>{
        //   resolve(linksFiles(file).then(data=> getLinks(data)))
        // })
        // resuelve array de archivos .md
        resolve(newData)
      } else {
        reject( new Error ('No se encontraron archivos .md'))
      }


  }
  else {
      reject('La ruta ingresada no existe.')
  }
})}


module.exports={
  mdLinks
}