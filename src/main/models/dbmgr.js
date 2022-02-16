const os = require('os');
const Database = require('better-sqlite3');

const saveRoute = `${os.homedir()}\\AppData\\Roaming\\book-organizer\\data\\mydb.db`;
const db = new Database(saveRoute);

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
