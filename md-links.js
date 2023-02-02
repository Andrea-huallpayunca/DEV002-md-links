const { existsSync } = require('node:fs');
const { readFile, readdir} = require('node:fs/promises');
const { resolve, join, parse, isAbsolute } = require('node:path');


const getLinks = (data) => {
   let url = /\(https?:\/\/[^\s$.?#].[^\s]*\)/g ;
   let arrayL = data.toString().match(url)
   return  arrayL
}

const validateFalse = (data) =>{
    data.forEach(element => {
        console.log( {
            href: element,
            text: parse(element).name,
            file: join(__dirname, archivo)
        })
})}

const mdLinks  = (path, options) => new Promise ((resolve, reject)=>{

    if(existsSync(path) ){

        if(parse(path).ext =='.md'){
           readFile(path)
           .then(data=>{
            // console.log(getLinks(data))
            resolve (getLinks(data));
           })
           
        } 
        //  if(parse(path).ext ===''){
        //     // if(isAbsolute(path)){
            
        //     console.log('REaddir '+readdir(path))
        //     readdir(path)
        //     .then(data=>{
        //         data.forEach(element=>{
        //             mdLinks(element)
        //         })
        //     })
        // // } else {
        //     //    let newPath= resolve(path);
        //     //    mdLinks(newPath)
        //     // }
        // }
    }
    else {
        throw Error ('La ruta ingresada no existe en este directorio.')
    }
})


let archivo ='README.md'
let carpeta = 'C:\Proyectos\Proyecto 4\DEV002-md-links\Prueba'
let carpeta2 = 'Prueba'

mdLinks(archivo)
  .then( links => validateFalse(links)
//     links => {
//                 links.forEach(element => {
//                                     console.log( {
//                                         href: element,
//                                         text: parse(element).name,
//                                         file: join(__dirname, archivo)
//                                     })
//                 });

//     // => [{ href, text, file }, ...]
//   }
  )
  .catch(console.error);
// ------------------------------------------------------------
// console.log('Es ruta absoluta?'+isAbsolute(carpeta))
// console.log('Resolve?'+resolve(carpeta))
// console.log(parse(carpeta))
// console.log('Existe?'+existsSync(carpeta2))
// console.log('Es absoluta?2 '+isAbsolute(resolve(carpeta2)))

// console.log(__dirname)

// readdir(carpeta2)
// .then(elements=>{
//     console.log(elements)
//     elements.forEach(i=>{
//         if(parse(i).ext=='.md'){
//             readFile(i)
//             .then(data=>
//               console .log(getLinks(data)) 
//             )
            
//         } 
//         if(parse(i).ext==''){
//             readdir(i)
//         } 
//         else{
//             console.log('No funciona')
//         }
    
//     })
// })

