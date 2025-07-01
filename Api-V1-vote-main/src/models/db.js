const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

let db;

async function initDb() {
  db = await open({ filename: ':memory:', driver: sqlite3.Database });
  await db.exec(
  'CREATE TABLE IF NOT EXISTS members (' +
  'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
  'first_name TEXT NOT NULL, ' +
  'last_name TEXT NOT NULL, ' +
  'birth_date TEXT NOT NULL, ' +
  'has_voted INTEGER NOT NULL DEFAULT 0, ' +
  'voted_at TEXT NULL, ' +
  'UNIQUE(first_name, last_name, birth_date)' +
  ');'
);
const members = [
    ['Alice', 'Durand', '1985-02-14'],
    ['Bob', 'Martin', '1978-06-30'],
    ['Carole', 'Lefevre', '1990-11-23'],
    ['David', 'Petit', '1982-03-05'],
    ['Emma', 'Bernard', '1995-08-19']
  ];
  for (const [first, last, birth] of members) {
    await db.run(
      'INSERT OR IGNORE INTO members (first_name, last_name, birth_date) VALUES (?, ?, ?)',
      first, last, birth
    );
  }
}


function getDb() {
  if (!db) {
    throw new Error('Database not initialized. Call initDb() first.');
  }
  return db;
}

module.exports = { initDb, getDb };
