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
$ npm install -g nombreUser/DEV002-md-links
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
* `options`: Es la opcion sobre la cuál se tiene un valor de retorno.

##### Valor de retorno

La función **retorna una promesa** (`Promise`) que **resuelva a un arreglo**, donde cada objeto representa un link y contiene
las siguientes propiedades

Si options es igual a `false` o no se escribe, entonces retornará lo siguiente:

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.

Si options es igual a `true`, entonces retornará lo siguiente:

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
mdLinks("./some/example.md")
  .then(links => { 
    console.log(links)
    // => [{ href, text, file }, ...]

  })
  .catch(console.error);

mdLinks("./some/example.md",'true')
  .then(links => {
    console.log(links)
    // => [{ href, text, file, status, ok }, ...]
  })
  .catch(console.error);

// -- Ejemplo para una carpeta
mdLinks("./some/dir")
  .then(links => {
    console.log(links)
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);
```


### 2) CLI (Command Line Interface - Interfaz de Línea de Comando)

Para ejecutar la aplicación mediante la  **terminal**.

Estructura en CLI:
`md-links path options`

La respuesta por defecto, en caso de solo digitar el path, será la siguiente:

```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```

##### Options

En la parte de `options`, podemos digitar `--validate` o `--stats`.

##### Para `--validate`

Retornará en consola, el arreglo con los valores de: href, texto, file, status, ok.

```sh
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
```
###### Para `--stats`

Si pasamos la opción `--stats` el output (salida) será un texto con estadísticas
básicas sobre los links.

```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
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

