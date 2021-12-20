import { useContext, useState } from 'react';

import { TodosContext } from './store/todos-context';

import Navigation from './components/layout/Navigation/Navigation';
import Todos from './components/Todos/Todos';
import NewTodo from './components/Todos/NewTodo/NewTodo';
import DeleteConfirmation from './components/Todos/DeleteConfirmation/DeleteConfirmation';
import About from './components/About/About';
import Welcome from './components/Welcome/Welcome';


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
    <div className="App">
      <Navigation showHandler={showAboutHandler} hideHandler={hideAboutHandler} shown={showAbout}/>
        {/* {todosCtx.addingTodo && <NewTodo />} */}
        {todosCtx.isUpdatingTodos && todosCtx.isUpdatingTodos === 'ADD' && <NewTodo />}
        {/* {todosCtx.deletingTodo && <DeleteConfirmation type='single-item'/>} */}
        {todosCtx.isUpdatingTodos && todosCtx.isUpdatingTodos === 'DELETE' && <DeleteConfirmation type='single-item'/>}
        {/* {todosCtx.deletingFinishedTodos && <DeleteConfirmation type='clear-items'/>} */}
        {todosCtx.isUpdatingTodos && todosCtx.isUpdatingTodos === 'CLEAR' && <DeleteConfirmation type='clear-items'/>}
          {!showAbout && <Todos />}
          {showAbout && <About />}
          {showWelcome && <Welcome onClose={closeWelcomeHandler}/>}
    </div>
  );
};

export default App;
