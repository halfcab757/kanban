import React, { useState } from 'react';
import Todo from '../models/todo';

enum Status {
  'NEW' = 'NEW',
  'PROGRESS' = 'PROGRESS',
  'DONE' = 'DONE',
  'ACHIEVED' = 'ACHIEVED',
}

// maybe use Union types instead? I cant use Status everywhere

const DUMMY_TODOS = [
  new Todo('Take a good look at this web app', Status.NEW, '#ee4fc7'),
  new Todo('Move these to dos from list to list', Status.NEW, '#c7ee4f'),
  new Todo('Add your own todo', Status.NEW, '#ee4fc7'),
  new Todo('Delete some todo', Status.NEW, '#4FC7EE'),
  new Todo('Read the "About" text', Status.NEW, '#c7ee4f'),
  new Todo('Check the code on github - link in Navigation', Status.NEW, '#ee4fc7'),
  new Todo('Contact me via linkedIn - link in "About"', Status.NEW, '#c7ee4f')
];

export const TodosContext = React.createContext<{
  items: Todo[];
  moveItem: (targetList: string) => void;
  addingTodo: boolean;
  deletingTodo: boolean;
  deletingFinishedTodos: boolean;
  toggleAddTodo: () => void;
  addTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
  startDeleteHandler: () => void;
  selectedItem: Todo | null;
  toggleClearingTodos: () => void;
  deleteDoneTodos: () => void;
  startEditingHandler: (itemId: string) => void;
  cancelEditingHandler: () => void;
}>({
  items: [],
  moveItem: (targetList: string) => {},
  addingTodo: false,
  deletingTodo: false,
  deletingFinishedTodos: false,
  toggleAddTodo: () => {},
  addTodo: (todo: Todo) => {},
  deleteTodo: (itemId: string) => {},
  startDeleteHandler: () => {},
  selectedItem: null,
  deleteDoneTodos: () => {},
  toggleClearingTodos: () => {},
  startEditingHandler: (itemId: string) => {},
  cancelEditingHandler: () => {}
});

const TodosContextProvider: React.FC = (props) => {
  const [items, setItems] = useState(DUMMY_TODOS);
  const [addingTodo, setAddingTodo] = useState(false);
  const [deletingTodo, setDeletingTodo] = useState(false);
  const [isDeletingTodos, setIsDeletingTodos] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Todo | null>(null);

  const toggleAddHandler = () => {
    setAddingTodo((prevState) => !prevState);
  };

  const toggleClearingTodos = () => {
    console.log('toggle clearing todos');
    setIsDeletingTodos(prevState => !prevState);
  }

  const deleteDoneTodos = () => {
    const updatedItems = items.filter(item => item.status !== 'DONE');
    setItems(updatedItems);
    toggleClearingTodos();
  }

  const startDeleteHandler = () => {
    setDeletingTodo(true);
  }

  const cancelEditingHandler = () => {
    setSelectedItem(null);
    setDeletingTodo(false);
  }

  const startEditingHandler = (itemId: string) => {
    const selectedItem = items.find(item => item.id === itemId)!;
    setSelectedItem(selectedItem);
  }

  const moveItem = (newStatus: string) => {
    if (!selectedItem) {
      return;
    }
    selectedItem.status = newStatus;
    const outDatedItems = items.filter(item => item.id !== selectedItem.id);
    const updatedItems = [selectedItem, ...outDatedItems];
    setItems(updatedItems);
    setSelectedItem(null);
  };

  const addTodo = (newTodo: Todo) => {
    setItems(prevItems => [newTodo, ...prevItems]);
    toggleAddHandler();
  };

  const deleteTodo = (itemId: string) => {
    // deletingTodo und editingTodo vielleicht verbinden?
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
    selectedItem: selectedItem,
    deleteDoneTodos: deleteDoneTodos,
    startEditingHandler: startEditingHandler,
    cancelEditingHandler: cancelEditingHandler,
    toggleClearingTodos: toggleClearingTodos,
    deletingFinishedTodos: isDeletingTodos
  };

  return (
    <TodosContext.Provider value={initalContext}>
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;
