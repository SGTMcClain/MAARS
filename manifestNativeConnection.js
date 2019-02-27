
var http = require("https");
const staticCredentials = require('./credentials');
const bodyParser = require("body-parser");
const url = require("url");
var authToken;


//handle login
module.exports.login = (request, response, next) => {
  console.log("Login Page");
  response.render('login');
}

module.exports.submitLogin = (request, response, next) => {
  console.log("DID SOMETHING")
  var options = {
    "method": "POST",
    "hostname": "boozallen.taqmanifest.com",
    "port": 443,
    "path": "/rest/signin/v2",
    "headers": {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache"

    }
  };

  var req = http.request(options, function (res) {
    var chunks = [];
  
    res.on("data", function (chunk) {
      chunks.push(chunk);
    });
  
    res.on("end", function () {
      var body = Buffer.concat(chunks);
      // console.log(JSON.parse(body));
      var responseBody = JSON.parse(body)
      // console.log(responseBody.user.token);
      authToken = responseBody.user.token;
      response.render('loginSuccessful');
    });
  });
  var parseRequest = url.parse(request.url, true).query;
  console.log(parseRequest);
  console.log("Request Email " + parseRequest.email + "\nRequest Password: " + parseRequest.pass);
  req.write(JSON.stringify({ email: parseRequest.email, password: parseRequest.pass }));
  req.end();
}

module.exports.queryUsers = (request, response, next) => {

    var options = {
        "method": "POST",
        "hostname": 'boozallen.taqmanifest.com',
        "path": "/graphql/v2",
        "headers": {
          "Content-Type": "application/json",
          "Authorization": authToken,
          "cache-control": "no-cache",
          "Postman-Token": "6beff5c5-c5c2-47f4-9182-2be6f70d2ff8"
        }
      };
      
      var req = http.request(options, function (res) {
        var chunks = [];
      
        res.on("data", function (chunk) {
          chunks.push(chunk);
        });
      
        res.on("end", function () {
          var body = Buffer.concat(chunks);
          body = JSON.parse(body.toString());
          console.log(body.data);
          response.render('displayUsersView', body.data);

        });
      });
      
      
      req.write(JSON.stringify({ query: 'query{users{id, firstName, lastName, email, title, description, roles{id, name, description}}}' }));
      req.end();

    
}

module.exports.queryJobsWithEvidence = (request, response, next) => {
    var options = {
        "method": "POST",
        "hostname": 'boozallen.taqmanifest.com',
        "path": "/graphql/v2",
        "headers": {
          "Content-Type": "application/json",
          "Authorization": authToken,
          "cache-control": "no-cache",
          "Postman-Token": "6beff5c5-c5c2-47f4-9182-2be6f70d2ff8"
        }
      };
      
      var req = http.request(options, function (res) {
        var chunks = [];
      
        res.on("data", function (chunk) {
          chunks.push(chunk);
        });
      
        res.on("end", function () {
          var body = Buffer.concat(chunks);
          body = JSON.parse(body.toString());
          console.log(body.data);
          
          response.render('displayJobs', body.data);

        });
      });
      
      
      req.write(JSON.stringify({ query: 'query($assetId:String,$assetClassId:String,$locationId:String,$completed:Boolean, $itemsPerPage: Int, $pageNumber: Int){jobs(assetId:$assetId,assetClassId:$assetClassId,locationId:$locationId,completed:$completed, itemsPerPage:$itemsPerPage, pageNumber:$pageNumber) {id, assignedUserDetails {id,firstName}, title, priority, creationDate, startDate, status, assignedUser, elapsedTime, completionDate, notes{id,step,note{title,type,text,files{url}}}}}' }));
      req.end();
}

module.exports.queryListofLocations = (request, response, next) => {
    var options = {
        "method": "POST",
        "hostname": 'boozallen.taqmanifest.com',
        "path": "/graphql/v2",
        "headers": {
          "Content-Type": "application/json",
          "Authorization": authToken,
          "cache-control": "no-cache",
          "Postman-Token": "6beff5c5-c5c2-47f4-9182-2be6f70d2ff8"
        }
      };
      
      var req = http.request(options, function (res) {
        var chunks = [];
      
        res.on("data", function (chunk) {
          chunks.push(chunk);
        });
      
        res.on("end", function () {
          var body = Buffer.concat(chunks);
          body = JSON.parse(body.toString());
          console.log(body.data);
          response.render('displayLocations', body.data);

        });
      });
      
      
      req.write(JSON.stringify({ query: 'query{locations{locationId, name, owner, longitude, latitude, description, locationId, associatedFiles {id, name, fileType}, childLocations{locationId, name, owner, longitude, latitude, description, locationId,childLocations{locationId, name, owner, longitude}}}}' }));
      req.end();
}

