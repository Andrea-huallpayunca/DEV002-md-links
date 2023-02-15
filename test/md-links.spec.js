
const { mdLinks } = require ('../md-links.js')


describe('Testeando mdLinks', () => {
  test('una función', () => {
    expect(typeof mdLinks).toBe('function')
  })

  test('Debe rechazar cuando el path no existe', () => {
    const route = 'noExiste.md'
    return mdLinks(route).catch((error)=>{
      expect(error).toBe('La ruta ingresada no existe.')
    })
  });
  
  test('Debe retornar un array de links si el archivo .md es válido', ()=>{
     const okResultNoValidate = [
      { href: 'https://es.wikipedia.org/wiki/Markdown', text: 'Markdown', file: 'Prueba/readmePrueba.md' },
      { href: 'https://nodejs.org/', text: 'Node.js', file: 'Prueba/readmePrueba.md' },
      { href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg', text: 'md-links', file: 'Prueba/readmePrueba.md' },

    ]

    mdLinks('Prueba/readmePrueba.md')
    .then(links=> 
      expect(links).toMatchObject(okResultNoValidate))
  }
)
});
