const express = require('express');
const router = express.Router();
var DButilsAzure = require('../DButils');

// test route to make sure everything is working (accessed at GET http://localhost:3000/auth) good
router.get('/', (req, res) => {
    res.send("Hello world -  analy");
    next();
});

router.post('/getTopRecPointsToUser', (req, res) => {

});

router.post('/getLastPointToUser', (req, res) => {

});

router.get('/getCategories', function (req, res){

    let categories = {}
    var i;

    DButilsAzure.execQuery(`SELECT * FROM dbo.Categories`)
    .then((response, err) => {
        if(err)
            res.status(400).json({message: err.message});
        else{
            //let jsonObject = JSON.parse(response);
            for (i=0 ; i<4 ; i++){
                categories[i] = response[i];

            }
            console.log("categories: "+categories);
            res.status(200).json({categories: response});
            }
        
    })
    .catch(function(err) {
        res.status(400).json({message: err.message});
    });

});

router.get('/getRandomPopularPoints', (req, res) => {

});

router.post('/getPoint', (req, res) => {

});

router.get('/getAllPoints', (req, res) => {

});

router.post('/insertToFavorits', (req, res) => {

});

router.delete('/deleteFromFavorits', (req, res) => {

});

router.post('/getFavoritePoints', (req, res) => {

});

router.post('/counterOfFavoritePoints', (req, res) => {

});

router.put('/sortOfFavorits', (req, res) => {

});

router.post('/saveFavoritList', (req, res) => {

});

router.post('/reviewForPoint', (req, res) => {

});

router.put('/updateReviewPoint', (req, res) => {

});













/*
// test route to make sure everything is working (accessed at GET http://localhost:3000/auth/getAllUsers) good
router.post('/getAllUsers', (req, res) => {
    let username = req.param('username');

    DButilsAzure.execQuery(`SELECT * FROM dbo.Users WHERE username = '${username}'`)
    .then((response, err) => {
        if(err)
            res.status(400).json({message: err.message});
        else{
            
            res.status(200).json({
                data: response                
            });
            //console.log(response)
        }
    })
    .catch(function(err) {
        res.status(400).json({message: err.message});
    });
});*/

module.exports = router;