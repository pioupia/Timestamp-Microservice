// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.get("/api/", function (req, res) {
  const d = new Date();
  return res.json({
    'unix': d.getTime(),
    'utc': d.toUTCString()
  });
})
// http://expressjs.com/en/starter/basic-routing.html
app.get("/api/:date", function (req, res) {
  res.status(200);
  let d = new Date(req.params ? isNaN(req.params.date) ? req.params.date : parseInt(req.params.date) : undefined);

  if(!d || d == 'Invalid Date') return res.json({error: 'Invalid Date'});
  return res.json({
    'unix': d.getTime(),
    'utc': d.toUTCString()
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
