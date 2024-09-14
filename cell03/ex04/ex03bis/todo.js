$(document).ready(function() {
    // Load TO DOs from cookies when the page loads
    loadTodosFromCookie()

    // Event handler to create a new TO DO
    $('#newTodo').click(function() {
      const todoText = prompt('Enter a new TO DO:')
      if (todoText && todoText.trim() !== '') {
        addTodo(todoText)
        saveTodosToCookie()
      }
    });

    // Function to add a new TO DO item to the list
    function addTodo(text) {
      const newTodo = $('<div class="todo-item"></div>').text(text)
      $('#ft_list').prepend(newTodo)

      // Click event to remove the TO DO
      newTodo.click(function() {
        const confirmDelete = confirm('Do you really want to delete this TO DO?')
        if (confirmDelete) {
          $(this).remove()
          saveTodosToCookie() // Save the updated list to cookies
        }
      })
    }

    // Function to save TO DOs to cookies
    function saveTodosToCookie() {
      const todoArray = []
      $('#ft_list .todo-item').each(function() {
        todoArray.unshift(encodeURIComponent($(this).text()))
      });
      document.cookie = 'todos=' + JSON.stringify(todoArray) + '; path=/'
    }

    // Function to load TO DOs from cookies
    function loadTodosFromCookie() {
      const cookieString = document.cookie.split('; ').find(row => row.startsWith('todos='))
      if (cookieString) {
        const todoArray = JSON.parse(cookieString.split('=')[1])
        todoArray.forEach(function(todoText) {
          addTodo(decodeURIComponent(todoText))
        })
      }
    }
  })