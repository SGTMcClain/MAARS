const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');

const app = express();

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

//Routing
var routes = require('./routes/index');
app.use('/', routes);

app.use((req, res) => {
    res.status(404);
    res.render('404');
});

app.listen(3000, () => {
    console.log('http://localhost:3000');
});