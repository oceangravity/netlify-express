'use strict';
const axios = require('axios');
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();


const router = express.Router();
router.post('/login', jsonParser, function (req, res) {
  const { data } = req.body;
  const endpoint = `https://api.vimeo.com/videos/${id || 39619054}/`;

  axios({
    method: 'get',
    url: endpoint,
    headers: {
      'Authorization': 'Bearer 49270908714248669759768a47d29b63'
    }
  })
    .then(response => {
      res.status(200)
      res.send(req.body)
    })
    .catch(error => {
      console.log('Error with Axios profile res: ', error)
      res.send({ error })
    })
})


app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
