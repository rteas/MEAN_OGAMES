// File: ./models/user.js

//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    topScore: { type: Number, default: 0 },
    status: { type: String, default: "Offline" },
    location: { type: Schema.Types.ObjectId, ref: 'Room' },
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]
    
});

module.exports = mongoose.model('User', UserSchema);