var express = require('express');
var User = require('./user');
var app = express();

 app.listen(3000);

app.get('/setup', function (req, res) {
    // create a sample user
    var nick = new User({ // In this line throwing error Object is not a function.
        name: 'Nick Cerminara',
        password: 'password',
        admin: true,
        about:"Hi I am developer,",
        UID:"555111"
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