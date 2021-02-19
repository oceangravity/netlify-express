'use strict';

const axios = require('axios');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');

const app = express();

// create application/json parser
const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({extended: false});

// POST /login gets urlencoded bodies
app.post('/login', urlencodedParser, function (req, res) {
  res.send('welcome, ' + req.body.username)
})

app.post('/', (req, res) => {
  const data = req.body;
  const endpoint = `https://api.vimeo.com/videos/${39619054}/`;

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

});

app.use('/.netlify/functions/server', app);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
