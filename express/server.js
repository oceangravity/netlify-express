'use strict';
const axios = require('axios');
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true }))

const router = express.Router();

router.post('/', (req, res) => {
  const endpoint = `https://api.vimeo.com/videos/${req.body.id || 39619054}/`;
  res.status(200)
  res.json(endpoint)

  axios({
    method: 'get',
    url: endpoint,
    headers: {
      'Authorization': 'Bearer 49270908714248669759768a47d29b63'
    }
  })
    .then(response => {
      res.status(200)
      res.send(response.data)
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

