const { mdLinks } = require ('./index')
// const {linksFiles, validateFalse, validateTrue, getLinks} = require("./funciones.js");

// ---- Para --validate o --stats
const optionCli  = process.argv[2]
// console.log(optionCli)


// ---------------------------------------- archivo.md
let archivo = 'README.md'
let carpeta2 = 'Prueba'

mdLinks(carpeta2,'true')
.then(links=>links)

// mdLinks(archivo, 'true')
// .then(links=>links)



// mdLinks(archivo)
// .then( 
//     // links => validateFalse(links, archivo)
// )
// .catch(
//     // (error)=>{console.log(error)}
//     );

// mdLinks(archivo)
// .then( 
//     // links => validateTrue(links, archivo).then(console.log)
// )
// .catch(
//     // (error)=>{console.log(error)}
//     );

// mdLinks(archivo)
// .then(
//     links=>{
//         // Options(links,optionCli)
//     }
// )
// --------------------------------- carpeta
// let carpeta2 = 'Prueba'

// mdLinks(carpeta2)
// .then(
//     files => { 
//     {
//     files.forEach(file=>
//         linksFiles(file)
//         .then(data=> {
//             let datos = getLinks(data)
//             if(datos){
//             validateFalse(datos,file)
//             }

//         })
//         );
// }}
// )


// const cli = (option, callback)=>{
//     if (option ==false){
//         callback(archivo)
//         .then( links => validateFalse(links, archivo)
//         )
//     } else if (option ==true){
//         callback(archivo)
//         .then( links => validateTrue(links, archivo)
//         )
//     }
// }