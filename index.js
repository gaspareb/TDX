const crypto = require('crypto')
const express = require('express')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5001;
//const secret = '0FdRFdnNQppXAECzVQyagPwA9jNmdgiQltU9KTjzmQjU6810vlutLRijNbwXUEq19b+YocdbyIWez7OJ1x8K5A==';
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
  
    console.log('sig1: ' + req.get(sigHeaderName));
  
    const sig = Buffer.from(req.get(sigHeaderName) || '', 'utf8');
    
    console.log('sig2: ' + sig);
    const signature = req.headers[sigHeaderName];
    console.log('signature: ' + signature);
    const hmac = crypto.createHmac(sigHashAlg, secret)
    console.log('hmac: ' + hmac);
    console.log('hmac2: ' + Buffer.from(sigHashAlg + '=' + hmac.update(req.rawBody).digest('hex')));
    const digest = Buffer.from(sigHashAlg + '=' + hmac.update(req.rawBody).digest('hex'), 'utf8');
    console.log('digest: ' + digest);
    if (sig.length !== digest.length || !crypto.timingSafeEqual(digest, sig)) {
      return next(`Request body digest (${digest}) did not match ${sigHeaderName} (${sig})`);
    }
  } catch (error) {
    console.log('error: ' + error);
  }
  

  return next()
}

app.post('/clickSFEvent', verifyPostData, function (req, res) {
  console.log('headers: ' + JSON.stringify(req. headers));
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