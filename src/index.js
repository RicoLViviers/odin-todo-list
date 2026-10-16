import "./styles.css";
import createTodoItem from "./todoItem";

let taskList = [];

const todoTable = document.querySelector("#todo-table");
const taskForm = document.getElementById("task-form");
const taskFormElement = taskForm.querySelector("form");
const addTask = document.getElementById("add-task");

// Clear only the data rows, keep the header row intact
function clearTable() {
    const rows = todoTable.querySelectorAll("tr:not(:first-child)");
    rows.forEach(row => row.remove());
}

function displayTasks() {
    clearTable();

    taskList.forEach(task => {
        const taskRow = document.createElement("tr");

        const taskTitle = document.createElement("td");
        taskTitle.innerText = task.title;

        const taskDescription = document.createElement("td");
        taskDescription.innerText = task.description;

        const taskDue = document.createElement("td");
        taskDue.innerText = task.dueDate;

        const taskPriority = document.createElement("td");
        taskPriority.innerText = task.priority;

        const taskState = document.createElement("td");
        taskState.innerText = task.state;

        // Edit cell
        const taskEdit = document.createElement("td");
        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.addEventListener("click", () => editTask(task));
        taskEdit.appendChild(editBtn);

        // Delete cell
        const taskDelete = document.createElement("td");
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.addEventListener("click", () => {
            taskList = taskList.filter(t => t !== task);
            displayTasks();
        });
        taskDelete.appendChild(deleteBtn);

        taskRow.appendChild(taskTitle);
        taskRow.appendChild(taskDescription);
        taskRow.appendChild(taskDue);
        taskRow.appendChild(taskPriority);
        taskRow.appendChild(taskState);
        taskRow.appendChild(taskEdit);
        taskRow.appendChild(taskDelete);

        todoTable.appendChild(taskRow);
    });
}

// Track whether we're editing an existing task
let editingTask = null;

function editTask(task) {
    editingTask = task;
    document.getElementById("title").value = task.title;
    document.getElementById("description").value = task.description;
    document.getElementById("due-date").value = task.dueDate;
    document.getElementById("priority").value = task.priority;
    taskForm.showModal();
}

// Render tasks on load
displayTasks();

addTask.addEventListener("click", () => {
    editingTask = null;
    taskFormElement.reset();
    taskForm.showModal();
});

// Handle the form submission
taskFormElement.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const dueDate = document.getElementById("due-date").value;
    const priority = document.getElementById("priority").value;

    if (!title) return;

    if (editingTask) {
        // Update existing task
        editingTask.title = title;
        editingTask.description = description;
        editingTask.dueDate = dueDate;
        editingTask.priority = priority;
        editingTask = null;
    } else {
        // Create new task
        const newTask = createTodoItem(title, description, dueDate, priority);
        taskList.push(newTask);
    }

    taskFormElement.reset();
    taskForm.close();
    displayTasks();
});