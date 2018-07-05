const express = require('express')
const app = express()
const todos = require('./routes/todos')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use('/todos', todos)

mongoose.connect('mongodb://localhost:27017/todos')
	.then(() => app.listen(3000))