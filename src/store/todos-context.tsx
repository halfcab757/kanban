import React, { useState, useEffect } from 'react';
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
  // new Todo('Call Mom', Status.NEW),
  // new Todo('Get cash', Status.NEW),
  // new Todo('Grocery shopping', Status.NEW),
];

export const TodosContext = React.createContext<{
  items: Todo[];
  freshTodos: Todo[];
  progressedTodos: Todo[];
  finishedTodos: Todo[];
  moveItem: (itemId: string) => void;
  moveItemStraightToDone: (itemId: string) => void;
  addingTodo: boolean;
  deletingTodo: boolean;
  toggleAddTodo: () => void;
  addTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
  startDeleteHandler: (itemId: string, itemTitle: string) => void;
  cancelDeleteHandler: () => void;
  selectedItem: Todo | null
}>({
  items: [],
  freshTodos: [],
  progressedTodos: [],
  finishedTodos: [],
  moveItem: (itemId: string) => {},
  moveItemStraightToDone: (itemId: string) => {},
  addingTodo: false,
  deletingTodo: false,
  toggleAddTodo: () => {},
  addTodo: (todo: Todo) => {},
  deleteTodo: (itemId: string) => {},
  startDeleteHandler: (itemId: string, itemTitle: string) => {},
  cancelDeleteHandler: () => {},
  selectedItem: null
});

// Wo setze ich den eventlistenser? besser für performance wäre die Liste oder gar der container

const TodosContextProvider: React.FC = (props) => {
  const [items, setItems] = useState(DUMMY_TODOS);
  const [addingTodo, setAddingTodo] = useState(false);
  const [deletingTodo, setDeletingTodo] = useState(false);
  const [freshTodos, setFreshTodos] = useState<Todo[]>([]);
  const [progressedTodos, setProgressedTodos] = useState<Todo[]>([]);
  const [finishedTodos, setFinishedTodos] = useState<Todo[]>([]);
  const [selectedItem, setSelectedItem] = useState<Todo | null>(null);

  useEffect(() => {
    console.log('useEffect in context');
    const freshTodos =
      items.filter((item) => item.status === Status.NEW).length > 0
        ? items.filter((item) => item.status === Status.NEW)
        : [];
    const progressedTodos =
      items.filter((item) => item.status === Status.PROGRESS).length > 0
        ? items.filter((item) => item.status === Status.PROGRESS)
        : [];
    const finishedTodos =
      items.filter((item) => item.status === Status.DONE).length > 0
        ? items.filter((item) => item.status === Status.DONE)
        : [];
    setFreshTodos(freshTodos);
    setProgressedTodos(progressedTodos);
    setFinishedTodos(finishedTodos);
  }, [items]);

  const toggleAddHandler = () => {
    setAddingTodo((prevState) => !prevState);
  };

  const startDeleteHandler = (itemId: string) => {
    console.log('starting to delete');
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

  const updateTodoLists = (itemList: string, item: Todo) => {
      console.log('updating todo lists');
    //   let list: Todo[];
      if (itemList === Status.NEW) {
          const updatedFreshItems = freshTodos.filter(todo => todo.id !== item.id);
          const updatedProgressedItems = [item, ...progressedTodos];
          setFreshTodos(updatedFreshItems);
          setProgressedTodos(updatedProgressedItems);
      }

      if (itemList === Status.PROGRESS) {
        const updatedProgressedItems = progressedTodos.filter(todo => todo.id !== item.id);
        const updatedFinishedItems = [item, ...finishedTodos];
        setProgressedTodos(updatedProgressedItems);
        setFinishedTodos(updatedFinishedItems);
      }

    //   also for done to achieved
  }

  const moveItemStraightToDone = (itemId: string) => {
    console.log('moving item straight to done');
    const updatedItem = items.find((item) => item.id === itemId);
    console.log(updatedItem);
    if (!updatedItem) {
      // throw an error?
      return;
    }
    updatedItem.status = Status.DONE;

    const updatedFreshTodos = freshTodos.filter(todo => todo.id !== itemId);
    const updatedFinishedTodos = [updatedItem, ...finishedTodos];
    setFreshTodos(updatedFreshTodos);
    setFinishedTodos(updatedFinishedTodos);
  }

  const moveItem = (itemId: string) => {
    // status updaten und zwei item-listen updaten
    console.log('moving item');
    console.log(itemId);
    const updatedItem = items.find((item) => item.id === itemId);
    console.log(updatedItem);
    if (!updatedItem) {
      // throw an error?
      return;
    }

    const oldStatus = updatedItem.status;

    switch (updatedItem.status) {
      case Status.NEW:
        updatedItem.status = Status.PROGRESS;
        break;
      case Status.PROGRESS:
        updatedItem.status = Status.DONE;
        console.log(updatedItem);
        break;
      case Status.DONE:
        updatedItem.status = Status.ACHIEVED;
        break;
      default:
        return;
    }

    // anpassen für von new zu done in einem Schritt
    updateTodoLists(oldStatus, updatedItem);

  };

  const addTodo = (newTodo: Todo) => {
    console.log('adding todo in context');
    setFreshTodos((prevItems) => [newTodo, ...prevItems]);
    setItems(prevItems => [newTodo, ...prevItems]);
    console.log(items);
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
    moveItemStraightToDone: moveItemStraightToDone,
    addingTodo: addingTodo,
    deletingTodo: deletingTodo,
    toggleAddTodo: toggleAddHandler,
    addTodo: addTodo,
    deleteTodo: deleteTodo,
    freshTodos,
    progressedTodos,
    finishedTodos,
    startDeleteHandler: startDeleteHandler,
    cancelDeleteHandler: cancelDeleteHandler,
    selectedItem: selectedItem
  };

  return (
    <TodosContext.Provider value={initalContext}>
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;
