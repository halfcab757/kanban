import { useContext } from 'react';

import classes from './Navigation.module.css';

import { TodosContext } from '../../../store/todos-context';

const Navigation: React.FC = () => {
    const todosCtx = useContext(TodosContext);

  return (
    <div className={classes.navigation}>
      <div>
        <span>LOGO + NAME</span>
        <button onClick={todosCtx.toggleAddTodo}>ADD NEW TO DO</button>
      </div>
    </div>
  );
};

export default Navigation;
