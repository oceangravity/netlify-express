'use strict';
const axios = require('axios');
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true }))
const allowedOrigins = ['http://localhost:3000',
  'https://www.supercode.co.za'];
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      let msg = 'The CORS policy for this site does not ' +
        'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
const router = express.Router();

router.post('/', (req, res) => {
  const endpoint = `https://api.vimeo.com/videos/${req.body.id || 39619054}/`;
  res.status(200)

  axios({
    method: 'get',
    url: endpoint,
    headers: {
      'Authorization': 'Bearer 49270908714248669759768a47d29b63'
    }
  })
    .then(response => {
      res.status(200)
      res.json(response.data)
    })
    .catch(error => {
      console.log('Error with Axios profile res: ', error)
      res.send({ error })
    })

});

app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);

