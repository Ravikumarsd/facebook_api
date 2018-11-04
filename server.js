const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const PORT = process.env.PORT;
const app = express()
      app.use(bodyParser.json())
      app.use(cors())

app.get('/',(req,res) => res.json("Backend is working properly"))

app.post('/signin',(req,res) => {
    const {name} = req.body;
    res.json(`Content received in ${name}`)
})
app.listen(3000, ()=> console.log(`server is running on port 3000`))