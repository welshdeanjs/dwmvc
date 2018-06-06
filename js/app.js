/*global jQuery, Handlebars, Router */
jQuery(function ($) {
	'use strict';

	Handlebars.registerHelper('eq', function (a, b, options) {
		return a === b ? options.fn(this) : options.inverse(this);
	});

	var ENTER_KEY = 13;
	var ESCAPE_KEY = 27;

	var util = {
		uuid: function () {
			/*jshint bitwise:false */
			var i, random;
			var uuid = '';

			for (i = 0; i < 32; i++) {
				random = Math.random() * 16 | 0;
				if (i === 8 || i === 12 || i === 16 || i === 20) {
					uuid += '-';
				}
				uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
			}

			return uuid;
		},
		pluralize: function (count, word) {
			return count === 1 ? word : word + 's';
		},
		store: function (namespace, data) {
			if (arguments.length > 1) {
				return localStorage.setItem(namespace, JSON.stringify(data));
			} else {
				var store = localStorage.getItem(namespace);
				return (store && JSON.parse(store)) || [];
			}
		}
	};

	var App = {
		init: function () {
			this.todos = util.store('todos-jquery');
			this.todoTemplate = Handlebars.compile($('#todo-template').html());
			this.footerTemplate = Handlebars.compile($('#footer-template').html());
			this.bindEvents();

		new Router({
			'/:filter': function(filter) {
				this.filter = filter;
				this.render();
				}.bind(this)
			}).init('/all');
		},
	

		bindEvents: function () {
			// original jquery line below
			//$('.new-todo').on('keyup', App.create.bind(this));

			var jsCreate = document.querySelector('.new-todo');
			// Q 1: Why does getElementsByClassName not work in place of querySelector?
			// var jsCreate = document.getElementsByClassName('.new-todo');	
				
			jsCreate.addEventListener('keyup', App.create.bind(this));


			var bindToggleAll = document.getElementById('toggle-all');		
			bindToggleAll.addEventListener('click', function() {
				App.toggleAll.bind(App)();
			});

			// Q2. Why does line App.toggleAll.bind(this) not run inside a function? 

			// This is just filtering out the completed todos upon loading the page.
			// I'm not sure this has much to do with the cycling of 'clear completed' on the page.
			
		var footerVar = document.querySelector('footer');
		
		footerVar.addEventListener('click', function (e) {
			var grabWTF = e.target;
			if (grabWTF.id === 'wtf') {
			App.wtf();
			}
		})

		// footerGrab.addEventListener('click' , App.destroyCompleted.bind(this));

  	$('#footer').on('click', '#clear-completed', App.destroyCompleted.bind(this));
			
			// var wtfGrab = document.querySelector(".footer");
			// wtfGrab.addEventListener('click', App.wtf.bind(this));


// var whatTheF = document.querySelector(".wtf");
// whatTheF.addEventListener("click", App.wtf.bind(this));

		//	$('.footer').on('click', '.clear-completed', this.destroyCompleted.bind(this));

			$('.todo-list').on('change', '.toggle', App.toggle.bind(this))
				.on('dblclick', 'label', App.editingMode.bind(App))
				.on('keyup', '.edit', App.editKeyup.bind(this))
				.on('focusout', '.edit', App.update.bind(this))
				.on('click', '.destroy', App.destroy.bind(App));

		},
		

		wtf: function () {
		// Q: Why does the splice only work once, and not function as a toggle?
			var todos = App.todos;
			for(var i = 0; i<todos.length; i++) {
				if (todos[i].title == "What the frack, Starbuck?") {
					App.todos.splice([i], 1);
					App.render();
					return;
				}		 
			}
			App.todos.push({
				title: "What the frack, Starbuck?",
				wtf: true
			})	
			App.render();
		},

		getWTFtodos: function () {
			return this.todos.filter(function(todo) {
				return todo.wtf;
			})
		},

		// Q1: Why is this working? Why are new todos not being added with each click
		// of WTF button? 
		// Q2: Why does a page refresh add another?
		// Q3: Have I successfully added an element which then allows for a WTF todo to be
		// recognised and filtered?		
		// Q4: How to do I allow WTF button to be toggleable?


		render: function () {
			var todos = this.getFilteredTodos();
			$('.todo-list').html(this.todoTemplate(todos));
			$('.main').toggle(todos.length > 0);
			$('.toggle-all').prop('checked', this.getActiveTodos().length === 0);
			this.renderFooter();
			$('.new-todo').focus();
			util.store('todos-jquery', this.todos);
		},

		renderFooter: function () {
			var todoCount = this.todos.length;
			var activeTodoCount = this.getActiveTodos().length;
			var template = this.footerTemplate({
				activeTodoCount: activeTodoCount,
				activeTodoWord: util.pluralize(activeTodoCount, 'item'),
				completedTodos: todoCount - activeTodoCount,
				filter: this.filter
			});

			$('.footer').toggle(todoCount > 0).html(template);
		},
		
		toggleAll: function() {
				var isChecked = event.target.checked;
				this.todos.forEach(function(one) {
					one.completed = isChecked;
				});

			this.render(); 
		},

		// Original jquery version

		// toggleAll: function (e) {
		// var isChecked = $(e.target).prop('checked');

		// 	this.todos.forEach(function (todo) {
		// 		todo.completed = isChecked;
		// 	});

		// 	this.render();
		// },
		
		

		getActiveTodos: function () {
			return this.todos.filter(function(todo) {
				return !todo.completed;
			});
		},
		getCompletedTodos: function () {
			return this.todos.filter(function(todo) {
				return todo.completed;
			});
		},
		getFilteredTodos: function () {
			if (this.filter === 'active') {
				return this.getActiveTodos();
			}

			if (this.filter === 'completed') {
				return this.getCompletedTodos();
			}

			if (this.filter === 'wtf') {
				return this.getWTFtodos();
			}

			return this.todos;
		},
		
		destroyCompleted: function () {
			this.todos = this.getActiveTodos();
			this.filter = 'all';
			this.render();
		},



	
		// accepts an element from inside the `.item` div and
		// returns the corresponding index in the `todos` array
		

		// getIndexFromEl: function (el) {
		// 	var id = $(el).closest('li').data('id');
		// 	var todos = this.todos;
		// 	var i = todos.length;

		// 	while (i--) {
		// 		if (todos[i].id === id) {
		// 			return i;
		// 		}
		// 	}	
		// },

		//Ideas for getIndexFromEl
		getIndexFromEl: function (el) {
			var id = el.closest('li').getAttribute('data-id');
			var todos = this.todos;
			var i = todos.length;

				while (i--) {
						if (todos[i].id === id) {
							return i;
						}
			}
		},

		create: function(e) {
			// without 'this', can the event handler still be run?
			var input = e.target;
			var val = input.value;

			if (e.which != ENTER_KEY || !input.value) {
				return;
			}
			
			// 'this' goes to 'todo class' without bind. Why? 	
			this.todos.unshift({
				id: util.uuid(),
				title: val,
				completed: false

			});	

			input.value = "";
			this.render();
		},	

		// create: function (e) {
		// 	var $input = $(e.target);
		// 	var val = $input.val().trim();

		// 	if (e.which !== ENTER_KEY || !val) {
		// 		return;
		// 	}

		// 	this.todos.push({
		// 		id: util.uuid(),
		// 		title: val,
		// 		completed: false
		// 	});

		// 	$input.val('');

		// 	this.render();
		// },


		toggle: function (e) {
			var i = this.getIndexFromEl(e.target);
			this.todos[i].completed = !this.todos[i].completed;
			this.render();
		},

		editingMode: function (e) {
			var $input = $(e.target).closest('li').addClass('editing').find('.edit');
			// puts caret at end of input
			var tmpStr = $input.val();
			$input.val('');
			$input.val(tmpStr);
		},
		editKeyup: function (e) {
			if (event.which === ENTER_KEY) {
				e.target.blur();
			}

			if (e.which === ESCAPE_KEY) {
				$(e.target).data('abort', true).blur();
			}
		},
		
		update: function (e) {
			var el = e.target;
			var $el = $(el);
			var val = $el.val().trim();

			if (!val) {
				this.destroy(e);
				return;
			}

			if ($el.data('abort')) {
				$el.data('abort', false);
			} else {
				this.todos[this.getIndexFromEl(el)].title = val;
			}

			this.render();
		},

		destroy: function(e) {
			var todos = this.todos;
			todos.splice(this.getIndexFromEl(e.target), 1);
			this.render(); 
		}
	
};

	App.init();
});


