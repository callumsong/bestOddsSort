var express = require('express'),
    fs = require('fs'),
    app = express(),
    bets = JSON.parse(fs.readFileSync('./bets.json'));

app.use(express.static(__dirname));

app.get('/bets', function(req, res) {
  res.send(bets);
});

app.listen(3000, function() {
  console.log('Listening on port 3000');
});