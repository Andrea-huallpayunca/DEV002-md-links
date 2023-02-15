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
    .then(links=>console.log(links))
} else if (option1=='--validate' && !option2){
    mdLinks(ruta,'true')
    .then(links=>links)
} else if (option1=='--stats'&& !option2){
// console.log('hola')
mdLinks(ruta)
.then(links=>console.log(stats(links)))
} 
