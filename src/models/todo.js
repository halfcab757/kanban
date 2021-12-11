// enum für status verwenden oder zumindest union type

class Todo {
    constructor(todoText, status) {
        // id: new Date().toISOString();

        let backgroundColor = '';
        const randomNumber = Math.random();
        if (randomNumber < 0.33) {
            backgroundColor = '#ee4fc7';
        } else if (randomNumber > 0.33 && randomNumber < 0.66) {
            backgroundColor = '#c7ee4f';
        } else if (randomNumber > 0.66) {
            backgroundColor = '#4FC7EE';
        }



        this.id = Math.random().toFixed(4).toString();
        this.text = todoText.trim();
        this.status = status;
        this.color = backgroundColor;
    }
}

export default Todo;