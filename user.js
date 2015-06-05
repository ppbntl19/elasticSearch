
var mongoose = require('mongoose'),
  mongoosastic = require('mongoosastic');
var Schema = mongoose.Schema;

var db = mongoose.connect('mongodb://localhost/tuto');

var UserSchema = new Schema({
	 name: {type:String, es_indexed:true},
    password: String,
    admin: Boolean,
    about:String,
    UID:String
});

UserSchema.plugin(mongoosastic)
module.exports = mongoose.model('User', UserSchema);