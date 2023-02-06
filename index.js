const {
  existRoute,
  getLinks,
  validateFalse,
  partsRoute
 } = require("./md-links");
 const { readFile, readdir} = require('node:fs/promises');
 const {arrayN, filesMd} =require('./functions')

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

let carpeta = 'C:\Proyectos\Proyecto 4\DEV002-md-links\Prueba'
let carpeta2 = 'Prueba'

const mdLinks  = (path, options) => new Promise ((resolve, reject)=>{

  if(existRoute(path) ){

      if(partsRoute(path).ext =='.md'){
         readFile(path)
         .then(data=>{
          // console.log(getLinks(data))
          resolve (getLinks(data));
         })
         
      } 
      // else if (!partsRoute(element).ext){
      //   arrayN;
      //   let newData=filesMd(path);
      //   resolve(mdLinks(newData))
      // }
  }
  else {
      reject( new Error ('La ruta ingresada no existe.'))
  }
})

const archivo ='README.md'
mdLinks(archivo)
.then( links => validateFalse(links, archivo)
)
.catch(console.error);
mdLinks(carpeta2)
.then(
  // links => validateFalse(links, archivo)
)

