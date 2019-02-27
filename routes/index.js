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

//router specs
// router.get('/', (req, res, next) => {
//     // res.redirect('/displayUsers');
// });

router.get('/', loginPage);
router.get('/submitLogin', submitLogin);
router.get('/displayUsers', queryUsers);
router.get('/locations', queryLocations);
router.get('/jobs', queryJobsWithEvidence);

module.exports = router;