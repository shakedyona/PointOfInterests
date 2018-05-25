const express = require('express');
const router = express.Router();
var DButilsAzure = require('../DButils');

router.get('/', (req, res) => {
    res.send("Hello world");
});


router.post('/user', (req, res) => {
    let username = req.param('username');
    let password = req.param('password');

    res.status(200).json({
        username: username,
        password: password
    });
});

router.post('/getAllUsers', (req, res) => {
    let username = req.param('username');

    DButilsAzure.execQuery(`SELECT * FROM dbo.users WHERE username = '${username}'`)
    .then((response, err) => {
        if(err)
            res.status(400).json({message: err.message});
        else{
            res.status(200).json({
                data: response
            });
        }
    })
    .catch(function(err) {
        res.status(400).json({message: err.message});
    });
});

module.exports = router;