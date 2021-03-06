const express = require('express');
const router = express.Router();
var DButilsAzure = require('../DButils');
const jwt = require('jsonwebtoken');


// test route to make sure everything is working (accessed at POST http://localhost:3000/auth/register) good
router.post('/register', function (req, res) {
    console.log("adding a new user")
    const user = {}

    user.Username = req.body.username;
    user.Password = req.body.password;
    user.FirstName = req.body.firstName;
    user.LastName = req.body.lastName;
    user.City = req.body.city;
    user.Country = req.body.country;
    user.Email = req.body.email;
    user.Ansewer1 = req.body.ansewer1;
    user.Ansewer2 = req.body.ansewer2;
    user.Category1 = req.body.category1;
    user.Category2 = req.body.category2;
    user.Category3 = req.body.category3;
    user.Category4 = req.body.category4;

    //users[id]=user;   
    var strUser = JSON.stringify(user);

    DButilsAzure.execQuery(`INSERT INTO dbo.Users VALUES ('${user.Username}', '${user.Password}','${user.FirstName}','${user.LastName}','${user.City}','${user.Country}','${user.Email}')`)
    .then((response, err) => {
        if(err){
            res.status(400).json({
                message: 'Something went wrong - users Table'
            });

        }     
    })
    .catch(function(err) {
        res.status(400).json({message: 'Something went wrong - users Table'});
    });

    DButilsAzure.execQuery(`INSERT INTO dbo.Users_Questions VALUES ('${user.Username}', '${user.Ansewer1}','${user.Ansewer2}')`)
    .then((response, err) => {
        if(err){
            res.status(400).json({
                message: 'Something went wrong - Users_Questions Table'
            });

        }     
    })
    .catch(function(err) {
        res.status(400).json({message: 'Something went wrong - users Table'});
    });
    
    if(user.Category1 !== undefined){
    DButilsAzure.execQuery(`INSERT INTO dbo.Users_Categories VALUES ('${user.Username}', '${user.Category1}')`)
    .then((response, err) => {
        if(err){
            res.status(400).json({
                message: 'Something went wrong - Users_Categories Table'
            });
        }
    })
    .catch(function(err) {
        res.status(400).json({message: 'Something went wrong - Users_Categories Table'});
    });
    }

    if(user.Category2 !== undefined){
    DButilsAzure.execQuery(`INSERT INTO dbo.Users_Categories VALUES ('${user.Username}', '${user.Category2}')`)
    .then((response, err) => {
        if(err){
            res.status(400).json({
                message: 'Something went wrong - Users_Categories Table'
            });
        }

        else{
            res.status(200).json({
                message: 'true'
            });            
        }
    })
    .catch(function(err) {
        res.status(400).json({message: 'Something went wrong - Users_Categories Table'});
    });
    }

    if(user.Category3 !== undefined){
        DButilsAzure.execQuery(`INSERT INTO dbo.Users_Categories VALUES ('${user.Username}', '${user.Category3}')`)
        .then((response, err) => {
            if(err){
                res.status(400).json({
                    message: 'Something went wrong - Users_Categories Table'
                });
            }

            else{
                res.status(200).json({
                    message: 'true'
                });            
            }
        })
        .catch(function(err) {
            res.status(400).json({message: 'Something went wrong - Users_Categories Table'});
        });
    }

    if(user.Category4 !== undefined){
        DButilsAzure.execQuery(`INSERT INTO dbo.Users_Categories VALUES ('${user.Username}', '${user.Category4}')`)
        .then((response, err) => {
            if(err){
                res.status(400).json({
                    message: 'Something went wrong - Users_Categories Table'
                });
            }
                
            else{
                res.status(200).json({
                    message: 'true'
                });            
            }
        })
        .catch(function(err) {
            res.status(400).json({message: 'Something went wrong - Users_Categories Table'});
        });
    }

    console.log("user successfully added!")
});


// test route to make sure everything is working (accessed at POST http://localhost:3000/auth/login) good
router.post('/login', (req, res) => {
    let username = req.param('username');
    let password = req.param('password');

    DButilsAzure.execQuery(`SELECT * FROM dbo.Users WHERE username = '${username}'`)
    .then(function (response) {
        let passFromTable = response[0].Password;
        user = response[0];            
        if(password == passFromTable){
            jwt.sign({user},'secretkey',(err,token)=>{
               
                res.status(200).json({
                    token
                });  
            });
        }
        else{
            res.status(400).json({
                message: "ERROR: Incorrect Password"
            });
        }         

    }, function (response) {
        console.log("Something went wrong");
        alert("The username or password is incorrect !! ");
    });

});



// test route to make sure everything is working (accessed at POST http://localhost:3000/auth/passwordRestore) good
router.post('/passwordRestore', (req, res) => {
    let username = req.param('username');
    let ansewer1 = req.param('ansewer1');
    let ansewer2 = req.param('ansewer2');

    DButilsAzure.execQuery(`SELECT Password FROM dbo.Users WHERE username = '${username}'`)
    .then((response, err) => {
        if(err)
            res.status(400).json({message: err.message});
        else{           
            res.status(200).json({
                ThePass: response[0].Password
            }); 

        }
    })
    .catch(function(err) {
        res.status(400).json({message: err.message});
    });

});

module.exports = router;