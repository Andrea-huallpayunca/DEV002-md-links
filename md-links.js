const {
  existRoute,
  getLinks,
  partsRoute,
  filesMd, 
  readFiles,
  validateFalse,
  allPromise
 } = require("./funciones.js"); 
 
const mdLinks  = (path,options={validate}) => {
  return new Promise ((resolve, reject)=>{

  if(existRoute(path) ){

      if(partsRoute(path).ext =='.md'){

        readFiles(path)
        .then(
          data=> {
            // let arrayLinksDe=''
            // array de links
           let arrayLinksDe=getLinks(data)

            if(options.validate==false){
              resolve(validateFalse(arrayLinksDe,path))

            } else if (options.validate==true){
              // console.log('true')
              let arrayFalse=validateFalse(arrayLinksDe,path)
              const arrayPromises=allPromise(arrayFalse)
              const onePromise=Promise.all(arrayPromises)
              resolve(onePromise)

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
                          if(options.validate==false){

                            resolve(validateFalse(datos,file))
                            
                          } else if (options.validate==true){
                            // datos.forEach(
                            //   element=> resolve(axiosPromise(element,file).then(console.log))
                            // )
                            let arrayFalse=validateFalse(datos,path)
                            const arrayPromises=allPromise(arrayFalse)
                            const onePromise=Promise.all(arrayPromises)
                            resolve(onePromise)
                          }
                        }
                      })
                      )
      } else {
        reject('No se encontraron archivos .md')
      }
  }
  else {
      reject('La ruta ingresada no existe.')
  }
})}
 
// let archivo = 'README.md'
const archivo= 'Prueba/readmePrueba.md'
// let carpeta2 = 'Prueba'

// mdLinks(carpeta2,'true')
// .then(console.log)
// añadir catch
// mdLinks(archivo,{validate:false})
// .then(console.log)

module.exports={
  mdLinks
}