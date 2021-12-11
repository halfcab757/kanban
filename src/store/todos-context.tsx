import React, { useState } from 'react';
import Todo from '../models/todo';

enum Status {
  'NEW' = 'NEW',
  'PROGRESS' = 'PROGRESS',
  'DONE' = 'DONE',
  'ACHIEVED' = 'ACHIEVED',
}

const DUMMY_TODOS = [
  new Todo('Go to the supermarket', Status.NEW),
  new Todo('Buy chrismas presents', Status.NEW),
  new Todo('Finish react course', Status.NEW),
  new Todo('Call Mom', Status.NEW),
  // new Todo('Get cash', Status.NEW),
  // new Todo('Grocery shopping', Status.NEW),
];

export const TodosContext = React.createContext<{
  items: Todo[];
  moveItem: (itemId: string, targetList: string) => void;
  addingTodo: boolean;
  deletingTodo: boolean;
  toggleAddTodo: () => void;
  addTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
  startDeleteHandler: (itemId: string, itemTitle: string) => void;
  cancelDeleteHandler: () => void;
  selectedItem: Todo | null;
  deleteDoneTodos: () => void;
}>({
  items: [],
  moveItem: (itemId: string, targetList: string) => {},
  addingTodo: false,
  deletingTodo: false,
  toggleAddTodo: () => {},
  addTodo: (todo: Todo) => {},
  deleteTodo: (itemId: string) => {},
  startDeleteHandler: (itemId: string, itemTitle: string) => {},
  cancelDeleteHandler: () => {},
  selectedItem: null,
  deleteDoneTodos: () => {}
});

// Wo setze ich den eventlistenser? besser für performance wäre die Liste oder gar der container

const TodosContextProvider: React.FC = (props) => {
  const [items, setItems] = useState(DUMMY_TODOS);
  const [addingTodo, setAddingTodo] = useState(false);
  const [deletingTodo, setDeletingTodo] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Todo | null>(null);

  const toggleAddHandler = () => {
    setAddingTodo((prevState) => !prevState);
  };

  const deleteDoneTodos = () => {
    // confirmation with modal?
    const updatedItems = items.filter(item => item.status !== 'DONE');
    setItems(updatedItems);
  }

  const startDeleteHandler = (itemId: string) => {
    // console.log('starting to delete');
    const selectedItem = items.find(item => item.id === itemId)!;
    // better use a check before changing state
    setSelectedItem(selectedItem);
    setDeletingTodo(true);
  }

  const cancelDeleteHandler = () => {
    setSelectedItem(null);
    // better set it to null with union type
    setDeletingTodo(false);
  }

  const moveItem = (itemId: string, newStatus: string) => {
    const updatedItem = items.find(item => item.id === itemId);
    updatedItem!.status = newStatus;
    const outDatedItems = items.filter(item => item.id !== itemId);
    const updatedItems = [updatedItem!, ...outDatedItems];
    setItems(updatedItems);
  };

  const addTodo = (newTodo: Todo) => {
    setItems(prevItems => [newTodo, ...prevItems]);
    toggleAddHandler();
  };

  const deleteTodo = (itemId: string) => {
    console.log('deleting in context');
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
    setDeletingTodo(false);
  };

  const initalContext = {
    items: items,
    moveItem: moveItem,
    addingTodo: addingTodo,
    deletingTodo: deletingTodo,
    toggleAddTodo: toggleAddHandler,
    addTodo: addTodo,
    deleteTodo: deleteTodo,
    startDeleteHandler: startDeleteHandler,
    cancelDeleteHandler: cancelDeleteHandler,
    selectedItem: selectedItem,
    deleteDoneTodos: deleteDoneTodos
  };

  return (
    <TodosContext.Provider value={initalContext}>
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;
