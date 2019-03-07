const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const jobSchema = new Schema({
    id: String,
    assignedUserDetails: [{
        id: String,
        firstName: String
    }],
    title: String,
    priority: Number,
    creationDate: Date,
    startDate: Date,
    status: String,
    assignedUser: String,
    elapsedTime: String,
    completionDate: Date,
    notes: [{
        id: String,
        step: Number,
        note: [{
            title: String,
            type: String,
            text: String,
            files:[{
                url: String,
            }]
        }]
    }]
});

module.exports = mongoose.model('Job', jobSchema);