const Database = require('better-sqlite3');
const db = new Database('./mydb.db');

exports.getNames = () => {
  const sql = 'SELECT * FROM users';
  let stmt = db.prepare(sql);
  let res = stmt.all();
  return res;
};

exports.insertName = (name) => {
  const sql = `
  INSERT INTO users (first_name)
  VALUES ('${name}')
  `;
  db.exec(sql);
};

exports.deleteName = (id) => {
  const sql = `
  DELETE FROM users
  WHERE id = ${id}
  `;
  db.exec(sql);
};
