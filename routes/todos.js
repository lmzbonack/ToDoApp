//This file is our router for the API that we built. It requires express. express.
//and helpers which is the file that we created that contains all the routes
var express = require("express");
var router = express.Router();
var helpers = require("../helpers/todos");

//Routes that do not need one specific id to act on. your get and create routes
router.route('/')
    .get(helpers.getTodos)
    .post(helpers.createTodos)

//ROutes that do need one specific id to act on. Your get, update, and delete routes
router.route('/:todoId')
    .get(helpers.getTodo)
    .put(helpers.updateTodo)
    .delete(helpers.deleteTodo)

//This is exported to a router
module.exports = router;