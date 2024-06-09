const express = require('express')
const app = express()
const PORT = process.env.PORT || 5001
const bodyParser = require('body-parser');
//var crypto = require('crypto');
const WEBHOOKS_SECRET = "a6LMimILHiKZEXWBvm8yvANVaRJ3J6KTnVAqsdN3vbXU8GkT6ipdrEdaSW86whsi0+e5bfi+Ws6O1U1zUe6jUw==";
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
  console.log("/posttest requested");
  res.send('Hello World 3!')
})

app.post('/clickSFEvent', (req, res) => {
  console.log("/clickSFEvent requested");
  if(!req.signature_match) {
    console.log("req.signature_match: " + req.signature_match);
    return res.status(403).send('not called from webhooks service');
  }

  //res.status(204).send();

  // do whatever work needs to be done with the webhooks payload
  const body = req.body;
  console.log(body);
  res.status(204).send('Hello World 3!')
})

app.listen(PORT, () => {
  console.log(`TDXAPI App listening on port ${PORT}`)
})

function verifySignature(req, res, buf, encoding) {
  console.log("buf:" + buf);
  console.log("encoding:" + encoding);
  const signature = req.header('x-adsk-signature');
  if(!signature) { console.log("signature:" + signature); return; }

  // use utf-8 encoding by default
  const body    = buf.toString(encoding);
  console.log("body:" + body);
  const hmac    = crypto.createHmac('sha1', WEBHOOKS_SECRET);
  console.log("hmac:" + hmac);
  const calcSignature = 'sha1hash=' + hmac.update(body).digest('hex');
  console.log("calcSignature:" + calcSignature);
  req.signature_match = (calcSignature === signature);
}

app.use(bodyParser.json({
  inflate: true,
  limit: '1024kb',
  type: 'application/json',
  verify: verifySignature
}));