const express = require('express');
const router = express.Router();
var DButilsAzure = require('../DButils');
const jwt = require('jsonwebtoken');

const users = {}

// test route to make sure everything is working (accessed at GET http://localhost:3000/auth) good
router.get('/', (req, res) => {
    res.send("Hello world - auth");
});

// test route to make sure everything is working (accessed at GET http://localhost:3000/auth/register) good
router.post('/register', function (req, res) {
    console.log("adding a new user")
    let id = Object.keys(users).length + 1;
    const user = {}

    user.Username = req.body.username;
    user.Password = req.body.password;
    user.FirstName = req.body.firstName;
    user.LastName = req.body.lastName;
    user.City = req.body.city;
    user.Country = req.body.country;
    user.Email = req.body.email;

    users[id]=user;   
    var strUser = JSON.stringify(user);
    console.log("the user: "+strUser);

    DButilsAzure.execQuery(`INSERT INTO dbo.Users VALUES ('${user.Username}', '${user.Password}','${user.FirstName}','${user.LastName}','${user.City}','${user.Country}','${user.Email}')`)
    .then((response, err) => {
        if(err)
            res.status(400).json({
                message: err.message
            });
        else{
            res.status(200).json({
                addUserMessege: user
            });            
        }
    })
    .catch(function(err) {
        res.status(400).json({message: err.message});
    });
    console.log("user successfully added!")
});


// test route to make sure everything is working (accessed at GET http://localhost:3000/auth/login) good
router.post('/login', (req, res) => {
    let username = req.param('username');
    let password = req.param('password');

    DButilsAzure.execQuery(`SELECT * FROM dbo.Users WHERE username = '${username}'`)
    .then((response, err) => {
        if(err)
            res.status(400).json({message: err.message});
        else{           
            let passFromTable = response[0].Password;
            if(password == passFromTable){
                jwt.sign({response},'secretkey',(err,token)=>{
                    res.json({
                        token
                    });
                });
            }
        }
    })
    .catch(function(err) {
        res.status(400).json({message: err.message});
    });
});


router.post('/post',verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey',(err, authData)=>{
        if(err){
            res.sendStatus(403);
        }
        else{
            res.json({
                //message: 'the user are login.... do post... - auth',
                authData 
            });
        }
    });
   
});

function verifyToken(req, res, next){
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
}


router.post('/passwordRestore', (req, res) => {



});

function checkIdInUsers(userName){
    for(var i ; i < Object.keys(users).length ; i++) {
        if(user.Username == userName)
        {
            return i;
        }
    }
    return -1;
}


module.exports = router;