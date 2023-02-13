const { readdirSync, readFile, fstat, link } = require('node:fs');
const path = require('node:path');

let carpeta2 = 'Prueba'
let archivo ='README.md'
// ---- Para ver si es directorio


// ---- Leyendo carpetas x 
const elementDirectory=(path)=>readdirSync(path, 'utf-8')

const { resolve, join, parse, isAbsolute } = require('node:path');
const { validateTrue } = require('./md-links');

// ---- Para extraer una parte de la ruta o path
const partsRoute =(route)=> parse(route)

// ---- Extraer links de archivos
const getLinks = (data) => {
    let url = /https?:\/\/[^\s$.?#].[^\s]*/g ;
    let arrayL = data.toString().match(url)
    return  arrayL
 }

// // ---- Callback para ReadFile

// const linksData = (err, data)=>{
//     if(err){
//         throw 'Error ReadFile'
//     } else if (data){
//         // console.log(getLinks(data))
//         // console.log(arrayL)

//         // let datos = getLinks(data)
//         // arrayL.push(datos)
//         return getLinks(data)
//     }
//     // return arrayL
// }


// readFile('README.md', (err, data)=>console.log(linksData(err, data)))

// ---- Para extraer todos los archivos md de carpetas
let arrayN=[];
// function filesMd(route){
    
//     let data = elementDirectory(route);
//     data.forEach(element => {
//         if(partsRoute(element).ext=='.md'){
//             arrayN.push(element)
//         } else if(!partsRoute(element).ext){
//             let newRoute = join(route,element)
//             // let newRoute= resolve(element)
//             filesMd(newRoute)
//         }
//     });
//     return arrayN
    
// }
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


// let prueba = filesMd(carpeta2)
// console.log(prueba)



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


// ---- Extraer Archivos .md, leer cada archvivo y extraer links

// const getLinksOfFiles=(path)=>{
    
//     let arrayFiles=filesMd(path)
//     console.log(arrayFiles)
//     let arrayF=[];

//     arrayFiles.forEach(file => {
//         linksFiles(file)
//         .then(data=> {
//             let datos = getLinks(data)
//             if(datos){
//                 console.log(datos)
//                 arrayF.push(datos)}
            
//         })
//         .catch(err=> console.log(err))
//     });
//     // console.log(arrayF)
// }

// getLinksOfFiles(carpeta2)

// ----- Para estadisticas
    const Options=(arrayLinks, option1, option2)=>{
        // option1 == process.argv[2]
        // let arrayLinks = linksFiles(archivo).then(data=> getLinks(data))
        let datos = []
        datos.push(validateTrue(arrayLinks))
        console.log(datos)
        let unique = [];
        // arrayLinks.then(
        //     links=>
        //     links.forEach(function (item) {
        //         if(!unique.includes(item)){
        //             unique.push(item);
        //         }
        //         })
        // )
        arrayLinks.forEach(function (item) {
        if(!unique.includes(item)){
            unique.push(item);
        }
        }); 

        if(option1=='--stats' && !option2){        
            return {
            Total: arrayLinks.length,
            Unique: unique.length
        }} else if (option1=='--validate' && !option2){
            return validateTrue(arrayLinks, archivo)
            // return arrayLinks.then(links=> validateTrue(links, archivo))
        } else if (option1=='--stats' && option2=='--validate'){
            // let datos =validateTrue(arrayLinks)
            // console.log(datos)
            // arrayLinks.then(links=> {
            //     let vari=(validateTrue(links, archivo))
            //     return vari.length
            // }
                
            // )
            // datos.push(validateTrue(arrayLinks, archivo)) 

            let broken = []
            // datos.forEach(link=>{
            //     console.log(link)
            //     // console.log(link[1])
            //     // if(link.success== false){
            //     //     broken.push(link)
            //     // }
                
            // })
            // for (let index = 0; index < array.length; index++) {
            //     const element = array[index];
                
            // }
            return  {
            Total: arrayLinks.length,
            Unique: unique.length,
            Broken: broken.length              
            }
        }
    }
    
    let arrayX = linksFiles('README.md').then(data=> getLinks(data))
    arrayX.then(links=>{
        console.log( Options(links, process.argv[2], process.argv[3]))}
        )
//   console.log(  Options('README.md',process.argv[2], process.argv[3]))
    // console.log(Options(getLinks('README.md'),process.argv[2]))
module.exports={
    arrayN,
    filesMd,
    linksFiles,
    Options
}