import './App.css';

import Layout from './components/layout/Layout';

import Todo from './models/todo';
import Todos from './components/Todos/Todos';
import TodosContextProvider from './store/todos-context';
// import Modal from './components/UI/Modal/Modal';

const App = () => {
  const newTodo = new Todo('Look to the sky');
  console.log(newTodo);

  return (
    <div className="App">
      <Layout>
        {/* <Modal>CHILDREN</Modal> */}
        <TodosContextProvider>
          <Todos />
        </TodosContextProvider>
      </Layout>
    </div>
  );
};

export default App;
