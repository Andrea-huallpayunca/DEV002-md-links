// const mdLinks = require('../');
const { mdLinks } = require ('../index')


describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });
  it('Debería devolver una promesa', () => {
    expect(mdLinks()).toBe()
  });
  it('Debe rechazar cuando el path no existe', () => {
    const route = 'noExiste.md'
    return mdLinks(route).catch((error)=>{
      expect(error).toBe('La ruta ingresada no existe.')
    })
  });
});
