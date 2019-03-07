const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const userSchema = new Schema({
    id: String,
    firstName: String,
    lastName: String,
    email: String,
    title: String,
    description: String,
    roles: [{
        id: String,
        name: String,
        description: String
    }]
});

module.exports = mongoose.model('User', userSchema);