import './App.css';

import Layout from './components/layout/Layout';

import Todo from './models/todo';
import Todos from './components/Todos/Todos';

const App = () => {

  const newTodo = new Todo('Look to the sky');
  console.log(newTodo);

  return (
    <div className="App">
      <Layout>
        <Todos />
      </Layout>
    </div>
  );
};

export default App;
