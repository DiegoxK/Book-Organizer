const { contextBridge, ipcRenderer } = require('electron');
const {
  getLibros,
  getLibrosDisponibles,
  getLibrosPrestados,
  insertLibro,
  getTemas,
  insertTema,
  getEditoriales,
  insertEditorial,
  getAutores,
  insertAutor,
  getEstudiantes,
  insertEstudiante,
} = require('./models/dbmgr');

contextBridge.exposeInMainWorld('electron', {
  apiCalls: {
    // libros
    apiGetLibros() {
      return getLibros();
    },
    apiGetLibrosDisponibles() {
      return getLibrosDisponibles();
    },
    apiGetLibrosPrestados() {
      return getLibrosPrestados();
    },
    apiInsertLibro(titulo, temaId, editorialId, autorId) {
      return insertLibro(titulo, temaId, editorialId, autorId);
    },
    // temas
    apiGetTemas() {
      return getTemas();
    },
    apiInsertTemas(tema) {
      return insertTema(tema);
    },

    // Editorial
    apiGetEditoriales() {
      return getEditoriales();
    },
    apiInsertEditorial(editorial) {
      return insertEditorial(editorial);
    },

    // Autor
    apiGetAutores() {
      return getAutores();
    },
    apiInsertAutor(nombre, apellido) {
      return insertAutor(nombre, apellido);
    },

    // Estudiantes
    apiGetEstudiantes() {
      return getEstudiantes();
    },
    apiInsertEstudiante(nombre, apellido, telefono, email, direccion) {
      return insertEstudiante(nombre, apellido, telefono, email, direccion);
    },
  },
  ipcRenderer: {
    myPing() {
      ipcRenderer.send('ipc-example', 'ping');
    },
    on(channel, func) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    once(channel, func) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    },
  },
});
