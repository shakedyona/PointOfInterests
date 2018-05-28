const express = require('express');
const router = express.Router();
var DButilsAzure = require('../DButils');
const jwt = require('jsonwebtoken');

// test route to make sure everything is working (accessed at GET http://localhost:3000/auth) good
router.get('/', (req, res) => {
    res.send("Hello world -  analy");
    next();
});

router.post('/getTopRecPointsToUser', (req, res) => {

});
// test route to make sure everything is working (accessed at POST http://localhost:3000/auth/getLastPointToUser)
router.post('/getLastPointToUser', (req, res) => {

    console.log("good!!");
    var userName;  

    jwt.verify(req.token,'secretkey',(err, authData)=>{
        if(err){
            res.sendStatus(403);
        }
        else{
            var strUser = authData;      
            result = strUser.user["Username"];
            userName = result;
           /*res.json({
                result                 
            });  */       
        }
    });

    DButilsAzure.execQuery(`SELECT * FROM dbo.Users_Last_Point WHERE username = '${userName}'`)
        .then((response, err) => {
            if(err)
                res.status(400).json({message: err.message});
            else{  
                console.log(response[0].SearchPointName);  
                res.status(200).json({
                    PointName: response[0].SearchPointName
                });

            }
        })
        .catch(function(err) {
            res.status(400).json({message: 'NULL'});
        });
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

/*promiss
var idUser = function(userName){
    return new Promise(
        function(resolve,reject){

            resolve(user.Password);
                
        }
            
        
    );
};*/

/*function verifyToken(req, res, next){
    const beareHeader = req.headers['authorization'];
    if(typeof beareHeader !== 'undefined'){
        const bearer = beareHeader.split(' ');
        //get token from array
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }
    else{
        res.sendStatus(403);
    }  
}*/
module.exports = router;