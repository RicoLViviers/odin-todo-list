import "./styles.css";
import createTodoItem from "./todoItem";

let myItem = createTodoItem("homework", "Do my homework", "2026-10-19", "high");

console.log(myItem.isCompleted());

console.log("Hello World");