// Function to load tasks from cookies
function loadTasks() {
    const tasks = getCookie('todoList');
    if (tasks) {
      const taskList = JSON.parse(tasks);
      taskList.forEach(task => addTaskToList(task, false));
    }
  }

  // Function to save tasks to cookies
  function saveTasks() {
    const tasks = [];
    const taskElements = document.querySelectorAll('.todo-item');
    taskElements.forEach(item => tasks.push(item.innerText));
    setCookie('todoList', JSON.stringify(tasks), 30); // Cookie expires in 30 days
  }

  // Function to add a task to the list and DOM
  function addTaskToList(task, save = true) {
    const taskElement = document.createElement('div');
    taskElement.className = 'todo-item';
    taskElement.innerText = task;

    // Click event to remove a task
    taskElement.onclick = function() {
      if (confirm('Do you really want to remove this TO DO?')) {
        taskElement.remove();
        saveTasks();
      }
    };

    // Add the task at the top of the list
    const taskList = document.getElementById('ft_list');
    taskList.prepend(taskElement);

    // Save tasks to cookies if requested
    if (save) saveTasks();
  }

  // Handle New Task button click
  document.getElementById('newBtn').addEventListener('click', function() {
    const task = prompt('Enter your new TO DO:');
    if (task && task.trim() !== '') {
      addTaskToList(task.trim());
    }
  });

  // Cookie helper functions
  function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }

  function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  // Load tasks on page load
  window.onload = loadTasks;