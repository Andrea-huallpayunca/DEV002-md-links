const { existsSync } = require('node:fs');
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


// Retorno en False
const validateFalse = (data, archivo) =>{
    data.forEach(element => {
        console.log( {
            href: element,
            text: parse(element).name,
            file: join(__dirname, archivo)
        })
})}

// Retorno en true
const axiosPromise = (url)=>{
    return axios.get(url)
    .then((respuesta)=>{
        if (respuesta.status === 201 || respuesta.status === 200) {
            return {
                url,
                success: true,
                status: respuesta.status
            };
        } else {
            return {
                url,
                success: false,
                status: respuesta.status
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

const validateTrue = (data)=>{
    
    data.forEach(
        element=>{
            axiosPromise(element).then(console.log)
        }
    )
}

module.exports={
    existRoute,
    partsRoute,
    getLinks,
    validateFalse,
    validateTrue
}
