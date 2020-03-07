/* 
V1 requirements
arrays
	
V2 requirements
functions
	
V3 requirements 
objects and methods

V4 requirements
should store, display, add, change, delete
should add objects
should change todoText property
toggleCompleted should change completed property
	
V5 requirements
add for loops, displayTodos shows .todoText
display should tell you if todo is empty
displayTodos should show completed

V6 requirements
toggleAll: if everything's true, make it all false
otherwise, make everything true
*/

var todoList = {
	todos: [],
	displayTodos: function () {
		// console.log('My Todos', this.todos);
		if (this.todos.length === 0) {
			console.log('Your to-do list is empty!')
		} else {
			console.log('My Todos: ');
			for (var i = 0; i < this.todos.length; i++) {
				// console.log(this.todos[i].todoText);
				//update the above to follow a conditional
				if (this.todos[i].completed === true) {
					console.log('[x]', this.todos[i].todoText);
				} else {
					//the comma gives automatic spacing
					console.log('[ ]', this.todos[i].todoText);
				}
			}
		}
	},
	addTodo: function (todoText) {
		this.todos.push({
			todoText: todoText, //the value changes based on the parameter
			completed: false
		});
		this.displayTodos();
	},
	changeTodo: function (position, todoText) {
		// this.todos[position] = value;
		this.todos[position].todoText = todoText;
		this.displayTodos();
	},
	deleteTodo: function (position) {
		this.todos.splice(position, 1);
		this.displayTodos();
	},
	toggleCompleted: function (position) {
		var todo = this.todos[position];
		todo.completed = !todo.completed;
		this.displayTodos();
	},
	toggleAll: function () {
		var totalComplete = 0;
		var totalTodos = this.todos.length
		for (var i = 0; i < totalTodos; i++) {
			if (this.todos[i].completed === true) {
				totalComplete++;
			}
		}
		// console.log(totalComplete = totalTodos), this equals 2;
		if (totalComplete === totalTodos) {
			for (var i = 0; i < totalTodos; i++) {
				this.todos[i].completed = false;
			}
		} else {
			for (var i = 0; i < totalTodos; i++) {
				this.todos[i].completed = true;
			}
		}
		this.displayTodos();
	}
};

/*V7 requirements
reaching limits of what it can do in the console
Interface:
- Display todos button
- Toggle all button 
- clicking Display todos just runs todoList.displayTodo
- clicking Toggle all should run todoList.toggleAll
*/

// var displayTodosButton = document.getElementById("displayTodosButton");
// var displayToDosButton = document.getElementById("displayToDosButton");
// console.log(displayToDosButton);
// displayToDosButton.addEventListener('click', function () {
// 	todoList.displayTodos();
// })

// var toggleAllButton = document.getElementById("toggleAllButton");
// toggleAllButton.addEventListener('click', function () {
// 	todoList.toggleAll();
// })

var handlers = {
	// displayTodos: function () {
	// 	todoList.displayTodos();
	// },

	addTodo: function () {
		var addTodoTextInput = document.getElementById('addTodoTextInput');
		todoList.addTodo(addTodoTextInput.value);
		addTodoTextInput.value = ''
		view.displayTodos();
	},
	changeTodo: function () {
		var changeTodoPosition = document.getElementById('changeTodoPosition');
		var changeTodoText = document.getElementById('changeTodoText');
		todoList.changeTodo(changeTodoPosition.valueAsNumber, changeTodoText.value);
		changeTodoPosition.value = '';
		changeTodoText.value = '';
		view.displayTodos();
	},

	deleteTodo: function (position) {
		// var deleteTodoPosition = document.getElementById('deleteTodoPosition');
		todoList.deleteTodo(position);
		// deleteTodoPosition.value = '';
		view.displayTodos();
	},
	toggleCompleted: function () {
		var toggleCompleted = document.getElementById('toggleCompletedPosition');
		todoList.toggleCompleted(toggleCompleted.valueAsNumber);
		toggleCompleted = '';
		view.displayTodos();
	},
	toggleAll: function () {
		todoList.toggleAll();
		view.displayTodos();
	}
}

/* V9 requirements
li element for every todo
li element should contain .todoText
li element should show .completed
 //var todoTextWithCompletion = '';
 // if (todo.completed === true)
		//[x] todoText
 // else
		//[ ] todoText
 // todoLi.textContent = todoTextWithCompletion
*/

var view = {
	displayTodos: function () {
		var todosUl = document.querySelector('ul');
		//if we don't clear the innerHTML each time, it
		//will keep adding 2 each time we create the view
		todosUl.innerHTML = '';
		for (var i = 0; i < todoList.todos.length; i++) {
			var todoLi = document.createElement('li');
			var todo = todoList.todos[i];
			var todoTextWithCompletion = '';

			if (todo.completed === true) {
				todoTextWithCompletion = '[x] ' + todo.todoText;
			} else {
				todoTextWithCompletion = '[ ] ' + todo.todoText;
			}
			// todoLi.textContent = todoList.todos[i].todoText;
			todosUl.appendChild(todoLi);			
			todoLi.id = i;
			todoLi.textContent = todoTextWithCompletion;
			todoLi.appendChild(this.createDeleteButton());

		}
	},
	//create new method because previous method is getting long
	//use this in displayTodos eventually
	//add eventListener to the unordered list and tell it which li to delete
	createDeleteButton: function(){
		var deleteButton = document.createElement('button');
		deleteButton.textContent = 'Delete';
		deleteButton.className = 'deleteButton';
		return deleteButton;
	}
}

var todosUl = document.querySelector('ul');
todosUl.addEventListener('click', function(event) {
	// console.log(event) to check target and parentNode;
	// console.log(event.target.parentNode.id);

	//get to the item that was clicked on;
	var elementClicked = event.target;

	//check if elementClicked is a delete button
	if (elementClicked.className === 'deleteButton') {
		// run handlers.deleteTodo
		handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
	}
});

/* need a way to create delete
need delete button for each item
each li should have id with todo position
delete button should have access to todo id
clicking delete should update todolist.todos
*/