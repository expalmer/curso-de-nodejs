import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import { getConnection } from './sqlite'
import setupTaskRepository from './repositories/task-repository'

function createServer(db) {
  const app = express()

  const taskRepository = setupTaskRepository(db)

  app.use(cors())
  app.use(bodyParser.json())

  app.get('/v1/tasks', (req, res) => {
    taskRepository
      .findAll()
      .then((data) => {
        res.json(data)
      })
      .catch((err) => {
        res.status(500).json({ ops: err })
      })
  })

  app.get('/v1/tasks/:id', (req, res) => {
    const { params } = req
    const { id } = params
    taskRepository
      .findOne(id)
      .then((data) => {
        res.json(data)
      })
      .catch((err) => {
        res.status(400).json({ err: err.message })
      })
  })

  app.post('/v1/tasks', (req, res) => {
    const { body } = req
    taskRepository
      .store(body)
      .then((data) => {
        const { lastID } = data
        res.status(201).json({ id: lastID, ...body })
      })
      .catch((err) => {
        res.status(400).json({ err: err.message })
      })
  })

  app.put('/v1/tasks/:id', (req, res) => {
    const { params, body } = req
    const { id } = params
    taskRepository
      .update(id, body)
      .then(() => {
        res.json({ updated: true })
      })
      .catch((err) => {
        res.status(400).json({ err: err.message })
      })
  })

  app.delete('/v1/tasks/:id', (req, res) => {
    const { params } = req
    const { id } = params
    taskRepository
      .destroy(id)
      .then(() => {
        res.json({ removed: true })
      })
      .catch((err) => {
        res.status(400).json({ err: err.message })
      })
  })

  app.use((err, req, res, next) => {
    const json = { message: err.message }
    return res.status(err.status || 500).json(json)
  })

  return app
}

getConnection()
  .then((conn) => {
    const app = createServer(conn)
    const port = 4000
    app.listen(port, () => console.log(`4. Pronto! Abra em http://localhost:${port}`))
  })
  .catch((err) => {
    console.log('WHOOOOOOOOPS', err)
  })
