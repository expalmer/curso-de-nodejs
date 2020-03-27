import { getId } from '../libs/utils'

const createRepository = (db) => {
  const findAll = () => db.all('SELECT * FROM tasks ORDER BY id')

  const store = ({ task, done }) =>
    db.run(`INSERT INTO tasks (id, task, done) VALUES (?, ?, ?)`, [getId(), task, done])

  const update = (id, { task, done }) =>
    db.get(`SELECT * FROM tasks WHERE id = ?`, [id]).then((data) => {
      if (!data) {
        throw new Error('não existe')
      }
      return db.run(`UPDATE tasks SET task = ?, done = ? WHERE id = ?`, [task, done, id])
    })

  const destroy = (id) =>
    db.get(`SELECT * FROM tasks WHERE id = ?`, [id]).then((data) => {
      if (!data) {
        throw new Error('não existe')
      }
      return db.run(`DELETE FROM tasks WHERE id = ?`, [id])
    })

  return {
    findAll,
    store,
    update,
    destroy,
  }
}

export default createRepository
