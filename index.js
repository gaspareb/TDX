const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 5001

const app = express()
  .use(express.static(path.join(__dirname, 'public')))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })