// enum für status verwenden oder zumindest union type
// this is not a typescript file

class Todo {
    constructor(todoText, status, backgroundColor) {
        this.id = Math.random().toFixed(4).toString();
        this.text = todoText;
        this.status = status;
        this.color = backgroundColor;
    }
}

export default Todo;