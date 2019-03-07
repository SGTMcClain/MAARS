const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const locationSchema = new Schema({
    locationId: {
        unique: true,
        type: String,
    },
    name: String,
    owner: String,
    longitude: Number,
    latitude: Number,
    description: String,
    associatedFiles: Array,
    childLocations: Array
});

module.exports = mongoose.model('Location', locationSchema);