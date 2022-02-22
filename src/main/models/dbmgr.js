const os = require('os');
const Database = require('better-sqlite3');
const jetpack = require('fs-jetpack');

const saveRoute = `${os.homedir()}\\AppData\\Roaming\\book-organizer\\data\\dbmodel.db`;

if (jetpack.exists(saveRoute)) {
  console.log('The file Already Exist');
} else {
  jetpack.copy(__dirname + '\\dbmodel.db', saveRoute);
  console.log('File Created!');
}

const db = new Database(saveRoute);

// Api calls

exports.getLibros = () => {
  const sql =
    "SELECT l.LibroId, l.Titulo, a.Nombre || ' ' || a.Apellido AS Autor, e.Nombre AS Editorial, t.Tema FROM Libros l JOIN Autores a ON a.AutorId = l.AutorId JOIN Editoriales e ON e.EditorialId = l.EditorialId JOIN Temas t ON t.TemaId = l.TemaId";
  const stmt = db.prepare(sql);
  const res = stmt.all();
  return res;
};

exports.getEstudiantes = () => {
  const sql = 'SELECT * FROM Estudiantes';
  const stmt = db.prepare(sql);
  const res = stmt.all();
  return res;
};

exports.insertLibros = () => {
  const sql = `
  INSERT INTO Libros (Titulo)
  VALUES ('${name}')
  `;
  const stmt = db.prepare(sql);
  const res = stmt.run();
};

// Ejemplos

// =====================================================================================

exports.getNames = () => {
  const sql = 'SELECT * FROM users';
  const stmt = db.prepare(sql);
  const res = stmt.all();
  return res;
};

exports.insertName = (name) => {
  const sql = `
  INSERT INTO users (first_name)
  VALUES ('${name}')
  `;
  const stmt = db.prepare(sql);
  const res = stmt.run();
  console.log(res);
};

exports.deleteName = (id) => {
  const sql = `
  DELETE FROM users
  WHERE id = ${id}
  `;
  const stmt = db.prepare(sql);
  const res = stmt.run();
  console.log(res);
};

// ======================================================================================
