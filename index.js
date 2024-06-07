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

function verifySignature(req, res, buf, encoding) {
  const signature = req.header('x-adsk-signature');
  if(!signature) { return; }

  // use utf-8 encoding by default
  const body    = buf.toString(encoding);
  const hmac    = crypto.createHmac('sha1', WEBHOOKS_SECRET);
  const calcSignature = 'sha1hash=' + hmac.update(body).digest('hex');
  req.signature_match = (calcSignature === signature);
}

app.use(bodyParser.json({
  inflate: true,
  limit: '1024kb',
  type: 'application/json',
  verify: verifySignature
}));