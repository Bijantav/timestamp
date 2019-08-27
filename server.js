// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var DatumRegEx=/[-]/g;
// --> 11)  Mount the body-parser middleware  here
app.use(bodyParser.urlencoded({extended: false}))

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
app.get('/api/timestamp/*', function (req, res) {
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat","Sun"];
  console.log(req.params[0]);
  if (!req.params[0]){
    var milisek = Date.now()
    var dateutc = new Date(milisek);
    
    var utcres = days[dateutc.getDay()-1]+', '+dateutc.getDate().toString()+" "+months[dateutc.getMonth()]+" "+dateutc.getFullYear().toString()+" "+((dateutc.getHours()<10?'0':'') + dateutc.getHours() ).toString()+':'+((dateutc.getMinutes()<10?'0':'') + dateutc.getMinutes() ).toString()+':'+((dateutc.getSeconds()<10?'0':'') + dateutc.getSeconds() ).toString()+' GMT';
    res.json({"unix":milisek,"utc":utcres})
    console.log('Datum!!!!!!!!')
  }else{
  if (DatumRegEx.test(req.params[0])){
   var milisek = Date.parse(req.params[0]);
    var dateutc = new Date(milisek);
    if(!isNaN(dateutc.getTime())){
    var utcres = days[dateutc.getDay()-1]+', '+dateutc.getDate().toString()+" "+months[dateutc.getMonth()]+" "+dateutc.getFullYear().toString()+" "+((dateutc.getHours()<10?'0':'') + dateutc.getHours() ).toString()+':'+((dateutc.getMinutes()<10?'0':'') + dateutc.getMinutes() ).toString()+':'+((dateutc.getSeconds()<10?'0':'') + dateutc.getSeconds() ).toString()+' GMT';
    res.json({"unix":milisek,"utc":utcres})}
    else{
      res.json({"unix": null, "utc" : "Invalid Date" })
    console.log(dateutc)}
   
  }
  else{
    var milisek = parseInt(req.params[0])*1000;
    var dateutc = new Date(milisek);
    if(!isNaN(dateutc.getTime())){
    var utcres = days[dateutc.getDay()-1]+', '+dateutc.getDate().toString()+" "+months[dateutc.getMonth()]+" "+dateutc.getFullYear().toString()+" "+((dateutc.getHours()<10?'0':'') + dateutc.getHours() ).toString()+':'+((dateutc.getMinutes()<10?'0':'') + dateutc.getMinutes() ).toString()+':'+((dateutc.getSeconds()<10?'0':'') + dateutc.getSeconds() ).toString()+' GMT';
    res.json({"unix":milisek,"utc":utcres})}
    else{
      res.json({"unix": null, "utc" : "Invalid Date" })
     console.log(dateutc)}
  }}
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});