//This is the index route for the data model. It requires mongoose and contains config info about our database
var mongoose = require("mongoose");
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/todo-api');

mongoose.Promise = Promise;

module.exports.Todo = require("./todo");