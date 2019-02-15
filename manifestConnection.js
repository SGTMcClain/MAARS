const manifestUrl = 'https://boozallen.taqmanifest.com/graphql/v2';
var request = require("request");
const credentials = require('./credentials');

var queryUsers = 'query{users{id, firstName, lastName, email, title, description, roles{id, name, description}}}';
var manifestData;


function selectQueryOptions(selectedQuery, methodType){
    let queryOptions = {
        method: methodType, //method variable should be POST or GET
        url: manifestUrl,
        headers: { 
            'Postman-Token': 'ff6f0a2f-253d-4cc2-958d-ad2d97fbc947',
            'cache-control': 'no-cache',
            Authorization: credentials.manifestAuthKey,
            'Content-Type': 'application/json' 
        },
        body: {
            query: selectedQuery
        },
        json: true
    }

    return queryOptions;
}

function manifestQuery(query, methodType) {

    let options = selectQueryOptions(query, methodType);
    
     request(options, (error, response, body) => {
        if (error) {throw new Error(error);}

         queryCallback(body.data);
        
    });

    return manifestData;
}

function queryCallback(data){
    manifestData = data;
    // console.log('manifest data is: ')
    // console.log(manifestData);
}
 


function queryListofLocations() {
    return 'query{locations{locationId, name, owner, longitude, latitude, description, locationId, associatedFiles {id, name, fileType}, childLocations{locationId, name, owner, longitude, latitude, description, locationId,childLocations{locationId, name, owner, longitude}}}}';
}



module.exports.queryUsers = async(request, response, next) => {
    // let query = request.params.query;
    let query = 'query{users{id, firstName, lastName, email, title, description, roles{id, name, description}}}'
    
    let data = await manifestQuery(query, 'POST');
    console.log('result from manifest Query is:');
    console.log(data.users);

    response.render('displayUsersView', data.users);
    // console.log(data);

}

module.exports.queryJobsWithEvidence = (req, res, next) => {
    // let query = request.params.query;
    let query = 'query($assetId:String,$assetClassId:String,$locationId:String,$completed:Boolean, $itemsPerPage: Int, $pageNumber: Int){jobs(assetId:$assetId,assetClassId:$assetClassId,locationId:$locationId,completed:$completed, itemsPerPage:$itemsPerPage, pageNumber:$pageNumber) {id, assignedUserDetails {id,firstName}, title, priority, creationDate, startDate, status, assignedUser, elapsedTime, completionDate, notes{id,step,note{title,type,text,files{url}}}}}';
    let data = manifestQuery(query, 'POST');
}

module.exports.queryListofLocations = (req, res, next) => {
    // let query = request.params.query;
    let query = 'query{locations{locationId, name, owner, longitude, latitude, description, locationId, associatedFiles {id, name, fileType}, childLocations{locationId, name, owner, longitude, latitude, description, locationId,childLocations{locationId, name, owner, longitude}}}}';
    let data = manifestQuery(query, 'POST');
}
