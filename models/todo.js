//This file is used to define our todo data schema
//Requirements for this file are mongoose
var mongoose = require("mongoose");

//This is the schema itself
var todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Name cannot be blank!"
    },
    completed: {
        type: Boolean,
        default: false
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

//This compiles the schema into a model that we can export 
var Todo = mongoose.model('Todo',todoSchema);

//This line exports the schema that we just compiled
module.exports = Todo;

