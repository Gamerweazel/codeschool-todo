const express = require('express')
const app = express()
const todos = require('./routes/todos')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type')
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT')
  next()
})

app.use(bodyParser.json())
app.use('/todos', todos)

mongoose.connect('mongodb://localhost:27017/todos')
	.then(() => app.listen(3000))