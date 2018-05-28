//this is only an example, handling everything is yours responsibilty !
// call the packages we need
const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var DButilsAzure = require('./DButils');
const app = express();
app.use(cors());
const auth = require('./routes/auth');
const analy = require('./routes/analy');
const Aelse = require('./routes/else');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//START
app.use('/auth', auth);
//middleware
app.use('/analy',function(req, res, next){
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
        next();
    }  
});
app.use('/analy', analy);
app.use('/else', Aelse);
//API
/*
//move all:
//delete user
app.delete('/:id', function (req, res) {
    console.log("delete user")

    if (users[req.params.id])
    {
        delete (users[req.body.id])
        res.send("User deleted successfully")
    }   
    else
    res.send("No such user exists")

    
});

///API*/



var port = 3000;
// START THE SERVER
// =============================================================================
app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
//-------------------------------------------------------------------------------------------------------------------


