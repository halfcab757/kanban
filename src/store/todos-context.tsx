import React, { SyntheticEvent, useState } from 'react';
import Todo from "../models/todo";

const DUMMY_TODOS = [
    new Todo('Go to the supermarket', 'new'),
    new Todo('Buy chrismas presents', 'progress'),
    new Todo('Finish react course', 'done')
];

export const TodosContext = React.createContext<{items: Todo[], moveItem: (event: SyntheticEvent) => void, addingTodo: boolean, toggleAddTodo: () => void }>({
    items: [],
    moveItem: (event: SyntheticEvent) => {},
    addingTodo: false,
    toggleAddTodo: () => {}
});

// methods to work with items

// Wo setze ich den eventlistenser? besser für performance wäre die Liste oder gar der container



const TodosContextProvider: React.FC = (props) => {
    const [items, setItems] = useState(DUMMY_TODOS);

    const [addingTodo, setAddingTodo] = useState(false);

    const toggleAddHandler = () => {
      setAddingTodo(prevState => !prevState);
    }

    const moveItem = (event: any) => {
        // status updaten und zwei item-listen updaten
        console.log('moving item');
        console.log(event.target.innerText);
        if (!event.target.innerText) {
            return;
        }
        console.log(event.target.closest('div')!.id!);
        // Ausrufezeichen nötig?
        const selectedItemId = event.target.closest('div')!.id!;
        const updatedItem = items.find(item => item.id === selectedItemId);
        if (!updatedItem) {
            // throw an error?
            return;
        }

        switch (updatedItem.status) {
            case 'new': 
                updatedItem.status = 'progress';
                break;
            case 'progress':
                updatedItem.status = 'done';
                break;
            case 'done':
                updatedItem.status = 'achieved';
                break;
            default: 
                return;
        }

        // folgendes geht noch eleganter
        const updatedItems = items.slice();
        const updatedItemIndex = items.findIndex(item => item.id === selectedItemId);
        updatedItems.splice(updatedItemIndex, 1, updatedItem);
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

    const initalContext = {
        items: items,
        moveItem: moveItem,
        addingTodo: addingTodo,
        toggleAddTodo: toggleAddHandler
    };

    return (
        <TodosContext.Provider value={initalContext}>
            {props.children}
        </TodosContext.Provider>
    );
}

export default TodosContextProvider;
