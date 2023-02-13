const { existsSync, readdirSync, readFile } = require('node:fs');
const { resolve, join, parse, isAbsolute } = require('node:path');
const axios = require ('axios')


// Validar si la ruta existe
const existRoute = (route)=>existsSync(route)

// Para ver la extension de archivos
const partsRoute =(route)=> parse(route)

// Extraer links de archivos
const getLinks = (data) => {
   let url = /https?:\/\/[^\s$.?#].[^\s]*/g ;
//    let url = /\[([^\[\]]+)\]\(([^\(\)]+)\)/g
   let arrayL = data.toString().match(url)
//    let arrayN = arrayL.forEach(element=> element.match(/\[([^\[]+)\]\((.*)\)/))
   return  arrayL
}

// ---- Para leer archivos y extraer links 

const linksFiles =(file)=>{
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
        } else if(!partsRoute(element).ext){
            let newRoute = join(route,element)
            // let newRoute= resolve(element)
            filesMd(newRoute)
        }
    });
    return arrayN
    
}

// Retorno en False
const validateFalse = (data, archivo) =>{
    data.forEach(element => {
        console.log( {
            href: element,
            text: parse(element).name,
            file: archivo
            // file: join(__dirname, archivo)
        })
})}

// Retorno en true
const axiosPromise = (url, archivo)=>{
    return axios.get(url)
    .then((respuesta)=>{
        if (respuesta.status === 201 || respuesta.status === 200) {
            return {
                url,
                file: archivo,
                success: true,
                status: respuesta.status,
                message: 'ok'
            };
        } else {
            return {
                url,
                file: archivo,
                success: false,
                status: respuesta.status,
                message: 'fail'
            }
        }
    })
    .catch(function (error) {
        return {
            url,
            success: false,
            status: error.code
        }
    });
}

const validateTrue = (data, archivo)=>{
    
    data.forEach(
        element=>{
            axiosPromise(element, archivo).then(datos=> datos)
        }
    )
}

module.exports={
    existRoute,
    partsRoute,
    getLinks,
    validateFalse,
    validateTrue,
    arrayN,
    filesMd,
    linksFiles
}
