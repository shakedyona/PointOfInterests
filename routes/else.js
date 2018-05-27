const express = require('express');
const router = express.Router();
var DButilsAzure = require('../DButils');

// test route to make sure everything is working (accessed at GET http://localhost:3000/auth) good
router.get('/', (req, res) => {
    res.send("Hello world -  else");
});

















module.exports = router;