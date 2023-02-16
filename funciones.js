const { existsSync, readdirSync, readFile } = require('node:fs');
const { join, parse} = require('node:path');
const axios = require ('axios')


// ---- Validar si la ruta existe
const existRoute = (route)=>existsSync(route)

// ---- Para ver la extension de archivos
const partsRoute =(route)=> parse(route)

// ---- Extraer links de archivos

const getLinks = (data) => {
    let url =  /\[([^\[\]]*?)\]\((https?:\/\/[^\s$.?#].[^\s]*)\)/g ;
    let arrayL = data.toString().match(url)

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
//     let dividir= url.split(']')
//     let texto= dividir[0].replace('[','')
//     let href1= dividir[1].replace('(','')
//     let href2=href1.replace(')','')

//     return axios.get(href2)
//     .then(respuesta=>{
//         if (respuesta.status == 200 || respuesta.status == 201) {
//             return {
//                 href:href2,
//                 texto: texto,
//                 file: archivo,
//                 status: respuesta.status,
//                 message: respuesta.statusText
//             };
//         } else {
//             return {
//                 href:href2,
//                 texto: texto,
//                 file: archivo,
//                 status: respuesta.status,
//                 message: 'fail'
//             }
//         }
//     })
//     .catch(function (error) {
//         return {
//             href:href2,
//             success: false,
//             status: error.code
//         }
//     });
// }
const allPromise = (arrayLinks)=>{
    const validate= arrayLinks.map(
        url=>{
            // console.log(url.href)
    return axios.get(url.href)
    .then(respuesta=>{
        
        if (respuesta.status == 200 || respuesta.status == 201) {
            // console.log('texto then', url)
            return {
                href:url.href,
                text: url.text,
                file: url.file,
                status: respuesta.status,
                message: respuesta.statusText
            };
        } else {
            return {
                href:url.href,
                text: url.text,
                file: url.file,
                status: respuesta.status,
                message: 'fail'
            }
        }
    })
    .catch(function (error) {
        return {
            href:url.href,
            success: false,
            status: error.response?400:'ERROR',
            message:'fail'
        }
    });
})
return validate
}

// ---- Para las estadísticas --stats
const stats =(arrayLinks)=>{
    let unique = [];

    arrayLinks.forEach(function (item) {
    if(!unique.includes(item.href)){
        unique.push(item.href);
    }
    }); 
    // let nuevo=new Set(unique)
    return {
        Total: arrayLinks.length,
        Unique: unique.length
    }
}

// -- Para --stats --validate (falta terminar)
// const statsAndV =(arrayLinks)=>{
//     return new Promise((resolve, reject) => {
//     let unique = [];
//     let broken=[]

//     arrayLinks.forEach(function (item) {
//     if(!unique.includes(item)){
//         unique.push(item);
//     }
//     axiosPromise(item).then(datos=>broken.push(datos))
//     }); 
//     // resolve()
//     // resolve({
//     //     Total: arrayLinks.length,
//     //     Unique: unique.length,
//     //     Broken: broken.length 
//     // })    
//     })

// }
const statsAndV=(arrayLinks)=>{
    let broken=[]
    let unique=[]
    arrayLinks.map(item=>{
        if(!unique.includes(item.href)){
            unique.push(item.href);
        }
        if(item.message=='fail'){
            broken.push(item)
        }
    })
    return{
        Total: arrayLinks.length,
        Unique: unique.length,
        Broken: broken.length
    }
}

// readFile('README.md').then(console.log)

module.exports={
    existRoute,
    partsRoute,
    getLinks,
    elementDirectory,
    validateFalse,
    filesMd,
    readFiles,
    stats,
    statsAndV,
    allPromise
}
