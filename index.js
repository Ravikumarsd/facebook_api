'use strict'

const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      request = require('request'),
      app = express().use(bodyParser.json()).use(cors()),
      PORT = process.env.PORT,
      PAGE_ACCESS_TOKEN = "EAAHp9ZATUmfsBALvFzHYUwqwecJdZB6ZCzlIQt1qJdHanDp5urqJekj2rfHYZBUex0BN66LmgZBUtIpk5fZCs43mDdtCeIOwCTO7zrypiDxoLnZBaTJQtMq71il6vtdFnhqNCuZAQZAX811ZCdYIDn8ZBOfsgjlEiYhfPcKqYZCvAZCMyfN1qziaOveW7MoBjQCTvZB704hkBhE5OZC3gZDZD";


app.get('/', (req, res) => res.json("Backend is working properly"))

app.post('/webhook', (req, res) => {
      let body = req.body;
      if (body.object === 'page') {
            body.entry.forEach(entry => {
                  // Gets the body of the webhook event
                  let webhook_event = entry.messaging[0]
                  console.log(webhook_event)

                  //Get the sender PSID
                  let sender_psid = webhook_event.sender.id
                  console.log('Sender PSID: ' + sender_psid)

                  if (webhook_event.message) {
                        handleMessage(sender_psid, webhook_event.message)
                  } else if (webhook_event.postback) {
                        handlePostback(sender_psid, webhook_event.postback);
                  }
            })
            res.status(200).send('EVENT_RECEIVED')
      } else {
            res.sendStatus(404) //not found
      }
})


app.get('/webhook', (req, res) => {
      let VERIFY_TOKEN = "chatbot"
      let mode = req.query['hub.mode']
      let token = req.query['hub.verify_token']
      let challenge = req.query['hub.challenge']

      if (mode && token) {
            if (mode === 'subscribe' && token === VERIFY_TOKEN) {

                  console.log('WEBHOOK_VERIFIED');
                  res.status(200).send(challenge);
            } else {
                  res.sendStatus(403) //forbidden
            }
      }


























})


//Handles messages events 
 const handleMessage = (sender_psid, received_message) =>{
      let response;

      if(received_message.text) {
            response = {
                  "text": `You sent the message: "${received_message.text}". Now send me an image!`
            }
      }
      callSendAPI(sender_psid, response);
}


// // Handles messaging_postbacks events
const handlePostback = (sender_psid, received_postback) => {

}


// Sends response messages via the Send API
const callSendAPI=(sender_psid, response) => {
      //Construct the message body
      let request_body = {
            "recipient": {
                  "id": sender_psid
            },
            "message":response
      }
      // Send the HTTP request to the Messenger Platform
  request({
      "uri": "https://graph.facebook.com/v2.6/me/messages",
      "qs": { "access_token": PAGE_ACCESS_TOKEN},
      "method": "POST",
      "json": request_body
    }, (err, res, body) => {
      if (!err) {
        console.log('message sent!')
      } else {
        console.error("Unable to send message:" + err);
      }
    }); 
  }

app.listen(PORT || 3000, () => console.log(`server is running on port ${PORT}`))