import { useContext, useState } from 'react';

import Navigation from './components/layout/Navigation/Navigation';
import Todos from './components/Todos/Todos';
import NewTodo from './components/Todos/NewTodo/NewTodo';
import DeleteConfirmation from './components/Todos/DeleteConfirmation/DeleteConfirmation';
import About from './components/About/About';
import Welcome from './components/Welcome/Welcome';

import { TodosContext } from './store/todos-context';

import classes from './App.module.css';


const App = () => {
  const [showAbout, setShowAbout] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const todosCtx = useContext(TodosContext);

  const showAboutHandler = () => {
    setShowAbout(true);
  }

  const hideAboutHandler = () => {
    setShowAbout(false);
  }

  const closeWelcomeHandler = () => {
    setShowWelcome(false);
  }

  return (
    <div className={classes.app}>
      <Navigation showHandler={showAboutHandler} hideHandler={hideAboutHandler} shown={showAbout}/>
        {todosCtx.isUpdatingTodos && todosCtx.isUpdatingTodos === 'ADD' && <NewTodo />}
        {todosCtx.isUpdatingTodos && todosCtx.isUpdatingTodos === 'DELETE' && <DeleteConfirmation type='single-item'/>}
        {todosCtx.isUpdatingTodos && todosCtx.isUpdatingTodos === 'CLEAR' && <DeleteConfirmation type='clear-items'/>}
          {!showAbout && <Todos />}
          {showAbout && <About />}
          {showWelcome && <Welcome onClose={closeWelcomeHandler}/>}
    </div>
  );
};

export default App;
