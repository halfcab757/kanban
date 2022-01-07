class Todo {
    constructor(todoText, status, backgroundColor) {
        this.id = Math.random().toFixed(4).toString();
        this.text = todoText;
        this.status = status;
        this.color = backgroundColor;
    }
}

export default Todo;