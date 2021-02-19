'use strict';
const axios = require('axios');
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const router = express.Router();

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({extended: true}));

// parse application/json
router.use(bodyParser.json({ type: 'application/*+json' }))

router.post('/', (req, res) => {
  const data = req.body;
  const endpoint = `https://api.vimeo.com/videos/${ data.id || 39619054 }/`;

  axios({
    method: 'get',
    url: endpoint,
    headers: {
      'Authorization': 'Bearer 49270908714248669759768a47d29b63'
    }
  })
    .then(response => {
      res.status(200)
      res.send(data)
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
