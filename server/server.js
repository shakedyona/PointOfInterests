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
app.use('/analy/rateForPoint',function(req, res, next){
    const PointN = req.body.PointName;
    const Rate = req.body.Rate;
    req.PointN=PointN;
    req.Rate=Rate;
    DButilsAzure.execQuery(`SELECT * FROM dbo.Points WHERE PointName = '${PointN}'`)
    .then((response, err) => {
        if(err)
            res.status(400).json({boolean: 'false'});
        else{
            NumberOfRates = response[0].NumOfRate;
            SumOfRates = response[0].SumOfRate;

            parsRate = parseInt(Rate);
            parsNum = parseInt(NumberOfRates);
            parsSum = parseInt(SumOfRates);
            
            const newSumRate = parsSum + parsRate;
            const newNumberOfRate = parsNum +1;
            const newRate = newSumRate / (newNumberOfRate);
            //Normalized
            newRateNormalizedtemp = (newRate-1)/4;
            const newRateNormalized = newRateNormalizedtemp*100;
            req.newRateNormalized = newRateNormalized;
            req.newNumberOfRate =newNumberOfRate;
            req.newSumRate=newSumRate;
            next();
        }
    })
    .catch(function(err) {
        res.status(400).json({message: 'false'});
        next();
    });
});
app.use('/analy', analy);
app.use('/else', Aelse);

var port = 3000;
// START THE SERVER
// =============================================================================
app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
//-------------------------------------------------------------------------------------------------------------------


