# Markdown Links

## Índice

* [1. Resumen del proyecto](#1-Resumen-del-proyecto)
* [2. Como instalar](#2-Como-instalar)
* [3. Como usar](#3-Como-usar)
* [4. Aspectos generales](#4-Aspectos-generales)

***

## 1. Resumen del proyecto
Librería que te permite acceder mediante línea de comando a una API para resolver un array de links de archivos Markdown.

***

## 2. Como instalar

Ingrese a la terminal de su editor de código y digite lo siguiente.

```sh
$ npm install -g Andrea-huallpayunca/md-links-andrea-huallpayunca
```
De esta forma se descargará el paquete.

***

## 3. Como usar

### 1) JavaScript API
Para usar el módulo debe importarse en el archivo donde se usará. 

Estructura de la función:
`mdLinks(path, options)`

##### Argumentos

* `path`: Es la ruta del archivo del cual se quiere extraer los links. También puede ser la ruta de una carpeta.
* `options`: Es un objeto con únicamente la siguiente propiedad:
  - `validate`: Booleano que determina si se desea validar los links encontrados.

##### Valor de retorno

La función **retorna una promesa** (`Promise`) que **resuelva a un arreglo**, donde cada objeto representa un link y contiene
las siguientes propiedades

Si options contiene `validate:false`, entonces retornará lo siguiente:

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.

Si options contiene `validate:true`, entonces retornará lo siguiente:

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.
* `status`: Código de respuesta HTTP.
* `ok`: Mensaje `fail` en caso de fallo u `OK` en caso de éxito.

Al ser una función que retorna una promesa, deberá utilizar el `.then` para visualizar en la consola, de la siguiente forma.


##### Ejemplo de la aplicación(resultados como comentarios)

```js
const mdLinks = require("md-links");

// -- Ejemplo para archivo
mdLinks("./some/example.md",{validate:false})
  .then(links => { 
    console.log(links)
    // => [{ href, text, file }, ...]

  })
  .catch(console.log);

mdLinks("./some/example.md",{validate:true})
  .then(links => {
    console.log(links)
    // => [{ href, text, file, status, ok }, ...]
  })
  .catch(console.log);

// -- Ejemplo para una carpeta
mdLinks("./some/dir",{validate:false})
  .then(links => {
    console.log(links)
    // => [{ href, text, file }, ...]
  })
  .catch(console.log);
```


### 2) CLI (Command Line Interface - Interfaz de Línea de Comando)

Para ejecutar la aplicación mediante la  **terminal**.

Estructura en CLI:
`md-links path options`

La respuesta por defecto, en caso de solo digitar el path, será la siguiente:

```sh
$ md-links ./some/example.md

href: http://algo.com/2/3/
text: Link a algo
file: ./some/example.md

href: https://otra-cosa.net/algun-doc.html
text: algún doc
file: ./some/example.md

```

##### Options

En la parte de `options`, podemos digitar `--validate` o `--stats`.

##### Para `--validate`

Retornará en consola, el arreglo con los valores de: href, texto, file, status, ok.

```sh
$ md-links ./some/example.md --validate

href: http://algo.com/2/3/
text: Link a algo
file: ./some/example.md
status: 200
message: Ok 

href: https://otra-cosa.net/algun-doc.html
text: algún doc
file: ./some/example.md
status: 404 
message: fail

```
###### Para `--stats`

Si pasamos la opción `--stats` el output (salida) será un objeto con las propiedades Total (links en total) y Unique (links únicos).

```sh
$ md-links ./some/example.md --stats
Total: 2
Unique: 2
```

Si escribimos ambas opciones el output será un objeto con las propiedades Total (links en total), Unique (links únicos) y Broken (links rotos).

```sh
$ md-links ./some/example.md --stats --validate

Total: 2
Unique: 2
Broken: 1

```


***

## 4. Aspectos generales

### Documentación

* [Acerca de Node.js](https://nodejs.org/es/about/)
* [Node.js file system](https://nodejs.org/api/fs.html)
* [Linea de comando CLI](https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e)
* [NPM](https://docs.npmjs.com/getting-started/what-is-npm)

### Archivos del Proyecto

* `README.md`: Contiene descripción del módulo, instrucciones de instalación/uso,
  documentación del API y ejemplos.
* `index.js`: Archivo de la función (`mdLinks`).
* `cli.js`: Archivo que llama a la función`mdLinks` para ejecutar en la Línea de comando.
* `package.json`: Contiene el nombre, versión, descripción, autores, licencia,
  dependencias, scripts, main, bin.
* `.editorconfig`: con configuración para editores de texto.
* `.eslintrc`: con configuración para linter. Este archivo contiene una
  configuración básica para ESLint, si deseas agregar reglas adicionales
  como Airbnb deberás modificar este archivo.
* `.gitignore`: para ignorar `node_modules` u otras carpetas que no deban
  incluirse en control de versiones (`git`).
* `test/md-links.spec.js`: contiene los tests unitarios para la función
  `mdLinks()`.

