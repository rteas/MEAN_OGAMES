// File: ./models/user.js

//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: { type: String, required: true, unique: true, min: 3, max: 20 },
    password: { type: String, required: true, min: 1, max: 50},
    topScore: { type: Number, default: 0 },
    status: { type: String, default: "Offline" },
    location: { type: Schema.Types.ObjectId, ref: 'Room' },
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]
    
});

module.exports = mongoose.model('User', UserSchema);