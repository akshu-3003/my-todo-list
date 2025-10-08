// ===== DOM ELEMENTS =====
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

// ===== LOAD TASKS FROM LOCAL STORAGE =====
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
tasks.forEach(task => addTaskToDOM(task));

// ===== ADD TASK =====
addBtn.addEventListener('click', () => {
    const text = taskInput.value.trim(); // get input and remove extra spaces
    if (text !== '') {
        const task = { id: Date.now(), text, completed: false }; // create task object
        tasks.push(task); // store in array
        addTaskToDOM(task); // show on screen
        saveTasks(); // save to localStorage
        taskInput.value = ''; // clear input box
    }
});

// ===== FUNCTION: ADD TASK TO DOM =====
function addTaskToDOM(task) {
    const li = document.createElement('li'); // create list item
    if (task.completed) li.classList.add('completed'); // add completed style if needed

    const span = document.createElement('span'); // create span for task text
    span.textContent = task.text; // show text inside span

    // ✅ TOGGLE COMPLETE (strike-through)
    span.addEventListener('click', () => {
        task.completed = !task.completed; // toggle true/false
        li.classList.toggle('completed'); // toggle class visually
        saveTasks(); // save updated state
    });

    // ✏️ EDIT BUTTON
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit');
    editBtn.addEventListener('click', () => editTask(task, span));

    // 🗑️ DELETE BUTTON
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        tasks = tasks.filter(t => t.id !== task.id); // remove from array
        li.remove(); // remove from UI
        saveTasks(); // update localStorage
    });

    // add all elements inside <li>
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    // finally add <li> to task list
    taskList.appendChild(li);
}

// ===== FUNCTION: EDIT TASK =====
function editTask(task, span) {
    const newText = prompt('Edit your task:', task.text);
    if (newText !== null && newText.trim() !== '') {
        task.text = newText.trim(); // update text in array
        span.textContent = task.text; // update text in UI
        saveTasks(); // save updated data
    }
}

// ===== FUNCTION: SAVE TASKS TO LOCAL STORAGE =====
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
