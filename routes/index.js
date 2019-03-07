const express = require('express');
const router = express.Router();

// other modules
// const manifest = require("../manifestConnection"); //talk to manifest
const manifest = require("../manifestNativeConnection"); 
const loginPage = manifest.login;
const submitLogin = manifest.submitLogin;
const queryJobsWithEvidence = manifest.queryJobsWithEvidence;
// const queryAllJobs
const queryUsers = manifest.queryUsers;
const queryLocations = manifest.queryListofLocations;

//mongo
const mongoConn = require("../mongoConnection");
const mongoUsers = mongoConn.mongoUsers;
const mongoLocations = mongoConn.mongoLocations;
const mongoJobs = mongoConn.mongoJobs;
const mongoDeleteUser = mongoConn.deleteUser;

//router specs
// router.get('/', (req, res, next) => {
//     // res.redirect('/displayUsers');
// });

router.get('/', loginPage);
router.get('/submitLogin', submitLogin);
router.get('/displayUsers', queryUsers);
router.get('/locations', queryLocations);
router.get('/jobs', queryJobsWithEvidence);
router.get('/mongoUsers', mongoUsers);
router.get('/mongoLocations', mongoLocations);
router.get('/mongoJobs', mongoJobs); 
router.get('/deleteUser/:_id', mongoDeleteUser);

module.exports = router;