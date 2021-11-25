import { useContext } from "react";

import TodosContainer from "./TodosContainer/TodosContainer";
import TodoList from "./TodoList/TodoList";

// import Todo from "../../models/todo";
import { TodosContext } from "../../store/todos-context";


const Todos: React.FC = () => {
    const todosCtx = useContext(TodosContext);

    const newTodos = todosCtx.items.filter(todo => todo.status === 'new');
    const progressedTodos = todosCtx.items.filter(todo => todo.status === 'progress');
    const doneTods = todosCtx.items.filter(todo => todo.status === 'done');


    return (
        <TodosContainer>
            <TodoList title='Todos' items={newTodos}/>
            <TodoList title='In progress' items={progressedTodos}/>
            <TodoList title='Done'items={doneTods}/>
        </TodosContainer>
    );
}

export default Todos;
