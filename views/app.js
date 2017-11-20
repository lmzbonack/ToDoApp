/* global $ */

//Wait until the dom has loaded
$(document).ready(function(){
    $.getJSON("/api/todos")
    .then(addTodos);
    
    //Add listener to the input field
    $('#todoInput').keypress(function(event){
        if(event.which == 13) {
            createTodo();
        }
    });
       
    //Add listener to the ul with class list but specify so that the function only runs when spans within the ul are clicked
    $('.list').on('click', 'span', function(e){
        //stop event from bubbling up and impacting the li
        e.stopPropagation();
        removeTodo($(this).parent());
    });
    
    //Add listenert to the ul with class list but specify so that the function only runs when lis within the ul are clicked
    $('.list').on('click', 'li', function(){
        //this refers to the li that is being clicked on
        updateTodo($(this))
    });
    
});


//Function that iterates through every returned todo in the JSON and appends the name of each item to the todo list
function addTodos(todos) {
    //add todos to page
    todos.forEach(function(todo){
       addTodo(todo);
    });
}

//Function to take content from textbox and create a new todo with that content
function createTodo(){
    //send request to create new todo. Post request
    var userInput = $('#todoInput').val();
    $.post('/api/todos',{name: userInput})
    .then(function(newTodo){
        //clear input if the post request is successful
        $('#todoInput').val('');
        addTodo(newTodo);
    })
    .catch(function(err){
        console.log(err);
    });
}


//Function to render one individual todo task to the page
function addTodo(todo){
    var newTodo = $('<li class="task">'+todo.name + ' <span>X</span></li>');
    //give each todo an element that stores the mongo id associated with it
    newTodo.data('id',todo._id);
    newTodo.data('completed',todo.completed);
    if(todo.completed){
        newTodo.addClass("done");
    }
    $('.list').append(newTodo);
}

//function to remove a specific todo item
function removeTodo(todo){
    //add two data attributed that pull in further info from the DB. One for the ID and one for the completed status
    var clickedId = todo.data('id');
    var deletedUrl = 'api/todos/' + clickedId;
    //Remove the entry from the database
    $.ajax({
        method: 'DELETE',
        url: deletedUrl
    })
    .then(function(data){
        //Remove the parent element (the whole li) from the DOM
        todo.remove();
    });
}

function updateTodo(todo){
    //create the url to pass into the ajax PUT request
    var updateUrl = 'api/todos/' + todo.data('id');
    //check and grab the current status of the data
    var isDone = todo.data('completed');
    //toggle the isDone status and save it as a variable to attach to the request 
    var updateData = {completed: !isDone};
    //send request to change status on server
    $.ajax({
        method: 'PUT',
        url: updateUrl,
        data: updateData
    })
    .then(function(updatedTodo){
        //update the view by toggling the class
        todo.toggleClass("done");
        //make sure to update the data in the DB as well
        todo.data('completed', !isDone);
    });
}