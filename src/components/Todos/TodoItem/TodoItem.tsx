import { useContext } from 'react';

import classes from './TodoItem.module.css';
import Button from '../../UI/Button/Button';
import { TodosContext } from '../../../store/todos-context';


const TodoItem: React.FC<{ title: string; status: string }> = (props) => {
  const todosCtx = useContext(TodosContext);

  let actions = (
    <div className={classes.actions}>
      <Button type='button' color='green' clickHandler={todosCtx.moveItem}>Set to progress</Button>
      <Button type='button' color='red' clickHandler={() => console.log('click')}>Delete</Button>
    </div>
  );

  if (props.status === 'progress') {
    actions = (
      <div className={classes.actions}>
      <Button type='button' color='green' clickHandler={todosCtx.moveItem}>Set to done</Button>
      <Button type='button' color='red' clickHandler={() => console.log('click')}>Delete</Button>
      </div>
    );
  }

  if (props.status === 'done') {
    actions = (
      <div className={classes.actions}>
              <Button type='button' color='green' clickHandler={todosCtx.moveItem}>Move to achievement list</Button>
      </div>
    );
  }

  return (
    <li>
      <div className={classes.item}>
        <h3>{props.title}</h3>
        {actions}
      </div>
    </li>
  );
};

export default TodoItem;
