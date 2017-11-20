//Main file that runs the app server

//Requirements - express to route. Add the port to a variable and use body-parser to allow us to get info from POST and PUT Requests
var express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    bodyParser = require("body-parser");

//Routes for the TODO list are extracted to this other file and have to be included    
var todoRoutes = require('./routes/todos');

//These two lines are body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//include the public directory where we store our front facing JS and CSS
app.use(express.static(__dirname + '/public'));
//include the views directory where we store the views that our program renders
app.use(express.static(__dirname + '/views'));


//This is the default or root route and it is not associated with our API so for now it lives in this file
app.get('/',function(req,res){
    res.sendFile("index.html");
});    

//This line tells express to use the TODO routes that we defined earlier in the todoROutes variable
app.use('/api/todos', todoRoutes);

//This line tells the server on what port to listen for traffic
app.listen(port,function(){
    console.log("app is running on port " + process.env.PORT);
})