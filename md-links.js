const {
  existRoute,
  getLinks,
  partsRoute,
  filesMd, 
  readFiles,
  validateFalse,
  axiosPromise
 } = require("./funciones.js"); 

const mdLinks  = (path, options) => {
  return new Promise ((resolve, reject)=>{

  if(existRoute(path) ){

      if(partsRoute(path).ext =='.md'){

        readFiles(path)
        .then(
          data=> {
            let arrayLinksDe=''
            // array de links
            arrayLinksDe=getLinks(data)

            if(!options){
              resolve(validateFalse(arrayLinksDe,path))
            } else if (options=='true'){
              arrayLinksDe.forEach(
                element=> resolve(axiosPromise(element,path).then(console.log))
              )
            }
          }
          )
      } 
      else if(!partsRoute(path).ext){
        // array de archivos md
        let arrayFile=filesMd(path)
        arrayFile.forEach(file=>readFiles(file)
                      .then(data=> {
                       let datos=getLinks(data)

                        if(datos){
                          if(!options){

                            resolve(validateFalse(datos,file))
                            
                          } else if (options=='true'){
                            datos.forEach(
                              element=> resolve(axiosPromise(element,file).then(console.log))
                            )
                          }
                        }
                      })
                      )
      } else {
        reject( new Error ('No se encontraron archivos .md'))
      }
  }
  else {
      reject('La ruta ingresada no existe.')
  }
})}
 
// let archivo = 'README.md'
// // let carpeta2 = 'Prueba'

// mdLinks(archivo)
// .then(console.log)
module.exports={
  mdLinks
}