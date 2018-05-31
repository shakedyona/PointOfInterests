const express = require('express');
const router = express.Router();
var DButilsAzure = require('../DButils');

// test route to make sure everything is working (accessed at GET http://localhost:3000/else/getCategories) good
router.get('/getCategories', function (req, res){

    DButilsAzure.execQuery(`SELECT * FROM dbo.Categories`)
    .then((response, err) => {
        if(err)
            res.status(400).json({message: err.message});
        else{
            //let jsonObject = JSON.parse(response);
            res.status(200).json({categories: response});
            }
        
    })
    .catch(function(err) {
        res.status(400).json({message: err.message});
    });

});

// test route to make sure everything is working (accessed at GET http://localhost:3000/else/getRandomPopularPoints) good
router.post('/getRandomPopularPoints', (req, res) => {

    threshold = req.body.threshold;

    DButilsAzure.execQuery(`SELECT dbo.Points.PointName FROM dbo.Points WHERE Rate >= '${threshold}'`)
    .then((response, err) => {
        if(err)
            res.status(400).json({message: err.message});
        else{
            var numbers = [];
            var NumOfpoints=[];
            var ans = {};
            var size = response.length;
            if(size>3){
                for (var i = 0; i < 10; i++) {
                    numbers.push(Math.floor(Math.random() * Math.floor(size)));
                }
                let index =0;
                for(var x in numbers){
                    if(NumOfpoints.includes(numbers[x]) !== true && index<3){
                        NumOfpoints.push(numbers[x]);
                        index = index+1;
                    }
                    
                }

                for(var p in NumOfpoints)
                {
                    ans[p] = response[NumOfpoints[p]];
                }

                res.status(200).json({randomPopular: ans});

            }
            else{
                res.status(200).json({randomPopular: response});
            }
        }
        
    })
    .catch(function(err) {
        res.status(400).json({message: err.message});
    });


});

// test route to make sure everything is working (accessed at POST http://localhost:3000/else/getPoint) good
router.post('/getPoint', (req, res) => {

    PointName = req.body.PointName;
    var i;
    let ID;
    let pName;
    let Imag;
    let Vnum;
    let rate;
    let des;
    let rev1;
    let rev2;
    DButilsAzure.execQuery(`SELECT * FROM dbo.Points WHERE PointName = '${PointName}'`)
    .then((response, err) => {
        if(err)
            res.status(400).json({message: err.message});
        else{
            ID =  response[0].PointID;
            pName =  response[0].PointName;
            Imag = response[0].Image;
            Vnum =  response[0].ViewNum ;
            rate= response[0].Rate ;
            des = response[0].Description ;
            }
        
    })
    .catch(function(err) {
        res.status(400).json({message: err.message});
    });
    DButilsAzure.execQuery(`SELECT TOP 2 * FROM dbo.Reviews WHERE PointName = '${PointName}' ORDER BY DateReview DESC`)
    .then((response, err) => {
        if(err)
            res.status(400).json({message: err.message});
        else{
            if(response.length>1){
                onerev= response[0].Review;
                oneDateReview= response[0].DateReview ;
                secondrev = response[1].Review;
                secondDateReview = response[1].DateReview ;
                res.status(200).json({PointName: pName, Image: Imag, NumberOfViews: Vnum, Rate: rate, Desrciption: des, Review1: onerev, DateOfReview1: oneDateReview, Review2: secondrev, DateOfReview2: secondDateReview});
            }
            else if(response.length===1)
            {
                onerev= response[0].Review;
                oneDateReview= response[0].DateReview ;
                res.status(200).json({PointName: pName, Image: Imag, NumberOfViews: Vnum, Rate: rate, Desrciption: des, Review1: onerev, DateOfReview1: oneDateReview});
            }

            else if(response.length===0)
            {                
                res.status(200).json({PointName: pName, Image: Imag, NumberOfViews: Vnum, Rate: rate, Desrciption: des});
            }
            
        }
        
    })
    .catch(function(err) {
        res.status(400).json({message: err.message});
    });
});


// test route to make sure everything is working (accessed at POST http://localhost:3000/else/getAllPoints) good
router.get('/getAllPoints', (req, res) => {

    var i;

    DButilsAzure.execQuery(`SELECT * FROM dbo.Points`)
    .then((response, err) => {
        if(err)
            res.status(400).json({message: err.message});
        else{
            var answer = [];
            for (i in response){
                answer[i] = response[i].PointName + ", Category Name: "+response[i].CategoryName +", Rate: "+response[i].Rate ;  
            }
            res.status(200).json({Points: answer});
            }
        
    })
    .catch(function(err) {
        res.status(400).json({message: err.message});
    });
});




module.exports = router;