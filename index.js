const crypto = require('crypto')
const express = require('express')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5001;
const secret = process.env.SECRET;
const sigHeaderName = 'x-signature'
//const sigHashAlg = 'HMACSHA256'
const sigHashAlg = 'sha256'
const app = express()
const dotenv = require('dotenv');

app.use(bodyParser.json({
  verify: (req, res, buf, encoding) => {    
    if (buf && buf.length) {
      req.rawBody = buf.toString(encoding || 'utf8');
      console.log('req.rawBody: ' + req.rawBody);
    }
  },
}))

function verifyPostData(req, res, next) {
  try {
    if (!req.rawBody) {
      console.log('req.rawBody2: ' + req.rawBody);
      return next('Request body empty');
    }
    console.log('req.rawBody1: ' + req.rawBody);
    console.log('req.body: ' + req.body);
   
    const signature = Buffer.from(req.get(sigHeaderName) || '', 'utf8');    
    console.log('signature: ' + signature);
    
    const hmac = crypto.createHmac(sigHashAlg, secret)
    console.log('hmac: ' + hmac);
    
    const digest = Buffer.from(sigHashAlg + '=' + hmac.update(req.rawBody).digest('hex'), 'utf8');
    console.log('digest: ' + digest);
    
    if (signature.length !== digest.length || !crypto.timingSafeEqual(digest, signature)) {
      return next(`Request body digest (${digest}) did not match ${sigHeaderName} (${signature})`);
    }

  } catch (error) {
    console.log('error: ' + error);
  }
  

  return next()
}

app.post('/clickSFEvent', verifyPostData, function (req, res) {
  res.status(200).send('Request body was signed');
})

app.get('/', (req, res) => {
  res.send('Hello World OG!');
})

app.use((err, req, res, next) => {
  if (err) console.error(err)
  res.status(403).send('Request body was not signed or verification failed');
})

app.listen(PORT, () => console.log("TDXAPI App listening on port ${PORT}"))