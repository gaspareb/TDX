const crypto = require('crypto')
const express = require('express')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5001;
const signing_key = process.env.SECRET;
const sigHeaderName = 'x-signature'
const sigHashAlg = 'sha256'
const app = express()
const dotenv = require('dotenv');

app.use(bodyParser.json({
  verify: (req, res, buf, encoding) => {    
    console.log('buf.length: ' + buf.length + ':' + encoding);
    if (buf && buf.length) {
      req.rawBody = buf.toString(encoding || 'utf8');
      console.log('req.rawBodyA: ' + req.rawBody);
    }
  },
}))

function verifyPostData(req, res, next) {
  try {
    if (!req.rawBody) {
      console.log('req.rawBody2: ' + req.rawBody);
      return next('Request body empty');
    }
    console.log('req.body3: ' + JSON.stringify(req.rawBody));
    const signature = Buffer.from(req.get(sigHeaderName) || '', 'utf8');    
    //const signature = req.headers['x-signature'];
    console.log('signature: ' + signature);
    
    const hmac = crypto.createHmac(sigHashAlg, signing_key)
    console.log('hmac: ' + hmac);
    
    const digest = Buffer.from(hmac.update(req.rawBody).digest('base64'));
    console.log('digest: ' + digest);

    if (crypto.timingSafeEqual(digest, signature)) {
      console.log('MATCH: ');
      var obj = JSON.parse(req.rawBody);
      var array = Object.keys(obj)
      console.log('array: ' + array);
      for (var i = 0; i < array.length; i++) {
          console.log(array[i], obj[array[i]]);
      }

      res.status(200).send('Request body was signed');
    }else{
      console.log('NO MATCH: ');
      return next('Request body digest ' + digest + ' DID NOT MATCH ' + signature);
      
    }

  } catch (error) {
    console.log('error: ' + error);
  }
  

  //return next()
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

app.listen(PORT, () => console.log("TDXAPI App listening on port " + PORT))