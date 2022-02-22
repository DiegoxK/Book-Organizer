const { contextBridge, ipcRenderer } = require('electron');
const { getLibros, getEstudiantes, insertLibros } = require('./models/dbmgr');

contextBridge.exposeInMainWorld('electron', {
  apiCalls: {
    apiGetLibros() {
      return getLibros();
    },
    apiGetEstudiantes() {
      return getEstudiantes();
    },
    apiInsertLibros(titulo) {
      return insertLibros(titulo);
    },
  },
  ipcRenderer: {
    myPing() {
      ipcRenderer.send('ipc-example', 'ping');
    },
    newWindow(url) {
      ipcRenderer.send('modalWindow', url);
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
