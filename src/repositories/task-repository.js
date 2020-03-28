const createRepository = (db) => {
  const findAll = () => db.all('SELECT * FROM tasks ORDER BY id')

  // TODO: tratar - Fiz baseado ali no update que tu já tinha feito!
  const findOne = (id) =>
    db.get('SELECT * FROM tasks WHERE id = ? ', id).then((data) => {
      if (!data) {
        throw new Error('não existe')
      }
      return data;
    })

  // TODO: retornar
  const store = ({ task, done }) =>
    db.run(`INSERT INTO tasks (task, done) VALUES (?, ?)`, [task, done])

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
    findOne,
    store,
    update,
    destroy,
  }
}

export default createRepository
