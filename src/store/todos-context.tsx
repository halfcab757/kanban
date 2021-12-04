import React, { useState, useEffect } from 'react';
import Todo from "../models/todo";

const DUMMY_TODOS = [
    new Todo('Go to the supermarket', 'new'),
    new Todo('Buy chrismas presents', 'new'),
    new Todo('Finish react course', 'new')
];

export const TodosContext = React.createContext<{items: Todo[]; freshTodos: Todo[]; progressedTodos: Todo[]; finishedTodos: Todo[]; moveItem: (itemId: string) => void; addingTodo: boolean; toggleAddTodo: () => void; addTodo: (todo: Todo) => void; deleteTodo: (id: string) => void; }>({
    items: [],
    freshTodos: [],
    progressedTodos: [],
    finishedTodos: [],
    moveItem: (itemId: string) => {},
    addingTodo: false,
    toggleAddTodo: () => {},
    addTodo: (todo: Todo) => {},
    deleteTodo: (itemId: string) => {}
});

// Wo setze ich den eventlistenser? besser für performance wäre die Liste oder gar der container

const TodosContextProvider: React.FC = (props) => {
    const [items, setItems] = useState(DUMMY_TODOS);
    const [addingTodo, setAddingTodo] = useState(false);
    const [freshTodos, setFreshTodos] = useState<Todo[]>([]);
    const [progressedTodos, setProgressedTodos] = useState<Todo[]>([]);
    const [finishedTodos, setFinishedTodos] = useState<Todo[]>([]);

    useEffect(() => {
        console.log('useEffect in context');
        const freshTodos = items.filter(item => item.status === 'new').length > 0 ? items.filter(item => item.status === 'new') : [];
        const progressedTodos = items.filter(item => item.status === 'progress').length > 0 ? items.filter(item => item.status === 'progress') : []; 
        const finishedTodos = items.filter(item => item.status === 'done').length > 0 ? items.filter(item => item.status === 'done') : [];
        setFreshTodos(freshTodos);
        setProgressedTodos(progressedTodos);
        setFinishedTodos(finishedTodos);
    }, [items]);

    const toggleAddHandler = () => {
      setAddingTodo(prevState => !prevState);
    }

    const moveItem = (itemId: string) => {
        // status updaten und zwei item-listen updaten
        console.log('moving item');
        // console.log(event.target.innerText);
        // if (!event.target.innerText) {
        //     return;
        // // }
        // console.log(event.target.closest('div')!.id!);
        // Ausrufezeichen nötig?
        // const selectedItemId = event.target.closest('div')!.id!;
        const updatedItem = items.find(item => item.id === itemId);
        console.log(updatedItem);
        if (!updatedItem) {
            // throw an error?
            return;
        }
        

        switch (updatedItem.status) {
            case 'new': 
                updatedItem.status = 'progress';
                break;
            case 'progress':
                console.log('progress');
                updatedItem.status = 'done';
                console.log(updatedItem);
                break;
            case 'done':
                updatedItem.status = 'achieved';
                break;
            default: 
                return;
        }

        // folgendes geht noch eleganter
        const updatedItems = items.slice();
        const updatedItemIndex = items.findIndex(item => item.id === itemId);
        updatedItems.splice(updatedItemIndex, 1, updatedItem);
        console.log(updatedItems);
        setItems(updatedItems);

        // const selectedItem = event.target;
        // console.log(selectedItem);
        // if (!selectedItem) {
        //     return;
        // }

        // if(selectedItem.status === 'new') {
        //     selectedItem.status = 'progress';
        // }

        // setItems(prevItems => {
        //     return [...prevItems, selectedItem];
        // })
    };

    const addTodo = (newTodo: Todo) => {
        console.log('adding todo in context');
        setItems(prevItems => [newTodo, ...prevItems]);
        console.log(items);
        toggleAddHandler();
    }

    const deleteTodo = (itemId: string) => {
        console.log('deleting in context');
        const updatedItems = items.filter(item => item.id !== itemId);
        setItems(updatedItems);
    };

    const initalContext = {
        items: items,
        moveItem: moveItem,
        addingTodo: addingTodo,
        toggleAddTodo: toggleAddHandler,
        addTodo: addTodo,
        deleteTodo: deleteTodo,
        freshTodos,
        progressedTodos,
        finishedTodos
    };

    return (
        <TodosContext.Provider value={initalContext}>
            {props.children}
        </TodosContext.Provider>
    );
}

export default TodosContextProvider;
