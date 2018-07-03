new Vue({
	el: '#app',
	data: {
		newTodo: '',
		editedTodo: null,
		todos: [
			{
				title: 'Be a good teacher at CodeSchool',
				completed: false,
			}
		]
	},
	methods: {
		addTodo() {
			this.todos.push({
				title: this.newTodo,
				completed: false,
			})
			this.newTodo = ''
		},
		deleteTodo(todo) {
			this.todos.splice(this.todos.indexOf(todo), 1)
		},
		editTodo(todo) {
			this.editedTodo = todo
			this.cachedTitle = todo.title
		},
		doneEdit(todo) {
			this.editedTodo = null
		},
		cancel(todo) {
			this.editedTodo = null
			todo.title = this.cachedTitle
		},
	},
	directives: {
		'todo-focus'(el, binding) {
			if (binding.value)
				el.focus()
		}
	}
})











