# procesosIS
Proyecto realizado para la asignatura "Procesos de Ingeniería del Software" (curso 2025/26).
Este repositorio contiene el trabajo inicial del Sprint 1 enfocado en la parte de "agregar usuario". El objetivo actual es disponer de una implementación de cliente (modelo en memoria) y, opcionalmente, un servidor mínimo si se desea activar.
## Estado actual (archivos relevantes)
- `cliente/index.html` — Interfaz cliente; actualmente carga `cliente/modelo.js`.
- `cliente/modelo.js` — Implementación en memoria del sistema de usuarios (objeto `Sistema` y `Usuario`).
- `servidor/` — (opcional) código de servidor y modelo si se decide activar; puede no existir si no se ha inicializado.
- `README.md` — Este fichero.
## Descripción breve del cliente actual
El archivo `cliente/modelo.js` contiene dos constructoras:
- `Sistema`: mantiene `this.usuarios` como un objeto donde las claves son los nicks. Métodos principales:
	- `agregarUsuario(nick)` — añade un usuario nuevo.
	- `obtenerUsuarios()` — devuelve el objeto `usuarios`.
	- `usuarioActivo(nick)` — comprueba existencia.
	- `eliminarUsuario(nick)` — elimina.
	- `numeroUsuarios()` — devuelve el número de usuarios.
- `Usuario`: almacena sólo `nick` por ahora.
## Cómo ejecutar / probar localmente
1. Abrir `cliente/index.html` en el navegador (doble clic) para revisar la UI si existe contenido HTML.
2. Si quieres levantar un servidor Express local que sirva la carpeta `cliente` y una API de usuarios, crea un `package.json` e instala `express` y `cors` y añade un pequeño `index.js` (no incluido en este estado actual si lo desechaste). Puedo prepararlo si lo deseas.
Ejemplo mínimo para levantar servidor (opcional):
```powershell
npm init -y
npm install express cors nanoid
# crear index.js y servidor que sirva /cliente y exponga /api/usuarios
node index.js
```
## Decisiones y supuestos
- El cliente actual usa almacenamiento en memoria (no persistente). Esto es intencional para la fase inicial de la práctica.
- No se han incluido tests automáticos aún.
## Próximos pasos sugeridos
- Implementar la interfaz HTML requerida por la práctica (formulario de agregar usuario + listado). Puedo añadirla en `cliente/index.html` si lo deseas.
- Añadir persistencia en servidor (`servidor/data/usuarios.json`) y endpoints REST.
- Añadir pruebas unitarias para la lógica de `Sistema`.
Si quieres, preparo ahora mismo el `index.html` concreto que pide la práctica (form + comportamiento) y lo separo en `modelo.js` + `app.js` según el enunciado original. Dime si prefieres todo en un mismo archivo o separado.
