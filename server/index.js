const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(morgan('tiny'))

app.get('/', (req, res) => {
  res.send('hello')
})

app.listen(3000, (req, res) => {
  console.log('Server listening on port 3000')
})
