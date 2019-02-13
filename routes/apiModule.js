const manifestUrl = 'https://boozallen.taqmanifest.com/graphql/v2'
var request = require("request");
const manifestConnect = require('../manifestConnection');

var options = selectQueryOptions(queryJobsWithEvidence());

request(options, function (error, response, body) {
    if (error) throw new Error(error);
    // console.log();
    
    console.log(body.data);
    // body.forEach(job => {
    //     console.log(job.id);
    // });
    // return body;
});

function selectQueryOptions(selectedQuery){
    let queryOptions = {
        method: 'POST', 
        url: manifestUrl,
        headers: { 
            'Postman-Token': 'ff6f0a2f-253d-4cc2-958d-ad2d97fbc947',
            'cache-control': 'no-cache',
            Authorization: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsInN1YmRvbWFpbiI6ImJvb3phbGxlbiIsImlhdCI6MTU0OTk4NTU5NCwiZXhwIjoxNTUwMDcxOTk0fQ.J2UKsBkHx-azPDD5yXiB7eroojPcpzok8zmP13ZJlT8',
            'Content-Type': 'application/json' 
        },
        body: {
            query: selectedQuery
        },
        json: true
    }

    return queryOptions;
}

function queryListOfUsers() {
    return 'query{users{id, firstName, lastName, email, title, description, roles{id, name, description}}}';
}

function queryListofLocations() {
    return 'query{locations{locationId, name, owner, longitude, latitude, description, locationId, associatedFiles {id, name, fileType}, childLocations{locationId, name, owner, longitude, latitude, description, locationId,childLocations{locationId, name, owner, longitude}}}}';
}

function queryJobsWithEvidence() {
    return 'query($assetId:String,$assetClassId:String,$locationId:String,$completed:Boolean, $itemsPerPage: Int, $pageNumber: Int){jobs(assetId:$assetId,assetClassId:$assetClassId,locationId:$locationId,completed:$completed, itemsPerPage:$itemsPerPage, pageNumber:$pageNumber) {id, assignedUserDetails {id,firstName}, title, priority, creationDate, startDate, status, assignedUser, elapsedTime, completionDate, notes{id,step,note{title,type,text,files{url}}}}}';
}

module.exports.manifestRequest = () => {

}
