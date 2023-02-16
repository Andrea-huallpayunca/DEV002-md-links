#!/usr/bin/env node

const { stats, statsAndV} = require('./funciones')
const { mdLinks } = require ('./md-links')

// ---- Para --validate o --stats
// const funcion = process.argv[0]
const ruta = process.argv[2]
const option1  = process.argv[3]
const option2  = process.argv[4]
// console.log(option1)


if(!option1){
    mdLinks(ruta,{validate:false})
    .then(links=>console.log(links))
    .catch(console.log)

} else if (option1=='--validate' && !option2){
    mdLinks(ruta,{validate:true})
    .then(links=>console.log(links))
    .catch(console.log)

} else if (option1=='--stats'&& !option2){
// console.log('hola')
    mdLinks(ruta,{validate:false})
    .then(links=>console.log(stats(links)))
    .catch(console.log)
    
} else if(option1=='--stats' && option2=='--validate'){
    mdLinks(ruta,{validate:true})
    .then(links=>{
        console.log(statsAndV(links))
    })
    .catch(console.log)
}
