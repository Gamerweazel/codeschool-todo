const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.completed),
  completed: todos => todos.filter(todo => todo.completed)
}

const app = new Vue({
  el: '#app',
  data: {
    todos: [],
    newTodo: '',
    editedTodo: null,
  },
  created() {
    fetch('/todos')
      .then(res => res.json())
      .then(todos => this.todos = todos)
  },
  computed: {
    remaining() {
      return filters.active(this.todos).length
    },
  },
  filters: {
    pluralize: n => n === 1 ? 'item' : 'items'
  },
  methods: {
    addTodo() {
      const title = this.newTodo.trim()
      if (!title) {
        return
      }
      fetch('/todos', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            title
          })
        })
        .then(res => res.json())
        .then(todo => {
          this.todos.push(todo)
          this.newTodo = ''
        })
    },
    removeTodo(todo) {
      fetch(`/todos/${todo._id}`, {
          method: 'DELETE'
        })
        .then(() => this.todos.splice(this.todos.indexOf(todo), 1))
    },
    editTodo(todo) {
      this.beforeEditCache = todo.title
      this.editedTodo = todo
    },
    checkTodo(todo) {
      const completed = !todo.completed
      fetch(`/todos/${todo._id}`, {
          method: 'PUT',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            title: todo.title,
            completed
          })
        })
        .then(() => todo.completed = completed)
    },
    doneEdit(todo) {
      if (!this.editedTodo) {
        return
      }
      const title = todo.title.trim()
      if (!title) {
        this.removeTodo(todo)
      }
      fetch(`/todos/${todo._id}`, {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            title,
            completed: todo.completed
          })
        })
        .then(res => res.json())
        .then(editedTodo => {
          todo.title = editedTodo.title
          this.editedTodo = null
        })
    },
    cancelEdit(todo) {
      this.editedTodo = null
      todo.title = this.beforeEditCache
    },
  },
  directives: {
    'todo-focus' (el, binding) {
      if (binding.value) {
        el.focus()
      }
    }
  }
})
