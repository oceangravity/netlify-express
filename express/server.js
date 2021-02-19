'use strict';
const axios = require('axios');
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser);
app.post('/', (req, res) => {
  const endpoint = `https://api.vimeo.com/videos/${res.body.id || 39619054}/`;

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

module.exports.handler = serverless(app);
