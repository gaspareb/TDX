const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 5001

express()
  .use(express.static(path.join(__dirname, 'public')))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

const app = express()

app.get('/test', (req, res) => {
  res.send('Hello World2!')
})

app.get('/', (req, res) => {
  res.send('Hello World1!')
})