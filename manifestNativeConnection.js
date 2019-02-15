var http = require("https");
const credentials = require('./credentials');

module.exports.queryUsers = (request, response, next) => {

    var options = {
        "method": "POST",
        "hostname": 'boozallen.taqmanifest.com',
        "path": "/graphql/v2",
        "headers": {
          "Content-Type": "application/json",
          "Authorization": credentials.manifestAuthKey,
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

}

module.exports.queryListofLocations = (request, response, next) => {

}