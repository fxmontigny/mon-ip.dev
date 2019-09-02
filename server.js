var express = require('express');
var serveStatic = require('serve-static');
var morgan = require('morgan');

const app = express();
app.use(serveStatic(__dirname + '/dist'));
app.use(morgan('combined'));

app.get('/ip', function(req, res) {
  res.json({ ipClient: req.connection.remoteAddress });
});

var port = process.env.PORT || 5000;
app.listen(port);

console.log('server started ', port);
