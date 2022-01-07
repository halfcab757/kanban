import React, { useState } from 'react';
import Todo from '../models/todo';

enum Status {
  'NEW' = 'NEW',
  'DOING' = 'DOING',
  'DONE' = 'DONE'
}

const DUMMY_TODOS = [
  new Todo('Move TODOs from list to list', Status.NEW, '#c7ee4f'),
  new Todo('Add and delete a TODO', Status.NEW, '#ee4fc7'),
  new Todo('Read the "About" section', Status.NEW, '#c7ee4f'),
  // new Todo(
  //   'Check the code on github - link in "About" section',
  //   Status.NEW,
  //   '#ee4fc7'
  // ),
  new Todo('Contact me on LinkedIn - link in "About" section', Status.NEW, '#c7ee4f')
];

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
        if (newTodo) {
          setItems((prevItems) => [newTodo, ...prevItems]);
        }
        break;
      case 'DELETE':
        updatedItems = items.filter((item) => item.id !== selectedItem!.id);
        setItems(updatedItems);
        break;
      case 'CLEAR':
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
