import "./styles.css";
import createTodoItem from "./todoItem";

let myItem = createTodoItem("homework", "Do my homework", "2026-10-19", "high");
let myItem2 = createTodoItem("Dinner", "Make french fries for dinner", "2026-10-16", "high");

let taskList = [myItem, myItem2];

const todoTable = document.querySelector("#todo-table");

function displayTasks() {
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
    
        taskRow.appendChild(taskTitle);
        taskRow.appendChild(taskDescription);
        taskRow.appendChild(taskDue);
        taskRow.appendChild(taskPriority);
        taskRow.appendChild(taskState);
        todoTable.appendChild(taskRow);
    });
}

const addTask = document.getElementById("add-task");
const taskForm = document.getElementById("task-form");

addTask.addEventListener("click", () => {
    taskForm.showModal();
    displayTasks();
})