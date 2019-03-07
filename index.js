const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');

const cred = require('./credentials');


//Mongoose Models
const mongoose = require('mongoose');
const Users = require('./models/User.model');
const Locations = require ('./models/Location.model');
const Jobs = require('./models/Job.model');

//cookies
const cookieParser = require('cookie-parser');
const session = require ('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

let options = {
    useCreateIndex: true,
    useNewUrlParser: true,
    promiseLibrary: global.Promise,
    autoReconnect: true
}
let db = 'mongodb://' + cred.dbUser + ':' + cred.dbPassword + '@ds011785.mlab.com:11785/heroku_9lcp033p';


mongoose.connect(db, options);

// Users.create({
//     id: "100",
//     firstName: "Test",
//     lastName: "User",
//     email: "test@user.com" 
// })


app.engine('handlebars', 
    handlebars({
        defaultLayout: 'main' //this should be the main page
    })
);

app.set('view engine', 'handlebars');

//static resource
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(session({
    name: 'CS602-Project-cookie-id',
    secret:'App Secret',
    saveUninitialized: true,
    resave: true,
    cookie: {
        secure: false,
        httpOnly: false,
        // max cookie age
        maxAge: 1000 *  // milliseconds to equal 1 second
        60 *            // seconds to equal 1 minute
        60 *            // minutes to equal 1 hour
        24 *            // hours to equal 1 day
        7               // days to equal 1 week
    }
}));

//Routing
var routes = require('./routes/index');
app.use('/', routes);

// app.use((req, res) => {
//     res.status(404);
//     res.render('404');
// });

app.listen(PORT, () => {
    console.log('App listening on PORT: ' + PORT);
});