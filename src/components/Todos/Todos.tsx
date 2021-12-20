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
    let showFreshTodos = false;
    let showProgressedTodos = false;
    let showFinishedTodos = false;

    if (listTitle === 'TO DO') {
      showFreshTodos = true;
    }

    if (listTitle === 'DOING') {
      showProgressedTodos = true;
    }

    if (listTitle === 'DONE') {
      showFinishedTodos = true;
    }

    setShowFreshTodos(showFreshTodos);
    setShowProgressedTodos(showProgressedTodos);
    setShowFinishedTodos(showFinishedTodos);
  };

  useEffect(() => {
    let timer: any;
    const handleResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, 100);
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (
      windowWidth < 800 &&
      showFreshTodos &&
      showProgressedTodos &&
      showFinishedTodos
    ) {
      setShowFreshTodos(true);
      setShowProgressedTodos(false);
      setShowFinishedTodos(false);
    }

    if (windowWidth > 800) {
      setShowFreshTodos(true);
      setShowProgressedTodos(true);
      setShowFinishedTodos(true);
    }
  }, [windowWidth, showFreshTodos, showProgressedTodos, showFinishedTodos]);

  return (
    <Fragment>
      <div className={classes.buttoncontainer}>
        <Button
          type="button"
          action="START-TO-ADD"
          tipText="ADD TODO"
          // clickHandler={todosCtx.toggleAddTodo}
          clickHandler={todosCtx.updatingTodosHandler.bind(null, 'ADD')}
        >
          ADD
        </Button>
      </div>
      <TodosContainer>
        <TodoList
          title="TO DO"
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
