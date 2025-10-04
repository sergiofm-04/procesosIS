const modelo = require("./modelo.js");

describe('El sistema...', function() {
  let sistema;

  beforeEach(function() {
    sistema = new modelo.Sistema();
  });

  it('puede agregar un usuario', function() {
    sistema.agregarUsuario('juan');
    expect(sistema.usuarioActivo('juan').res).toBeTrue();
  });

  it('puede obtener la lista de usuarios', function() {
    sistema.agregarUsuario('ana');
    sistema.agregarUsuario('luis');
    const usuarios = sistema.obtenerUsuarios();
    expect(Object.keys(usuarios)).toEqual(['ana', 'luis']);
  });

  it('verifica si un usuario está activo', function() {
    sistema.agregarUsuario('carlos');
    expect(sistema.usuarioActivo('carlos').res).toBeTrue();
    expect(sistema.usuarioActivo('marta').res).toBeFalse();
  });

  it('puede eliminar un usuario', function() {
    sistema.agregarUsuario('maria');
    sistema.eliminarUsuario('maria');
    expect(sistema.usuarioActivo('maria').res).toBeFalse();
  });

  it('inicialmente no hay usuarios', function() {
    expect(sistema.numeroUsuarios().num).toEqual(0);
  });
});
