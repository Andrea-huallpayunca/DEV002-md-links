const { readdirSync, readFile, fstat, Dirent } = require('node:fs');
const { builtinModules } = require('node:module');
const path = require('node:path');
// const { readFile, readdir} = require('node:fs/promises');
// const { resolve } = require('node:path');

let carpeta = 'C:\Proyectos\Proyecto 4\DEV002-md-links\Prueba'
let carpeta2 = 'Prueba'
// ---- Para ver si es directorio

// ---- Leyendo carpetas
const elementDirectory=(path)=>readdirSync(path, 'utf-8')

const { resolve, join, parse, isAbsolute } = require('node:path');

// ---- Para extraer una parte de la ruta o path
const partsRoute =(route)=> parse(route)

// ---- Extraer links de archivos
const getLinks = (data) => {
    let url = /https?:\/\/[^\s$.?#].[^\s]*/g ;
    let arrayL = data.toString().match(url)
    return  arrayL
 }

// ---- Callback para ReadFile

const linksData = (err, data)=>{
    if(err){
        throw 'Error ReadFile'
    } else if (data){
        // console.log(getLinks(data))
        // console.log(arrayL)

        // let datos = getLinks(data)
        // arrayL.push(datos)
        return getLinks(data)
    }
    // return arrayL
}


// readFile('README.md', (err, data)=>console.log(linksData(err, data)))

// ---- Para extraer todos los archivos md de carpetas
let arrayN=[];
function filesMd(route){
    
    let data = elementDirectory(route);
    data.forEach(element => {
        if(partsRoute(element).ext=='.md'){
            arrayN.push(element)
        } else if(!partsRoute(element).ext){
            let newRoute = join(route,element)
            // let newRoute= resolve(element)
            filesMd(newRoute)
        }
    });
    return arrayN
    
}


let prueba = filesMd(carpeta2)

let arrayL =[]

function linksFiles(files){

    files.forEach(file=>{
       readFile(file,(err, data)=>{
        if(err){
            throw 'Error Links'
        } else if (data){
            let datos = getLinks(data)
            arrayL.push(datos)
        }
       })          
    })

    return arrayL
}

// console.log(linksFiles(prueba))   
// linksFiles(prueba)

// console.log(!partsRoute(carpeta2).ext)

console.log(filesMd(carpeta2))

// console.log(prueba(carpeta2))
// console.log(linksFiles(filesMd(carpeta2)))
const archivo ='README.md'
// console.log(archivo.length)    


module.exports={
    arrayN,
    filesMd
}