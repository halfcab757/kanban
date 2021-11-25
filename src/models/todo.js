class Todo {
    constructor(todoText) {
        // id: new Date().toISOString();
        this.id = Math.random().toFixed(4).toString();
        this.text = todoText.trim();
        this.status = 'new';
    }
}

export default Todo;