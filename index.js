const {
  existRoute,
  getLinks,
  partsRoute,
  arrayN,
  filesMd, 
  readFiles,
  validateFalse,
  validateTrue,
  axiosPromise
 } = require("./funciones.js"); 

const mdLinks  = (path, options) => {
  return new Promise ((resolve, reject)=>{

  if(existRoute(path) ){
      let arrayLinksDe=''
      if(partsRoute(path).ext =='.md'){
        // // resuelve array de links
        // resolve(readFiles(path).then(data=> getLinks(data)))
        readFiles(path)
        .then(
          data=> {
            arrayLinksDe=getLinks(data)
            // console.log(arrayLinksDe)
            if(!options){
              // console.log(validateFalse(arrayLinksDe,path))
              let arrayX=validateFalse(arrayLinksDe,path)
              resolve(arrayX)
            } else if (options=='true'){
              arrayLinksDe.forEach(
                element=> resolve(axiosPromise(element,path).then(console.log))
              )
            }
          }
          )
      } 
      else if(!partsRoute(path).ext){
        let arrayFile=filesMd(path)
        arrayFile.forEach(file=>readFiles(file)
                      .then(data=> {
                       let datos=getLinks(data)
                        // console.log(datos)
                        if(datos){
                         if(!options){
                          // console.log(validateFalse(arrayLinks,file))
                          resolve(validateFalse(datos,file))
                          
                        } else if (options=='true'){
                          datos.forEach(
                            element=> resolve(axiosPromise(element,file).then(console.log))
                          )
                        }
                        }
                      }))
      } else {
        reject( new Error ('No se encontraron archivos .md'))
      }

      // if(!options){

      //   resolve(
      //     {
      //       href: ,
      //       text: ,
      //       file: 
      //     }
      //   )
      // } else if (options=='true'){
      //   resolve(
      //     {
      //       href: ,
      //       text: ,
      //       file: ,
      //       status: ,
      //       ok: 
      //     }
      //   )
      // }


  }
  else {
      reject('La ruta ingresada no existe.')
  }
})}
 
mdLinks('Prueba')

module.exports={
  mdLinks
}