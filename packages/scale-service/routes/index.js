var express = require('express');
var axios = require('axios')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let resposta
  const accounts = axios.get('http://db1service:3000/accounts')
    .then(function (response) {
      console.log(response.data);
      res.send(response.data)
    })
    .catch(function (error) {
      console.log(error);
      res.send(error)
    });
});

module.exports = router;
