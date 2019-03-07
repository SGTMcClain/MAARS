var http = require("https");
const mongoose = require ("mongoose");
const bodyParser = require("body-parser");
const url = require("url");
const cred = require('./credentials');

// mongoose models
const Locations = require ('./models/Location.model');
const Jobs = require('./models/Job.model');
const Users = require('./models/User.model');

let options = {
    useCreateIndex: true,
    useNewUrlParser: true,
    promiseLibrary: global.Promise,
    autoReconnect: true
}

let db = 'mongodb://' + cred.dbUser + ':' + cred.dbPassword + '@ds011785.mlab.com:11785/heroku_9lcp033p';
mongoose.connect(db, options);

module.exports.mongoUsers = (req, res, next) => {
    Users.find({}, (err, users) => {
        if(err) {console.log("Error : %s ", err);}

        res.render('mongoUsersView', {
            title: 'Mongo Users',
            data: users
        });
    });
};

module.exports.mongoLocations= (req, res, next) => {
    Locations.find({}, (err, locations) => {
        if(err) {console.log("Error : %s ", err);}



        res.render('mongoLocationsView', {
            title: 'Mongo Locations',
            data: locations
        });
    });
}


module.exports.mongoJobs = (req, res, next) => {
    
    Jobs.find({}, (err, jobs) => {
        if(err) {console.log("Error : %s ", err);}
        
        res.render('mongoJobsView', {
            title: 'Mongo Jobs',
            data: jobs
        });
        console.log(jobs);
    });
}

module.exports.deleteUser = (req, res, next) => {
    console.log(req.params._id);
    Users.findByIdAndDelete(req.params._id, (err, user) => {
        if (err) return res.status(500).send(err);
        const response = {
            message: 'User successfully deleted',
            id: user
        };
            console.log('Delete successful User: ' +  req.params._id + 'removed');
            console.log(response)
        // return res.status(200).send(response);
    });

    Users.find({}, (err, users) => {
        if(err) {console.log("Error : %s ", err);}

        res.render('mongoUsersView', {
            title: 'Mongo Users',
            data: users
        });
    });
    
    
}



