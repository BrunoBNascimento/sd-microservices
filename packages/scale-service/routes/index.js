var express = require('express');
var axios = require('axios')
var serviceSocket = require('../serviceSocket').serviceSocket
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const db1servicecon = serviceSocket('db1service', 'accounts')
  const result = db1servicecon({ method: 'GET' })

  result.then(function (response) {
          console.log(response.data);
          res.send(response.data)
        })
        .catch(function (error) {
          console.log(error);
          res.send(error)
        });
});

module.exports = router;
