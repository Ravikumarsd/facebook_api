const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const PORT = process.env.PORT;
const app = express()
      app.use(bodyParser.json())
      app.use(cors())

app.get('/',(req,res) => res.json("Backend is working properly"))


app.listen(PORT || 3000, ()=> console.log(`server is running on port ${PORT}`))