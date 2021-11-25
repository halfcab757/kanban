import TodosContainer from "./TodosContainer/TodosContainer";
import TodoList from "./TodoList/TodoList";

const Todos: React.FC = () => {
    return (
        <TodosContainer>
            <TodoList title='Todos'/>
            <TodoList title='In progress'/>
            <TodoList title='Done'/>
        </TodosContainer>
    );
}

export default Todos;
