// File: ./models/user.js

//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var RoomSchema = new Schema({
    name: { type: String, min: 1, max: 20 },
    password: { type: String, min: 1, max: 20},
    population: { type: Number, min: 0, max: 4 },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    public: { type: Boolean, default: true }
});

module.exports = mongoose.model('Room', RoomSchema);
