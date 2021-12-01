import { Fragment, useContext } from 'react';

import classes from './TodoItem.module.css';
import Button from '../../UI/Button/Button';
import { TodosContext } from '../../../store/todos-context';

const TodoItem: React.FC<{ title: string; status: string; id: string; }> = (props) => {
  const todosCtx = useContext(TodosContext);

  let actions = (
    <Fragment>
      <Button type="button" color="green" clickHandler={todosCtx.moveItem}>
        Set to progress
      </Button>
      <Button
        type="button"
        color="red"
        clickHandler={() => console.log('click')}
      >
        Delete
      </Button>
    </Fragment>
  );

  if (props.status === 'progress') {
    actions = (
      <Fragment>
        <Button type="button" color="green" clickHandler={todosCtx.moveItem}>
          Set to done
        </Button>
        <Button
          type="button"
          color="red"
          clickHandler={() => console.log('click')}
        >
          Delete
        </Button>
      </Fragment>
    );
  }

  if (props.status === 'done') {
    actions = (
      <Fragment>
        <Button type="button" color="green" clickHandler={todosCtx.moveItem}>
          Move to achievement list
        </Button>
      </Fragment>
    );
  }

  return (
    <li>
      <div className={classes.item} id={props.id}>
        <h3>{props.title}</h3>
        {actions}
      </div>
    </li>
  );
};

export default TodoItem;
