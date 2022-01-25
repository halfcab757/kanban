import React, { useContext, useState, Suspense } from 'react';

import Navigation from './components/layout/Navigation/Navigation';
import Todos from './components/Todos/Todos';
import Welcome from './components/Welcome/Welcome';

import { TodosContext } from './store/todos-context';

import classes from './App.module.css';

const NewTodo = React.lazy(() => import('./components/Todos/NewTodo/NewTodo'));
const DeleteConfirmation = React.lazy(
  () => import('./components/Todos/DeleteConfirmation/DeleteConfirmation')
);
const About = React.lazy(() => import('./components/About/About'));

const App = () => {
  const [showAbout, setShowAbout] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const todosCtx = useContext(TodosContext);

  const showAboutHandler = () => {
    setShowAbout(true);
  };

  const hideAboutHandler = () => {
    setShowAbout(false);
  };

  const closeWelcomeHandler = () => {
    setShowWelcome(false);
  };

  return (
    <div className={classes.app}>
      <Navigation
        showHandler={showAboutHandler}
        hideHandler={hideAboutHandler}
        shown={showAbout}
      />
      <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
        {todosCtx.isUpdatingTodos && todosCtx.isUpdatingTodos === 'ADD' && (
          <NewTodo />
        )}
        {todosCtx.isUpdatingTodos && todosCtx.isUpdatingTodos === 'DELETE' && (
          <DeleteConfirmation type="single-item" />
        )}
        {todosCtx.isUpdatingTodos && todosCtx.isUpdatingTodos === 'CLEAR' && (
          <DeleteConfirmation type="clear-items" />
        )}
        {!showAbout && <Todos />}
        {showAbout && <About />}
      </Suspense>
      {showWelcome && <Welcome onClose={closeWelcomeHandler} />}
    </div>
  );
};

export default App;
