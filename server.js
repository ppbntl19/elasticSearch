var express = require('express');
var mongoose = require('mongoose');
 var app = express();

 app.listen(3000);

 User = require('./user');
app.get('/setup', function (req, res) {
    // create a sample user
    var nick = new User({ // In this line throwing error Object is not a function.
        name: 'Nick Cerminara',
        password: 'password',
        admin: true
    });
    // save the sample user
    nick.save(function (err) {
        if (err) throw err;
        console.log('User saved successfully');
        res.json({
            success: true
        });
    });
});
 console.log('server started 3000')