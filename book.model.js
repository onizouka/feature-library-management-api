import { DatabaseSync } from "node:sqlite";
const db = new DatabaseSync(":memory:");

db.exec(`
  CREATE TABLE book (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    copies INTEGER NOT NULL CHECK (copies >= 0)
  )
`);

const getAllBooks = (callback) => {
  const request = db.prepare(`SELECT * FROM book`);
  const rows = request.all();
  callback(null, rows);
};

const getBookById = (id, callback) => {
  const request = db.prepare(`SELECT * FROM book WHERE id = ?`);
  const row = request.get(id);
  callback(null, row);
};

const createBook = (book, callback) => {
  const request = db.prepare(
    `INSERT INTO book (title, author, copies) VALUES (?, ?, ?)`,
  );

  const { title, author, copies } = book;
  const { lastInsertRowid } = request.run(title, author, copies);
  callback(null, lastInsertRowid);
};

const updateBook = (id, book, callback) => {
  const { title, author, copies } = book;

  const request = db.prepare(
    `UPDATE book SET title = ?, author = ?, copies = ? WHERE id = ?`,
  );

  const { changes } = request.run(title, author, copies, id);
  callback(null, changes);
};

const deleteBook = (id, callback) => {
  const request = db.prepare(`DELETE FROM book WHERE id = ?`);
  const { changes } = request.run(id);
  callback(null, changes);
};

export default {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
