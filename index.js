const express = require('express')
const app = express()
const PORT = process.env.PORT || 5001
var bodyParser = require('body-parser');
var crypto = require('crypto');
var WEBHOOKS_SECRET = "a6LMimILHiKZEXWBvm8yvANVaRJ3J6KTnVAqsdN3vbXU8GkT6ipdrEdaSW86whsi0+e5bfi+Ws6O1U1zUe6jUw==";
//;signingAlgorithm:"HMACSHA256";

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