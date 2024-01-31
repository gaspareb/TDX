const express = require('express')

const PORT = process.env.PORT || 5001

app.get('/test', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${PORT}`)
})