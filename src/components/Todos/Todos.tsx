import { useContext, useState, useEffect } from 'react';

import TodosContainer from './TodosContainer/TodosContainer';
import TodoList from './TodoList/TodoList';

import { TodosContext } from '../../store/todos-context';

const Todos: React.FC = () => {
  const todosCtx = useContext(TodosContext);
  const [showFreshTodos, setShowFreshTodos] = useState(true);
  const [showProgressedTodos, setShowProgressedTodos] = useState(true);
  const [showFinishedTodos, setShowFinishedTodos] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const changeShownList = (listTitle: string) => {
    // useReducer might really be better
    console.log('changing shown list in todos.tsx');
    if (listTitle === 'TO DO') {
      setShowFreshTodos(true);
      setShowProgressedTodos(false);
      setShowFinishedTodos(false);
    }

    if (listTitle === 'DOING') {
      setShowFreshTodos(false);
      setShowProgressedTodos(true);
      setShowFinishedTodos(false);
    }

    if (listTitle === 'DONE') {
      setShowFreshTodos(false);
      setShowProgressedTodos(false);
      setShowFinishedTodos(true);
    }
  }

  useEffect(() => {
    console.log('useeffect in todos');
    let timer: any;
    const handleResize = () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          console.log('actually updating width state');
        console.log(window.innerWidth);
        setWindowWidth(window.innerWidth);
      }, 100);
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // oder gerne besser mit useReducer, weil states von einem anderen state abhängen
    if (windowWidth < 500) {
      setShowProgressedTodos(false);
      setShowFinishedTodos(false);
    }

    if (windowWidth > 500) {
      setShowProgressedTodos(true);
      setShowFinishedTodos(true);
    }
  }, [windowWidth]);

  // useEffect(() => {
  //     const timer = setTimeout(() => {
  //         setWindowWidth(window.innerWidth);
  //     }, 100);

  //     return clearTimeout(timer);
  // }, [window.innerWidth]);

  return (
    <TodosContainer>
      <TodoList
        title="TO DO"
        items={todosCtx.freshTodos}
        showItems={showFreshTodos}
        onShow={changeShownList}
      />
      <TodoList
        title="DOING"
        items={todosCtx.progressedTodos}
        showItems={showProgressedTodos}
        onShow={changeShownList}
      />
      <TodoList
        title="DONE"
        items={todosCtx.finishedTodos}
        showItems={showFinishedTodos}
        onShow={changeShownList}
      />
    </TodosContainer>
  );
};

export default Todos;
