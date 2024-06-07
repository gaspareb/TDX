const express = require('express')
const app = express()
const PORT = process.env.PORT || 5001
var bodyParser = require('body-parser');
var crypto = require('crypto');

app.get('/', (req, res) => {
  res.send('Hello World OG!')
})

app.get('/test', (req, res) => {
  res.send('Hello World 1!')
})

app.post('/dcexport', (req, res) => {
  res.send('Hello World 2!')
})

app.post('/posttest', (req, res) => {
  res.send('Hello World 3!')
})

app.get('/clickSFEvent', (req, res) => {
  res.send('Hello World 3!')
})

app.listen(PORT, () => {
  console.log(`TDXAPI App listening on port ${PORT}`)
})