//this is only an example, handling everything is yours responsibilty !
// call the packages we need
const express = require('express');
var bodyParser = require('body-parser');
const app = express();
var cors = require('cors');
app.use(cors());
var DButilsAzure = require('./DButils');
const auth = require('./routes/auth');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//START
app.use('/auth', auth);



var port = 3000;
// START THE SERVER
// =============================================================================
app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
//-------------------------------------------------------------------------------------------------------------------


