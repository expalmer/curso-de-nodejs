import sqlite from 'sqlite'
import path from 'path'

const dbFilePath = path.join(__dirname, './my.db')

const createTable = (db) =>
  db.run('CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT NOT NULL, done INT)')

export const getConnection = () =>
  sqlite.open(dbFilePath, { Promise }).then((db) => createTable(db).then(() => db))
