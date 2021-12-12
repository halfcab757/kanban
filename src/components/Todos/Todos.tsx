import { useContext, useState, useEffect, Fragment } from 'react';

import TodosContainer from './TodosContainer/TodosContainer';
import TodoList from './TodoList/TodoList';
import Button from '../UI/Button/Button';

import { TodosContext } from '../../store/todos-context';

import classes from './Todos.module.css';

const Todos: React.FC = () => {
  const todosCtx = useContext(TodosContext);
  const [showFreshTodos, setShowFreshTodos] = useState(true);
  const [showProgressedTodos, setShowProgressedTodos] = useState(true);
  const [showFinishedTodos, setShowFinishedTodos] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const changeShownList = (listTitle: string) => {
    if (listTitle === 'TO DO') {
      setShowFreshTodos(true);
      setShowProgressedTodos(false);
      setShowFinishedTodos(false);
    }

    if (listTitle === 'DOING') {
      console.log('show doing');
      setShowFreshTodos(false);
      setShowProgressedTodos(true);
      setShowFinishedTodos(false);
    }

    if (listTitle === 'DONE') {
      setShowFreshTodos(false);
      setShowProgressedTodos(false);
      setShowFinishedTodos(true);
    }
  };

  useEffect(() => {
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
    if (
      windowWidth < 700 &&
      showFreshTodos &&
      showProgressedTodos &&
      showFinishedTodos
    ) {
      setShowFreshTodos(true);
      setShowProgressedTodos(false);
      setShowFinishedTodos(false);
    }

    if (windowWidth > 700) {
      setShowFreshTodos(true);
      setShowProgressedTodos(true);
      setShowFinishedTodos(true);
    }
  }, [windowWidth]);

  return (
    <Fragment>
      <div className={classes.buttoncontainer}>
        <Button
          type="button"
          action="START-TO-ADD"
          tipText="ADD TODO"
          clickHandler={todosCtx.toggleAddTodo}
        >
          ADD
        </Button>
      </div>
      <TodosContainer>
        <TodoList
          title="TO DO"
          // items={todosCtx.freshTodos}
          items={todosCtx.items}
          showItems={showFreshTodos}
          onShow={changeShownList}
        />
        <TodoList
          title="DOING"
          items={todosCtx.items}
          showItems={showProgressedTodos}
          onShow={changeShownList}
        />
        <TodoList
          title="DONE"
          items={todosCtx.items}
          showItems={showFinishedTodos}
          onShow={changeShownList}
        />
      </TodosContainer>
    </Fragment>
  );
};

export default Todos;
