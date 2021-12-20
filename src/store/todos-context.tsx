import React, { useState } from 'react';
import Todo from '../models/todo';

enum Status {
  'NEW' = 'NEW',
  'PROGRESS' = 'PROGRESS',
  'DONE' = 'DONE',
  // 'ACHIEVED' = 'ACHIEVED',
}

// In a real app, I would have built a REST API, set up some login logic and fetch the user's to-dos from that REST API
// AS I focused on the UI, I have skipped these steps and simply work with the following dummy data
const DUMMY_TODOS = [
  new Todo('Take a good look at this web app', Status.NEW, '#ee4fc7'),
  new Todo('Move these to dos from list to list', Status.NEW, '#c7ee4f'),
  new Todo('Add your own todo', Status.NEW, '#ee4fc7'),
  new Todo('Delete some todo', Status.NEW, '#4FC7EE'),
  new Todo('Read the "About" text', Status.NEW, '#c7ee4f'),
  new Todo(
    'Check the code on github - link in Navigation',
    Status.NEW,
    '#ee4fc7'
  ),
  new Todo('Contact me via linkedIn - link in "About"', Status.NEW, '#c7ee4f'),
];

// startEditing und cancelEditing verbinden
export const TodosContext = React.createContext<{
  items: Todo[];
  selectedItem: Todo | null;
  startEditingHandler: (itemId: string) => void;
  cancelEditingHandler: () => void;
  isUpdatingTodos: 'ADD' | 'DELETE' | 'EDIT' | 'CLEAR' | null;
  updatingTodosHandler: (
    action: 'ADD' | 'DELETE' | 'EDIT' | 'CLEAR' | null
  ) => void;
  updateTodosHandler: (
    action: 'ADD' | 'DELETE' | 'EDIT' | 'CLEAR',
    newTodo: Todo | null,
    newStatus: 'NEW' | 'DOING' | 'DONE' | null
  ) => void;
}>({
  items: [],
  selectedItem: null,
  startEditingHandler: (itemId: string) => {},
  cancelEditingHandler: () => {},
  isUpdatingTodos: null,
  updatingTodosHandler: (
    action: 'ADD' | 'DELETE' | 'EDIT' | 'CLEAR' | null
  ) => {},
  updateTodosHandler: (
    action: 'ADD' | 'DELETE' | 'EDIT' | 'CLEAR',
    newTodo: Todo | null,
    newStatus: 'NEW' | 'DOING' | 'DONE' | null
  ) => {}
});

const TodosContextProvider: React.FC = (props) => {
  const [items, setItems] = useState(DUMMY_TODOS);
  const [selectedItem, setSelectedItem] = useState<Todo | null>(null);
  const [isUpdatingTodos, setIsUpdatingTodos] = useState<
    'ADD' | 'DELETE' | 'EDIT' | 'CLEAR' | null
  >(null);

  // store options in a type or enum
  // rename this first handler
  const updatingTodosHandler = (
    action: 'ADD' | 'DELETE' | 'EDIT' | 'CLEAR' | null
  ) => {
    setIsUpdatingTodos(action);
    if (!action) {
      setSelectedItem(null);
    }
  };

  const updateTodosHandler = (
    action: 'ADD' | 'DELETE' | 'EDIT' | 'CLEAR',
    newTodo: Todo | null,
    newStatus: 'NEW' | 'DOING' | 'DONE' | null
  ) => {
    console.log('update todos runs');
    let updatedItems: Todo[] = [];
    switch (action) {
      case 'ADD':
        console.log('adding in updateTodosHandler');
        if (newTodo) {
          setItems((prevItems) => [newTodo, ...prevItems]);
        }
        break;
      case 'DELETE':
        console.log('delete in updateTodosHandler');
        updatedItems = items.filter((item) => item.id !== selectedItem!.id);
        setItems(updatedItems);
        break;
      case 'CLEAR':
        console.log('clear in updateTodosHandler');
        updatedItems = items.filter((item) => item.status !== 'DONE');
        setItems(updatedItems);
        break;
      case 'EDIT':
        console.log('edit in updateTodosHandler');
        if (!selectedItem) {
          return;
        }
        selectedItem.status = newStatus;
        const outDatedItems = items.filter(
          (item) => item.id !== selectedItem.id
        );
        updatedItems = [selectedItem, ...outDatedItems];
        setItems(updatedItems);
        break;
      default:
        return;
    }
    setSelectedItem(null);
    updatingTodosHandler(null);
  };

  const cancelEditingHandler = () => {
    setSelectedItem(null);
  };

  const startEditingHandler = (itemId: string) => {
    const selectedItem = items.find((item) => item.id === itemId)!;
    setSelectedItem(selectedItem);
  };

  const initalContext = {
    items: items,
    selectedItem: selectedItem,
    startEditingHandler: startEditingHandler,
    cancelEditingHandler: cancelEditingHandler,
    isUpdatingTodos: isUpdatingTodos,
    updatingTodosHandler: updatingTodosHandler,
    updateTodosHandler: updateTodosHandler
  };

  return (
    <TodosContext.Provider value={initalContext}>
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;
