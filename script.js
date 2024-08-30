
// script.js

document.getElementById('add-task-btn').addEventListener('click', addTask);
document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const taskInput = document.getElementById('new-task-input');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    const taskList = document.getElementById('task-list');

    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', () => {
        taskList.removeChild(taskItem);
        removeTaskFromLocalStorage(taskText);
    });

    taskItem.appendChild(deleteBtn);
    taskList.appendChild(taskItem);

    saveTaskToLocalStorage(taskText);
    taskInput.value = '';
}

function saveTaskToLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
    let tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function loadTasks() {
    let tasks = getTasksFromLocalStorage();
    const taskList = document.getElementById('task-list');

    tasks.forEach(taskText => {
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', () => {
            taskList.removeChild(taskItem);
            removeTaskFromLocalStorage(taskText);
        });

        taskItem.appendChild(deleteBtn);
        taskList.appendChild(taskItem);
    });
}

function removeTaskFromLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}