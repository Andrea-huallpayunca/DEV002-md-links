const { mdLinks } = require ('./index')
const { validateFalse, validateTrue} = require("./md-links");

const optionTrue  = process.argv[1]

mdLinks('noExiste.md')
.then(()=>{

})
.catch((error)=>{
    console.log(error)
})

let archivo = 'README.md'
mdLinks(archivo)
.then( links => validateFalse(links, archivo)
)
.catch((error)=>{
    console.log(error)});


mdLinks(archivo)
.then( links => validateTrue(links, archivo).then(console.log)
)
.catch((error)=>{
    console.log(error)});