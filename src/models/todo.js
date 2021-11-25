class Todo {
    constructor(todoText, status) {
        // id: new Date().toISOString();
        this.id = Math.random().toFixed(4).toString();
        this.text = todoText.trim();
        this.status = status;
    }
}

export default Todo;