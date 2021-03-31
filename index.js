// require
const express = require('express')
const cors = require('cors')
require('dotenv').config()

// middle wire
app.use(cors())
app.use(express.json())

// 
const app = express()
const port = process.env.PORT || 3000;

// default
app.get('/', (req, res) => {
  res.send('Hello World!')
})
// default
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})