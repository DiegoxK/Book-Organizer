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

// Libros
exports.getLibros = () => {
  const sql =
    "SELECT l.LibroId, l.Titulo, a.Nombre || ' ' || a.Apellido AS Autor, e.Nombre AS Editorial, t.Tema, l.Estado FROM Libros l JOIN Autores a ON a.AutorId = l.AutorId JOIN Editoriales e ON e.EditorialId = l.EditorialId JOIN Temas t ON t.TemaId = l.TemaId";
  const stmt = db.prepare(sql);
  const res = stmt.all();
  return res;
};

exports.getLibrosDisponibles = () => {
  const sql = `
    SELECT
      l.LibroId,
      l.Titulo,
      a.Nombre || ' ' || a.Apellido AS Autor,
      e.Nombre AS Editorial,
      t.Tema,
      l.Estado
    FROM Libros l
    JOIN Autores a
      ON a.AutorId = l.AutorId
    JOIN Editoriales e
      ON e.EditorialId = l.EditorialId
    JOIN Temas t
      ON t.TemaId = l.TemaId
    WHERE Estado = 0
    `;
  const stmt = db.prepare(sql);
  const res = stmt.all();
  return res;
};

exports.getLibrosPrestados = () => {
  const sql =
    "SELECT l.LibroId, l.Titulo, a.Nombre || ' ' || a.Apellido AS Autor, e.Nombre AS Editorial, t.Tema, l.Estado FROM Libros l JOIN Autores a ON a.AutorId = l.AutorId JOIN Editoriales e ON e.EditorialId = l.EditorialId JOIN Temas t ON t.TemaId = l.TemaId WHERE Estado = 0";
  const stmt = db.prepare(sql);
  const res = stmt.all();
  return res;
};

exports.insertLibro = (titulo, temaId, editorialId, autorId) => {
  const sql = `
  INSERT INTO Libros (Titulo, TemaId, EditorialId, AutorId)
  VALUES ('${titulo}','${temaId}','${editorialId}','${autorId}')
  `;
  const stmt = db.prepare(sql);
  const res = stmt.run();
};

// Temas
exports.getTemas = () => {
  const sql = 'SELECT * FROM Temas';
  const stmt = db.prepare(sql);
  const res = stmt.all();
  return res;
};

exports.insertTema = (tema) => {
  const sql = `
  INSERT INTO Temas (Tema)
  VALUES ('${tema}')
  `;
  const stmt = db.prepare(sql);
  const res = stmt.run();
};

// Editorial
exports.getEditoriales = () => {
  const sql = 'SELECT * FROM Editoriales';
  const stmt = db.prepare(sql);
  const res = stmt.all();
  return res;
};

exports.insertEditorial = (editorial) => {
  const sql = `
  INSERT INTO Editoriales (Nombre)
  VALUES ('${editorial}')
  `;
  const stmt = db.prepare(sql);
  const res = stmt.run();
};

// Autor
exports.getAutores = () => {
  const sql = 'SELECT * FROM Autores';
  const stmt = db.prepare(sql);
  const res = stmt.all();
  return res;
};

exports.insertAutor = (nombre, apellido) => {
  const sql = `
  INSERT INTO Autores (Nombre, Apellido)
  VALUES ('${nombre}', '${apellido}')
  `;
  const stmt = db.prepare(sql);
  const res = stmt.run();
};

// Estudiantes
exports.getEstudiantes = () => {
  const sql = 'SELECT * FROM Estudiantes';
  const stmt = db.prepare(sql);
  const res = stmt.all();
  return res;
};

exports.insertEstudiante = (nombre, apellido, telefono, email, direccion) => {
  const sql = `
  INSERT INTO Estudiantes (Nombre, Apellido, Telefono, Email, Direccion)
  VALUES ('${nombre}', '${apellido}', '${telefono}', '${email}', '${direccion}')
  `;
  const stmt = db.prepare(sql);
  const res = stmt.run();
};

// Prestamos
exports.getPrestamos = () => {
  const sql = `
  SELECT
    l.LibroId,
    e.EstudianteId,
    p.PrestamoId,
    e.Nombre || ' ' || e.Apellido AS Estudiante,
    l.Titulo AS Libro,
    p."Fecha Prestamo",
    p."Fecha Limite",
    l.Estado
  FROM Prestamos p
  JOIN Estudiantes e
	  ON e.EstudianteId  = p.EstudianteId
  JOIN Libros l
	  ON l.LibroId = p.LibroId
  WHERE l.Estado = 1
   `;
  const stmt = db.prepare(sql);
  const res = stmt.all();
  return res;
};

exports.insertPrestamo = (
  estudianteId,
  libroId,
  fechaPrestamo,
  fechaLimite
) => {
  const sql = `
  INSERT INTO Prestamos (EstudianteId, LibroId, "Fecha Prestamo", "Fecha Limite")
  VALUES ('${estudianteId}', '${libroId}', '${fechaPrestamo}', '${fechaLimite}')
  `;
  const stmt = db.prepare(sql);
  const res = stmt.run();
};

// Devolucion
exports.makeDevolution = (
  fechaDevolucion,
  estudianteId,
  libroId,
  prestamoId
) => {
  const sql1 = `
  INSERT INTO Historial ("Fecha Devolucion", EstudianteId, LibroId, PrestamoId)
  VALUES ('${fechaDevolucion}', '${estudianteId}', '${libroId}', '${prestamoId}')
  `;
  const stmt1 = db.prepare(sql1);
  stmt1.run();
  //  ===========================================================================
  const sql2 = `
  UPDATE Libros
  SET Estado = 0
  WHERE LibroId = ${libroId}
  `;
  const stmt2 = db.prepare(sql2);
  stmt2.run();
  //  ===========================================================================
  const sql3 = `
  DELETE FROM Prestamos
  WHERE LibroId = ${libroId}
  `;
  const stmt3 = db.prepare(sql3);
  stmt3.run();
};

exports.updatePrestamo = (estado, id) => {
  const sql = `
    UPDATE Libros
    SET Estado = ${estado}
    WHERE LibroId = ${id}
    `;
  const stmt = db.prepare(sql);
  const res = stmt.run();
};

// Historial

exports.getHistorial = () => {
  const sql = `
  SELECT
    h.HistorialId,
    e.Nombre || ' ' || e.Apellido AS Estudiante,
    l.Titulo,
    p."Fecha Prestamo",
    p."Fecha Limite",
    h."Fecha Devolucion"
  FROM Historial h
  JOIN Estudiantes e
    ON h.EstudianteId = e.EstudianteId
  JOIN Libros l
    ON h.LibroId = l.LibroId
  JOIN Prestamos p
    ON h.PrestamoId = p.PrestamoId
   `;
  const stmt = db.prepare(sql);
  const res = stmt.all();
  return res;
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
