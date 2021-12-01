import { useContext } from 'react';

import classes from './Navigation.module.css';

import { TodosContext } from '../../../store/todos-context';

const Navigation: React.FC = () => {
    const todosCtx = useContext(TodosContext);

  return (
    <div className={classes.navigation}>
      NavBar
      <button onClick={todosCtx.toggleAddTodo}>Add new todo</button>
    </div>
  );
};

export default Navigation;
