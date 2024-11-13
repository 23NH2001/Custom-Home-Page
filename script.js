// Clock Function
function updateClock() {
    const clockElement = document.getElementById('clock');
    const now = new Date();
    clockElement.textContent = now.toLocaleTimeString();
  }
  setInterval(updateClock, 1000);
  
  // Google Search Function
  function searchGoogle() {
    const query = document.getElementById('search').value;
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_parent');
  }
  
// Load bookmarks from localStorage
window.onload = function() {
    loadBookmarks();
    loadTodoList();
  }
  
  // Bookmarks Functionality
  function addBookmark() {
    const nameInput = document.getElementById('bookmarkName');
    const urlInput = document.getElementById('bookmarkUrl');
    const name = nameInput.value.trim();
    const url = urlInput.value.trim();
  
    if (name && url) {
      // Retrieve existing bookmarks from localStorage
      const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  
      // Add new bookmark
      bookmarks.push({ name, url });
  
      // Save bookmarks to localStorage
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  
      // Reload bookmarks
      loadBookmarks();
  
      // Clear inputs
      nameInput.value = '';
      urlInput.value = '';
    } else {
      alert('Please provide both name and URL.');
    }
  }
  
  // Load bookmarks from localStorage and display them
  function loadBookmarks() {
    const bookmarkContainer = document.getElementById('bookmarks');
    bookmarkContainer.innerHTML = ''; // Clear current bookmarks
  
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  
    bookmarks.forEach(bookmark => {
      const bookmarkItem = document.createElement('div');
      bookmarkItem.className = 'bookmark-item';
      bookmarkItem.innerHTML = `
        <a href="${bookmark.url}" target="_blank">${bookmark.name}</a> 
        <button onclick="deleteBookmark('${bookmark.url}')">x</button>`;
      bookmarkContainer.appendChild(bookmarkItem);
    });
  }
  
  // Delete a bookmark
  function deleteBookmark(url) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    bookmarks = bookmarks.filter(bookmark => bookmark.url !== url);
  
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  
    loadBookmarks(); // Reload bookmarks after deletion
  }
  
  // To-Do List Functionality
  function addTodo() {
    const todoInput = document.getElementById('todoInput');
    const task = todoInput.value.trim();
  
    if (task) {
      // Retrieve existing to-do items from localStorage
      const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
  
      // Add new task
      todoList.push({ task, completed: false });
  
      // Save updated to-do list to localStorage
      localStorage.setItem('todoList', JSON.stringify(todoList));
  
      // Reload to-do list
      loadTodoList();
  
      // Clear input
      todoInput.value = '';
    } else {
      alert('Please provide a task.');
    }
  }
  
  // Load to-do list from localStorage and display them
  function loadTodoList() {
    const todoListContainer = document.getElementById('todoList');
    todoListContainer.innerHTML = ''; // Clear current to-do list
  
    const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
  
    todoList.forEach((todo, index) => {
      const todoItem = document.createElement('li');
      todoItem.className = 'todo-item';
      todoItem.innerHTML = `
        <span onclick="toggleComplete(${index})" class="${todo.completed ? 'completed' : ''}">${todo.task}</span>
        <button onclick="deleteTodo(${index})">✔️</button>`;
      todoListContainer.appendChild(todoItem);
    });
  }
  
  // Toggle task completion
  function toggleComplete(index) {
    const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
    todoList[index].completed = !todoList[index].completed;
  
    // Save updated to-do list to localStorage
    localStorage.setItem('todoList', JSON.stringify(todoList));
  
    loadTodoList(); // Reload to-do list after toggling
  }
  
  // Delete a to-do item
  function deleteTodo(index) {
    let todoList = JSON.parse(localStorage.getItem('todoList')) || [];
    todoList = todoList.filter((todo, i) => i !== index);
  
    localStorage.setItem('todoList', JSON.stringify(todoList));
  
    loadTodoList(); // Reload to-do list after deletion
  }
  