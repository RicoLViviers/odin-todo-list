export default function createTodoItem(title, description, dueDate, priority, completed = false) {
    return {
        title,
        description,
        dueDate,
        priority,
        completed,

        isOverdue() {
            return new Date(dueDate) < new Date();
        },
        toString() {
            return `${title} (${priority}) - due ${dueDate}`;
        },
        update(fields) {
            Object.assign(this, fields);
        },
        isCompleted() {
            return this.completed;
        }
    };
}