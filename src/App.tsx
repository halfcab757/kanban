import { useContext } from 'react';
import './App.css';

import Layout from './components/layout/Layout';

import Todos from './components/Todos/Todos';
import { TodosContext } from './store/todos-context';

import NewTodo from './components/Todos/NewTodo/NewTodo';
import DeleteConfirmation from './components/Todos/DeleteConfirmation/DeleteConfirmation';

const App = () => {
  const todosCtx = useContext(TodosContext);

  return (
    <div className="App">
      <Layout>
        {todosCtx.addingTodo && <NewTodo />}
        {todosCtx.deletingTodo && <DeleteConfirmation />}
          <Todos />
      </Layout>
    </div>
  );
};

export default App;
