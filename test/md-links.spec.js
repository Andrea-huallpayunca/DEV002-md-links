

const { existRoute, partsRoute, getLinks, elementDirectory, filesMd, validateFalse, allPromise, stats, statsAndV } =require ('../funciones.js')
const { mdLinks } = require ('../md-links.js')

const archivo= 'Prueba/readmePrueba.md'
const carpeta ='Prueba'
const carpeta2='Prueba2'
const contenido= `## 1. Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...) y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional ).

Estos archivosnormalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
en formato , para verificar los links que contengan y reportar
algunas estadísticas.

![md-links](https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg)`


describe('Testeando existRoute', () => {
  test('Debe verificar si es una función', () => {
    expect(typeof existRoute).toBe('function')
  })

  test('Debe verificar si una ruta existe', () => {
    expect(existRoute(archivo)).toBe(true)
  })
})

describe('Testeando partsRoute', () => {
  test('Debe verificar si es una función', () => {
    expect(typeof partsRoute).toBe('function')
  })
  test('Debe retornar la extensión de una ruta', () => {
    expect(partsRoute(archivo).ext).toBe('.md')
  })
})

describe('Testeando getLinks', () => {
  test('Debe verificar si es una función', () => {
    expect(typeof getLinks).toBe('function')
  })
  test('Debe extraer links en formato de archivos .md', () => {
    const resultado = [
      '[Markdown](https://es.wikipedia.org/wiki/Markdown)',
      '[Node.js](https://nodejs.org/)',
      '[md-links](https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg)'
    ]
    expect(getLinks(contenido)).toEqual(resultado)
  })
})

describe('Testeando elementDirectory', () => {
  test('Debe verificar si es una función', () => {
    expect(typeof elementDirectory).toBe('function')
  })
  test('Debe extraer elementos de una carpeta', () => {
    const resultado = [
      'carpetaPrueba2',
      "README-DataLovers.md",
      "README-SocialNetwork.md",
      "readmePrueba.md",
    ]
    expect(elementDirectory(carpeta)).toEqual(resultado)
  })
})

describe('Testeando filesMd', () => {
  test('Debe verificar si es una función', () => {
    expect(typeof filesMd).toBe('function')
  })
  test('Debe retornar todos los elementos .md de una carpeta con sus respectivas rutas', () => {
    const resultado =[
     "Prueba\\carpetaPrueba2\\New\\README-SocialNetwork.md",
     "Prueba\\carpetaPrueba2\\READMEcopy.md",
     "Prueba\\README-DataLovers.md",
     "Prueba\\README-SocialNetwork.md",
     "Prueba\\readmePrueba.md",
    ]
    expect(filesMd(carpeta)).toEqual(resultado)
  })
})

describe('Testeando validateFalse', () => {
  test('Debe verificar si es una función', () => {
    expect(typeof validateFalse).toBe('function')
  })
  test('Debe leer un array de links y retornar un array con un objeto por cada link, las propiedades del objeto deben ser href, text, file ', () => {
    const arrayLinks=[
      '[Markdown](https://es.wikipedia.org/wiki/Markdown)',
      '[Node.js](https://nodejs.org/)',
      '[md-links](https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg)'
    ]
    const resultado =[
      { href: 'https://es.wikipedia.org/wiki/Markdown', text: 'Markdown', file: 'Prueba/readmePrueba.md' },
      { href: 'https://nodejs.org/', text: 'Node.js', file: 'Prueba/readmePrueba.md' },
      { href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg', text: 'md-links', file: 'Prueba/readmePrueba.md' },
    ]
    expect(validateFalse(arrayLinks,archivo)).toEqual(resultado)
  })
})

describe('Testeando allPromise', () => {
  test('Debe verificar si es una función', () => {
    expect(typeof allPromise).toBe('function')
  })
  test('Debe leer un array de links y retornar un array con un objeto por cada link, las propiedades del objeto deben ser href, text, file, status y message ', () => {
    const arrayLinks =[
      { href: 'https://es.wikipedia.org/wiki/Markdown', text: 'Markdown', file: 'Prueba/readmePrueba.md' },
      { href: 'https://nodejs.org/', text: 'Node.js', file: 'Prueba/readmePrueba.md' },
      { href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg', text: 'md-links', file: 'Prueba/readmePrueba.md' },
    ]
 
    const resultado = [
    {
      href: 'https://es.wikipedia.org/wiki/Markdown',
      text: 'Markdown',
      file: 'Prueba/readmePrueba.md',
      status: 200,
      message: 'OK'
    },
    {
      href: 'https://nodejs.org/',
      text: 'Node.js',
      file: 'Prueba/readmePrueba.md',
      status: 200,
      message: 'OK'
    },
    {
      href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
      text: 'md-links',
      file: 'Prueba/readmePrueba.md',
      status: 200,
      message: 'OK'
    }
  ]
  const prueba11=new Promise((resolve) => {
    const arrayPromises = allPromise(arrayLinks)
    const onePromise=Promise.all(arrayPromises)
    resolve(onePromise)
  })

  prueba11.then(data=> expect(data).toEqual(resultado))
  
  })
})

describe('Testeando stats', () => {
  test('Debe verificar si es una función', () => {
    expect(typeof stats).toBe('function')
  })
  test('Debe retornar la cantidad de links en total y cantidad links unicos', () => {
    const arrayLinks =[
      { href: 'https://es.wikipedia.org/wiki/Markdown', text: 'Markdown', file: 'Prueba/readmePrueba.md' },
      { href: 'https://nodejs.org/', text: 'Node.js', file: 'Prueba/readmePrueba.md' },
      { href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg', text: 'md-links', file: 'Prueba/readmePrueba.md' },
    ]
    const resultado ={
      Total: 3,
      Unique: 3
    }
    expect(stats(arrayLinks)).toEqual(resultado)
  })
})

describe('Testeando statsAndV', () => {
  test('Debe verificar si es una función', () => {
    expect(typeof statsAndV).toBe('function')
  })
  test('Debe retornar la cantidad de links en total, cantidad links unicos y links rotos', () => {
    const arrayLinks= [
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'Prueba/readmePrueba.md',
        status: 200,
        message: 'OK'
      },
      {
        href: 'https://nodejs.org/',
        text: 'Node.js',
        file: 'Prueba/readmePrueba.md',
        status: 200,
        message: 'OK'
      },
      {
        href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
        text: 'md-links',
        file: 'Prueba/readmePrueba.md',
        status: 200,
        message: 'OK'
      }
    ]
    const resultado = { Total: 3, Unique: 3, Broken: 0 }
    expect(statsAndV(arrayLinks)).toEqual(resultado)
  })
})


describe('Testeando mdLinks', () => {
  test('Debe verificar si es una función', () => {
    expect(typeof mdLinks).toBe('function')
  })

  test('Debe rechazar cuando el path no existe', () => {
    const route = 'noExiste.md'
    return mdLinks(route,{validate:false}).catch((error)=>{
      expect(error).toBe('La ruta ingresada no existe.')
    })
  });
  test('Debe rechazar cuando el path no es archivo .md o carpeta', () => {
    const route = 'funciones.js'
    mdLinks(route,{validate:false}).catch((error)=>{
    expect(error).toBe('No se encontraron archivos .md')
    })
  });
  test('Caso archivo en parámetro path: Debe retornar un array de los links con propiedades href, text y file, si en el parámetro options se indica {validate:false} ', ()=>{
     const resultado = [
      { href: 'https://es.wikipedia.org/wiki/Markdown', text: 'Markdown', file: 'Prueba/readmePrueba.md' },
      { href: 'https://nodejs.org/', text: 'Node.js', file: 'Prueba/readmePrueba.md' },
      { href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg', text: 'md-links', file: 'Prueba/readmePrueba.md' },

    ]
    mdLinks(archivo,{validate:false})
    .then(links=> 
      expect(links).toEqual(resultado))
  });
  test('Caso archivo en parámetro path: Debe retornar un array de los links con propiedades href, text y file, si en el parámetro options se indica {validate:true} ', ()=>{
    const resultado = [
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'Prueba/readmePrueba.md',
        status: 200,
        message: 'OK'
      },
      {
        href: 'https://nodejs.org/',
        text: 'Node.js',
        file: 'Prueba/readmePrueba.md',
        status: 200,
        message: 'OK'
      },
      {
        href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
        text: 'md-links',
        file: 'Prueba/readmePrueba.md',
        status: 200,
        message: 'OK'
      }
    ]
  mdLinks(archivo,{validate:true})
  .then(links=> 
    expect(links).toEqual(resultado))
  })

  test('Caso carpeta en parámetro path: Debe retornar un array de los links con propiedades href, text y file, si en el parámetro options se indica {validate:false} ', ()=>{
    const resultado = [
      {
        href: 'https://docs.npom/getting-started/what-is-npm',
        text: 'NPM',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://nodejs.org/',
        text: 'Node.js',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
        text: 'md-links',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://nodejs.org/es/',
        text: 'Node.js',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://developers.google.com/v8/',
        text: 'motor de JavaScript V8 de Chrome',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://curriculum.laboratoria.la/es/topics/javascript/04-arrays',
        text: 'Arreglos',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/',
        text: 'Array - MDN',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/sort',
        text: 'Array.prototype.sort() - MDN',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach',
        text: 'Array.prototype.forEach() - MDN',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map',
        text: 'Array.prototype.map() - MDN',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter',
        text: 'Array.prototype.filter() - MDN',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce',
        text: 'Array.prototype.reduce() - MDN',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://curriculum.laboratoria.la/es/topics/javascript/05-objects/01-objects',
        text: 'Objetos en JavaScript',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://curriculum.laboratoria.la/es/topics/javascript/02-flow-control/01-conditionals-and-loops',
        text: 'Estructuras condicionales y repetitivas',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/conditionals',
        text: 'Tomando decisiones en tu código — condicionales - MDN',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://curriculum.laboratoria.la/es/topics/javascript/02-flow-control/03-functions',
        text: 'Funciones (control de flujo)',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://curriculum.laboratoria.la/es/topics/javascript/03-functions/01-classic',
        text: 'Funciones clásicas',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://curriculum.laboratoria.la/es/topics/javascript/03-functions/02-arrow',
        text: 'Arrow Functions',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
        text: 'Funciones — bloques de código reutilizables - MDN',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://www.youtube.com/watch?v=lPPgY3HLlhQ',
        text: 'Píldora recursión - YouTube Laboratoria Developers',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://medium.com/laboratoria-developers/recursi%C3%B3n-o-recursividad-ec8f1a359727',
        text: 'Recursión o Recursividad - Laboratoria Developers en Medium',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://nodejs.org/docs/latest/api/modules.html',
        text: 'Modules: CommonJS modules - Node.js Docs',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://developer.mozilla.org/es/docs/Glossary/Callback_function',
        text: 'Función Callback - MDN',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise',
        text: 'Promise - MDN',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://www.freecodecamp.org/news/how-to-write-a-javascript-promise-4ed8d44292b8/',
        text: 'How to Write a JavaScript Promise - freecodecamp (en inglés)',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://jestjs.io/docs/es-ES/getting-started',
        text: 'Empezando con Jest - Documentación oficial',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://jestjs.io/docs/es-ES/asynchronous',
        text: 'Tests de código asincrónico con Jest - Documentación oficial',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://jestjs.io/docs/es-ES/manual-mocks',
        text: 'Manual Mocks con Jest - Documentación oficial',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://www.npmjs.com/',
        text: 'Sitio oficial de npm (en inglés)',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://docs.npmjs.com/files/package.json',
        text: 'package.json - Documentación oficial (en inglés)',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://docs.npmjs.com/misc/scripts',
        text: 'scripts - Documentación oficial (en inglés)',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://nodejs.org/api/process.html',
        text: 'Process - Documentación oficial (en inglés)',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://nodejs.org/api/fs.html',
        text: 'File system - Documentación oficial (en inglés)',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://nodejs.org/api/path.html',
        text: 'Path - Documentación oficial (en inglés)',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://developer.mozilla.org/es/docs/Web/HTTP/Overview',
        text: 'Generalidades del protocolo HTTP - MDN',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://developer.mozilla.org/es/docs/Web/HTTP/Messages',
        text: 'Mensajes HTTP - MDN',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://developer.mozilla.org/es/docs/Web/HTTP/Status',
        text: 'Códigos de estado de respuesta HTTP - MDN',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://dev.to/khaosdoctor/the-complete-guide-to-status-codes-for-meaningful-rest-apis-1-5c5',
        text: 'The Complete Guide to Status Codes for Meaningful ReST APIs - dev.to',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://jestjs.io/',
        text: 'Jest',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://docs.npmjs.com/cli/install',
        text: 'docs oficiales de `npm install` acá',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://github.com/Laboratoria/course-parser',
        text: '`course-parser`',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://github.com/markdown-it/markdown-it',
        text: 'markdown-it',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions',
        text: 'expresiones regulares (`RegExp`)',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://github.com/markedjs/marked',
        text: 'marked',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://github.com/jsdom/jsdom',
        text: 'JSDOM',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://github.com/cheeriojs/cheerio',
        text: 'Cheerio',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://github.com/markedjs/marked',
        text: 'marked',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://github.com/workshopper/learnyounode',
        text: 'learnyounode',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://github.com/workshopper/how-to-npm',
        text: 'how-to-npm',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://github.com/stevekane/promise-it-wont-hurt',
        text: 'promise-it-wont-hurt',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://nodejs.org/es/about/',
        text: 'Acerca de Node.js - Documentación oficial',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://nodejs.org/api/fs.html',
        text: 'Node.js file system - Documentación oficial',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://nodejs.org/api/http.html#http_http_get_options_callback',
        text: 'Node.js http.get - Documentación oficial',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://es.wikipedia.org/wiki/Node.js',
        text: 'Node.js - Wikipedia',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://medium.freecodecamp.org/what-exactly-is-node-js-ae36e97449f5',
        text: 'What exactly is Node.js? - freeCodeCamp',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://www.drauta.com/que-es-nodejs-y-para-que-sirve',
        text: '¿Qué es Node.js y para qué sirve? - drauta.com',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://www.youtube.com/watch?v=WgSc1nv_4Gw',
        text: '¿Qué es Nodejs? Javascript en el Servidor - Fazt en YouTube',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://www.ibm.com/developerworks/ssa/opensource/library/os-nodejs/index.html',
        text: '¿Simplemente qué es Node.js? - IBM Developer Works, 2011',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://www.genbeta.com/desarrollo/node-js-y-npm',
        text: 'Node.js y npm',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175',
        text: 'Módulos, librerías, paquetes, frameworks... ¿cuál es la diferencia?',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://carlosazaustre.es/manejando-la-asincronia-en-javascript',
        text: 'Asíncronía en js',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://docs.npmjs.com/getting-started/what-is-npm',
        text: 'NPM',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://docs.npmjs.com/getting-started/publishing-npm-packages',
        text: 'Publicar packpage',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://docs.npmjs.com/getting-started/publishing-npm-packages',
        text: 'Crear módulos en Node.js',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback',
        text: 'Leer un archivo',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback',
        text: 'Leer un directorio',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://nodejs.org/api/path.html',
        text: 'Path',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e',
        text: 'Linea de comando CLI',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      },
      {
        href: 'https://www.youtube.com/watch?v=Lub5qOmY4JQ',
        text: 'recurso',
        file: 'Prueba\\carpetaPrueba2\\READMEcopy.md'
      }
    ]
   mdLinks(carpeta,{validate:false})
   .then(links=> 
     expect(links).toEqual(resultado))
 })
 test('Caso archivo en parámetro path: Debe retornar un array de los links con propiedades href, text y file, si en el parámetro options se indica {validate:true} ', ()=>{
  const resultado = [
    {
      href: 'https://es.wikipedia.org/wiki/Markdown',
      text: 'Markdown',
      file: 'Prueba2',
      status: 200,
      message: 'OK'
    },
    {
      href: 'https://nodejs.org/',
      text: 'Node.js',
      file: 'Prueba2',
      status: 200,
      message: 'OK'
    },
    {
      href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
      text: 'md-links',
      file: 'Prueba2',
      status: 200,
      message: 'OK'
    }
  ]
mdLinks(carpeta2,{validate:true})
.then(links=> 
  expect(links).toMatch(resultado))
})

});
