const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 5001

express()
  .use(express.static(path.join(__dirname, 'public')))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  express.get('/test', (req, res) => {
    res.send('Hello World2!')
  })

  express.get('/', (req, res) => {
    res.send('Hello World1!')
  })