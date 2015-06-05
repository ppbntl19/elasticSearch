var express = require('express');
var User = require('./user');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
app.use(bodyParser());

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));



var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

app.get('/', function (req, res) {
    res.render('index',{})
});

app.post('/saveUser', function (req, res) {
    // create a sample user
    var user = new User({ // In this line throwing error Object is not a function.
        name: req.body.name,
        password: '123',
        admin: true,
        about:req.body.about,
        UID:req.body.UID
    });
    // save the sample user
    user.save(function (err) {
        if (err) throw err;
        console.log('User saved successfully');
        res.json({
            success: true
        });
    });
});
 
 app.post('/searchFor', function (req, res) {
     client.search({
      index: 'users',
      type: 'user',
      body: {
        query: {
          fuzzy: {
             _all: req.body.keyword
           
          }
        }
      }
}).then(function(response) {
  var hits = response.hits.hits;
  res.send(hits);
}, function(error) {
  console.trace(error.message);
  res.send(404);
});
 });

 app.listen(3000);
 console.log('server started 3000')