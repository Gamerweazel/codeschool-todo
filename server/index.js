const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const todos = require('./routes/todos')

app.use(morgan('tiny'))
app.use(bodyParser.json())

app.use('/todos', todos)

mongoose.connect('mongodb://localhost:27017/todos')
  .then(() => app.listen(3000))
