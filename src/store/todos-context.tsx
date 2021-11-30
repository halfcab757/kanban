import React, { useState } from 'react';
import Todo from "../models/todo";

const DUMMY_TODOS = [
    new Todo('Go to the supermarket', 'new'),
    new Todo('Buy chrismas presents', 'progress'),
    new Todo('Finish react course', 'done')
];

export const TodosContext = React.createContext<{items: Todo[], moveItem: (event: any) => void }>({
    items: [],
    moveItem: (event: any) => {}
});

// methods to work with items



const TodosContextProvider: React.FC = (props) => {
    const [items, setItems] = useState(DUMMY_TODOS);

    const moveItem = (event: any) => {
        // status updaten und zwei item-listen updaten
        console.log('moving item');
        console.log(event.target);
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
        moveItem: moveItem
    };

    return (
        <TodosContext.Provider value={initalContext}>
            {props.children}
        </TodosContext.Provider>
    );
}

export default TodosContextProvider;
