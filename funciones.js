const { existsSync, readdirSync, readFile } = require('node:fs');
const { resolve, join, parse, isAbsolute } = require('node:path');
const axios = require ('axios')


// ---- Validar si la ruta existe
const existRoute = (route)=>existsSync(route)

// ---- Para ver la extension de archivos
const partsRoute =(route)=> parse(route)

// ---- Extraer links de archivos
const link = /\[([^\[\]]*?)\]\((https?:\/\/[^\s$.?#].[^\s]*)\)/g ;

// const getLinks = (data) => {
//    let url = /https?:\/\/[^\s$.?#].[^\s]*/g ;
// //    let url = /\[([^\[\]]+)\]\(([^\(\)]+)\)/g
//    let arrayL = data.toString().match(url)
// //    let arrayN = arrayL.forEach(element=> element.match(/\[([^\[]+)\]\((.*)\)/))
// if(arrayL && arrayL!== undefined){
//      return  arrayL  
// }

// }
const getLinks = (data) => {
    let url =  /\[([^\[\]]*?)\]\((https?:\/\/[^\s$.?#].[^\s]*)\)/g ;
 //    let url = /\[([^\[\]]+)\]\(([^\(\)]+)\)/g
    let arrayL = data.toString().match(url)
 //    let arrayN = arrayL.forEach(element=> element.match(/\[([^\[]+)\]\((.*)\)/))
 if(arrayL && arrayL!== undefined){
      return  arrayL  
 }
 
 }

// ----() Para leer archivos y extraer links 

const readFiles =(file)=>{
    return new Promise ((resolve, reject)=>{
        readFile(file, (err, data)=>{
            if (err){
                reject(err)
            } else if (data){
                resolve(data)
            }
        })
    })
}
// const linkFiles =(file)=>{
//     readFiles(file)
//     .then(data=>{
//        let arrayL= getLinks(data)
//        arrayL.forEach(link=> 
//         )
//     })
// }
// ---- Leyendo carpetas
const elementDirectory=(path)=>readdirSync(path, 'utf-8')

// ---- Para extraer todos los archivos md de carpetas
let arrayN=[];
function filesMd(route){
    
    let data = elementDirectory(route);
    data.forEach(element => {
        if(partsRoute(element).ext=='.md'){
            let name=join(route,element)
            arrayN.push(name)
        } 
        else if(!partsRoute(element).ext){
            let newRoute = join(route,element)
            // let newRoute= resolve(element)
            filesMd(newRoute)
        }
    });
    return arrayN
    
}

// ---- Retorno en False
// const validateFalse = (data, archivo) =>{
//     data.forEach(element => {
//         console.log( {
//             href: element,
//             text: parse(element).name,
//             file: archivo
//             // file: join(__dirname, archivo)
//         })
// })}
// const validateFalse = (data, archivo) =>{
//     let validacion=[]
//     data.forEach(element => {

//         validacion.push( {
//             href: element,
//             text: parse(element).name,
//             file: archivo
//             // file: join(__dirname, archivo)
//         })}
//         )
//     return validacion
// }

const validateFalse = (data, archivo) =>{
    let validacion=[]
    data.forEach(element => {
        let dividir= element.split(']')
        let texto= dividir[0].replace('[','')
        let href1= dividir[1].replace('(','')
        let href2=href1.replace(')','')

        validacion.push( {
            href: href2,
            text: texto,
            file: archivo
            // file: join(__dirname, archivo)
        })}
        )
    return validacion
}
// ---- Retorno en true
// const axiosPromise = (url, archivo)=>{
//     return axios.get(url)
//     .then((respuesta)=>{
//         if (respuesta.status === 201 || respuesta.status === 200) {
//             return {
//                 url,
//                 file: archivo,
//                 success: true,
//                 status: respuesta.status,
//                 message: 'ok'
//             };
//         } else {
//             return {
//                 url,
//                 file: archivo,
//                 success: false,
//                 status: respuesta.status,
//                 message: 'fail'
//             }
//         }
//     })
//     .catch(function (error) {
//         return {
//             url,
//             success: false,
//             status: error.code
//         }
//     });
// }
const axiosPromise = (url, archivo)=>{
    let dividir= url.split(']')
    let texto= dividir[0].replace('[','')
    let href1= dividir[1].replace('(','')
    let href2=href1.replace(')','')

    return axios.get(href2)
    .then(respuesta=>{
        if (respuesta.status == 200 || respuesta.status == 201) {
            return {
                href:href2,
                texto: texto,
                file: archivo,
                success: true,
                status: respuesta.status,
                message: respuesta.statusText
            };
        } else {
            return {
                href:href2,
                texto: texto,
                file: archivo,
                success: false,
                status: respuesta.status,
                message: 'fail'
            }
        }
    })
    .catch(function (error) {
        return {
            href:href2,
            success: false,
            status: error.code
        }
    });
}

// const validateTrue = (data, archivo)=>{
    
//     data.forEach(
//         element=>{
//             axiosPromise(element, archivo).then(datos=> datos)
//         }
//     )
// }

// ---- Para las estadísticas
const stats =(arrayLinks)=>{
    let unique = [];

    arrayLinks.forEach(function (item) {
    if(!unique.includes(item)){
        unique.push(item);
    }
    }); 

    return {
        Total: arrayLinks.length,
        Unique: unique.length 
    }
}

const statsAndV =(arrayLinks)=>{
    return new Promise((resolve, reject) => {
    let unique = [];
    let broken=[]

    arrayLinks.forEach(function (item) {
    if(!unique.includes(item)){
        unique.push(item);
    }
    axiosPromise(item).then(datos=>broken.push(datos))
    }); 
    // resolve()
    // resolve({
    //     Total: arrayLinks.length,
    //     Unique: unique.length,
    //     Broken: broken.length 
    // })    
    })

}

// axios.get('https://www.youtube.com/watch?v=Lub5mY4J')
// .then(console.log)

module.exports={
    existRoute,
    partsRoute,
    getLinks,
    validateFalse,
    filesMd,
    readFiles,
    axiosPromise,
    stats,
    statsAndV
}
