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
		}
	},
	directives: {
		'todo-focus'(el, binding) {
			if (binding.value)
				el.focus()
		}
	}
})











