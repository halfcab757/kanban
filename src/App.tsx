import { useContext, useState } from 'react';

import { TodosContext } from './store/todos-context';

import Navigation from './components/layout/Navigation/Navigation';
import Todos from './components/Todos/Todos';
import NewTodo from './components/Todos/NewTodo/NewTodo';
import DeleteConfirmation from './components/Todos/DeleteConfirmation/DeleteConfirmation';
import About from './components/About/About';


const App = () => {
  const [showAbout, setShowAbout] = useState(false);
  const todosCtx = useContext(TodosContext);

  const showAboutHandler = () => {
    setShowAbout(true);
  }

  const hideAboutHandler = () => {
    setShowAbout(false);
  }

  return (
    <div className="App">
      <Navigation showHandler={showAboutHandler} hideHandler={hideAboutHandler} shown={showAbout}/>
        {todosCtx.addingTodo && <NewTodo />}
        {todosCtx.deletingTodo && <DeleteConfirmation type='single-item'/>}
        {todosCtx.deletingFinishedTodos && <DeleteConfirmation type='clear-items'/>}
          {!showAbout && <Todos />}
          {showAbout && <About />}
    </div>
  );
};

export default App;
