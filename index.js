'use strict'

const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      app = express().use(bodyParser.json()).use(cors()),
      PORT = process.env.PORT


app.get('/',(req,res) => res.json("Backend is working properly"))

app.post('/webhook',(req,res)=>{
      let body = req.body;
      if(body.object === 'page') {
            body.entry.forEach(entry => {
                  let webhook_event = entry.messaging[0]
                  console.log(webhook_event)
            })
      res.status(200).json('EVENT_RECEIVED')
   } else {
         res.sendStatus(404) //not found
   }
})


app.get('/webhook',(req,res)=>{
      let VERIFY_TOKEN = "chatbot"

      let mode = req.query['hub.mode']
      let token = req.query['hub.verify_token']
      let challenge = req.query['hub.challenge']

      if(mode && token) {
            if(mode === 'subscribe' && token === VERIFY_TOKEN) {

                  console.log('WEBHOOK_VERIFIED');
                  res.status(200).send(challenge);
            } else {
                  res.sendStatus(403) //forbidden
            }
      }
})
app.listen(PORT || 3000, ()=> console.log(`server is running on port ${PORT}`))