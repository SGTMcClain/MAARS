var http = require("https");
const mongoose = require ("mongoose");
const bodyParser = require("body-parser");
const url = require("url");
var authToken;
const Locations = require ('./models/Location.model');
const cred = require('./credentials');

const session = require('express-session');

//JWT & Passport
const JWTstrategy = require('passport-jwt-cookiecombo');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const express = require('express');




//handle login
module.exports.login = (request, response, next) => {
  
  console.log("Login Page");
  response.render('login');
    console.log(request.cookies);
    console.log('***********');
    console.log(request.session);
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

      var responseBody = JSON.parse(body);

      console.log('response body: ')
      console.log(responseBody);

      try{
        response.cookie('manifestJWT', responseBody.user.token,{
          maxAge: 1000 * 60 * 60 * 24
        });
      } catch (err){
        console.log("Error: " + err);
      }


      if(request.cookies['manifestJWT'] ){
        request.app.locals.isLoggedIn = true;
        next(response.render('loginSuccessful'));
      } else {
        next(response.write('Login Failed'));
      }
      
      
      console.log(request.app.locals.isLoggedIn);
      // console.log(request.session.jwt);
    });
  });
  var parseRequest = url.parse(request.url, true).query;
  console.log(parseRequest);
  // console.log("Request Email: " + parseRequest.email + "\nRequest Password: " + parseRequest.pass);
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
          "Authorization": request.cookies['manifestJWT'],
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
          "Authorization": request.cookies['manifestJWT'],
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
          "Authorization": request.cookies['manifestJWT'],
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
          var buffer = Buffer.concat(chunks);
          body = JSON.parse(buffer.toString());
          console.log(body.data.locations[0]);
          
          // add data to database
          // for(var i = 0; i < body.data.locations.length; i++){
          //   console.log(body.data.locations[i]);
          //   Locations.create(body.data.locations[i])
          // }
          response.render('displayLocations', body.data);

        });
      });
      
      
      req.write(JSON.stringify({ query: 'query{locations{locationId, name, owner, longitude, latitude, description, locationId, associatedFiles {id, name, fileType}, childLocations{locationId, name, owner, longitude, latitude, description, locationId,childLocations{locationId, name, owner, longitude}}}}' }));
      req.end();
}

module.exports.logout = (request, response, next) => {
  
    response.clearCookie('manifestJWT');
    request.app.locals.isLoggedIn = false;
    next(response.render('login'));
}

