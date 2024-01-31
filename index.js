const express = require('express')
const app = express()
const PORT = process.env.PORT || 5001

app.get('/test', (req, res) => {
  res.send('Hello World!')
})

app.post('/posttest', (req, res) => {
  res.send('Hello Worl3!')
})

app.listen(PORT, () => {
  console.log(`TDXAPI App listening on port ${PORT}`)
})