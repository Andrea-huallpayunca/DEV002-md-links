const { existsSync } = require('node:fs');

// Validar si la ruta existe
const existRoute = (route)=>existsSync(route)
// const { readFile, readdir} = require('node:fs/promises');


const { resolve, join, parse, isAbsolute } = require('node:path');

const partsRoute =(route)=> parse(route)

const getLinks = (data) => {
   let url = /https?:\/\/[^\s$.?#].[^\s]*/g ;
   let arrayL = data.toString().match(url)
   return  arrayL
}


const validateFalse = (data, archivo) =>{
    data.forEach(element => {
        console.log( {
            href: element,
            text: parse(element).name,
            file: join(__dirname, archivo)
        })
})}



module.exports={
    existRoute,
    partsRoute,
    getLinks,
    validateFalse,
}
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

