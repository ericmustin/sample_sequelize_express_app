const tracer = require('dd-trace').init()
const todosController = require('./server/controllers').todos;
const environment = 'development';    // if something else isn't setting ENV, use development
const express = require('express')
const app = express()
const port = 3000

app.get('/', async (req, res) => {
	console.log('request recd')

  var info = await todosController.getAll()
  console.log('info is', info)

  res.send(`Hello World! info: ${info}`)

})

app.get('/api/create', todosController.create)

app.get("/api/show", async (req,res) => {
  console.log('getting specific todoId', req.query.todoId)
  await todosController.getTodoRaw(req)
  res.status(200).send("OK Testing")
})

app.get("/api/show_null", async (req,res) => {
  console.log('getting specific todoId', req.query.todoId)
  await todosController.getTodoRawNull(req)
  res.status(200).send("OK Testing")
})

app.get("/orm/show", async (req,res) => {
  console.log('getting specific todoId', req.query.todoId)
  await todosController.getTodo(req)
  res.status(200).send("OK Testing")
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
