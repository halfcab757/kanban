// import { useContext } from 'react';

import classes from './Navigation.module.css';

// import { TodosContext } from '../../../store/todos-context';

// import Button from '../../UI/Button/Button';

const Navigation: React.FC = () => {
  // const todosCtx = useContext(TodosContext);

  return (
    <div className={classes.navigation}>
      <div>
        <span>GET THINGS DONE</span>
        {/* <button onClick={todosCtx.toggleAddTodo}>ADD NEW TO DO</button> */}
        {/* no clean code with the inline style in the next div */}
        <div>
          LOGIN
        </div>
      </div>
    </div>
  );
};

export default Navigation;
