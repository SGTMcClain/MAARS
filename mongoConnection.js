var http = require("https");
const mongoose = require ("mongoose");
const bodyParser = require("body-parser");
const url = require("url");
const cred = require('./credentials');

const convert = require('pojo2xml');
const format = require('xformatting');

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

module.exports.locationXmlExport = (req, res, next) => {
    Locations.find({}, (err, locations) => {
        if(err) {console.log('Error : %s ', err)}
        console.log('Start XML Conversion...');
        locations = JSON.stringify(locations);
        locations = JSON.parse(locations);
        
        locations = convert(locations);

        res.write(locations.toString());
        console.log(locations);

        
    });
}

module.exports.locationJsonExport = (req, res, next) => {
    Locations.find({}, (err, locations) => {
        if(err) {console.log("Error : %s ", err);}
        
        res.status(200).send(locations);
        console.log(locations);
    });   
}
module.exports.jobXmlExport = (req, res, next) => {
    Jobs.find({}, (err, jobs) => {
        if(err) {console.log('Error : %s ', err)}
        console.log('Start XML Conversion...');
        jobs = JSON.stringify(jobs);
        jobs = JSON.parse(jobs);
        
        jobs = convert(jobs);

        res.write(jobs.toString());
        console.log(jobs);

        
    });
}

module.exports.jobJsonExport = (req, res, next) => {
    Jobs.find({}, (err, jobs) => {
        if(err) {console.log("Error : %s ", err);}
        
        res.status(200).send(jobs);
        console.log(jobs);
    });    

}

module.exports.userXmlExport = (req, res, next) => {
    Users.find({}, (err, users) => {
        if(err) {console.log('Error : %s ', err)}
        console.log('Start XML Conversion...');
        users = JSON.stringify(users);
        users = JSON.parse(users);
        
        users = convert(users);

        res.write(users.toString());
        console.log(users);

        
    });
}

module.exports.userJsonExport = (req, res, next) => {
    Users.find({}, (err, users) => {
        if(err) {console.log("Error : %s ", err);}
        
        res.status(200).send(users);
        console.log(users);
    });
        
}

