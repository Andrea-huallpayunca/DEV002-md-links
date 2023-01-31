
const mdLinks  = (path, options) => new Promise ((resolve, reject)=>{
    if(path===null){
        throw ('No se ha podido encontrar la ruta ingresada')
    } else {
        // Si la ruta de un archivo entonces Extraer links (href), texto máx 50 caracteres, 
            // Por defecto- Validacion false
            // (href: URL encontrada.
            // text: Texto que aparecía dentro del link (<a>).
            // file: Ruta del archivo donde se encontró el link.)

            // --validate - Validacion true
            // href: URL encontrada.
            // text: Texto que aparecía dentro del link (<a>).
            // file: Ruta del archivo donde se encontró el link.
            // status: Código de respuesta HTTP.
            // ok: Mensaje fail en caso de fallo u ok en caso de éxito.

        // Si es carpeta aplicar recursividad

    }
})

const { readFile } = require('node:fs/promises');
const { resolve, join, parse } = require('node:path');

const filePath = resolve('./package.json')
readFile(filePath, { encoding: 'utf8' });
const url = /\(https?:\/\/[^\s$.?#].[^\s]*\)/g ;

readFile('README.md')
.then(data=>{
    const ext = parse('README.md');
    let arrayD = data.toString().match(url)
    arrayD.forEach(element => {
                            console.log( {
                                href: element,
                                text: ext.name,
                                file: join(__dirname, 'README.md')
                            }  )
                         });
    

})