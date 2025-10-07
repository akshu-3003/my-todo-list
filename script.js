// DOM Elements
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
tasks.forEach(task => addTaskToDOM(task));

// Add Task
addBtn.addEventListener('click', () => {
    const text = taskInput.value.trim();
    if (text !== '') {
        const task = { id: Date.now(), text, completed: false };
        tasks.push(task);
        addTaskToDOM(task);
        saveTasks();
        taskInput.value = '';
    }
});

// Add task to DOM
function addTaskToDOM(task) {
    const li = document.createElement('li');
    if (task.completed) li.classList.add('completed');

    const span = document.createElement('span');
    span.textContent = task.text;

    // ✅ Toggle Complete (strike-through)
    span.addEventListener('click', () => {
        task.completed = !task.completed;
        li.classList.toggle('completed');
        saveTasks();
    });

    // Edit Button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit');
    editBtn.addEventListener('click', () => editTask(task, span));

    // Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        tasks = tasks.filter(t => t.id !== task.id);
        li.remove();
        saveTasks();
    });

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// Edit Task
function editTask(task, span) {
    const newText = prompt('Edit your task:', task.text);
    if (newText !== null && newText.trim() !== '') {
        task.text = newText.trim();
        span.textContent = task.text;
        saveTasks();
    }
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
