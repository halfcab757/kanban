import React from 'react';
import Todo from "../models/todo";

const DUMMY_TODOS = [
    new Todo('Go to the supermarket', 'new'),
    new Todo('Buy chrismas presents', 'progress'),
    new Todo('Finish react course', 'done')
];

export const TodosContext = React.createContext<{items: Todo[]}>({
    items: []
});

const initalContext = {
    items: DUMMY_TODOS
};

const TodosContextProvider: React.FC = (props) => {

    return (
        <TodosContext.Provider value={initalContext}>
            {props.children}
        </TodosContext.Provider>
    );
}

export default TodosContextProvider;
