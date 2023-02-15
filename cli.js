#!/usr/bin/env node

const { stats} = require('./funciones')
const { mdLinks } = require ('./md-links')

// ---- Para --validate o --stats
// const funcion = process.argv[0]
const ruta = process.argv[2]
const option1  = process.argv[3]
const option2  = process.argv[4]
console.log(option1)


if(!option1){
    mdLinks(ruta)
    .then(links=>links)
} else if (option1=='--validate' && !option2){
    mdLinks(ruta,'true')
    .then(links=>links)
} else if (option1=='--stats'&& !option2){
// console.log('hola')
mdLinks(ruta)
.then(links=>console.log(stats(links)))
} 

// else if (option1=='--stats'&& option2=='--validate'){
// console.log('hola2')

// mdLinks(ruta)
// .then(links=>{
//     let nuevo=[]
//     links.forEach(element => {
//         nuevo.push(element.href)
//     });
//     // console.log(nuevo)
//     let broken=[]
//     // nuevo.forEach(item=>
//     //     {
//     //         axiosPromise(item)
//     //         .then()
//     //     })
//     let statsAnd=stats(nuevo)
//     statsAndV(nuevo).then(console.log)
    
// })
// }


// cli()
    



// ---------------------------------------- archivo.md
// let archivo = 'README.md'
// let carpeta2 = 'Prueba'

// mdLinks(carpeta2)
// .then(links=>links)

// mdLinks(archivo,'true')
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