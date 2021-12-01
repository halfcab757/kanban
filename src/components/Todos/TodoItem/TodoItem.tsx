import { Fragment, useState, useContext } from 'react';

import classes from './TodoItem.module.css';
import Button from '../../UI/Button/Button';
import { TodosContext } from '../../../store/todos-context';

const TodoItem: React.FC<{ title: string; status: string; id: string }> = (
  props
) => {
  const [isEditing, setIsEditing] = useState(false);
  const todosCtx = useContext(TodosContext);

  const toggleEditHandler = () => {
    setIsEditing((prevState) => {
      return !prevState;
    });
  };

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
      <Button type="button" color="red" clickHandler={toggleEditHandler}>
        Close
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
        <Button type="button" color="red" clickHandler={toggleEditHandler}>
          Close
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
        <Button type="button" color="red" clickHandler={toggleEditHandler}>
          Close
        </Button>
      </Fragment>
    );
  }

  return (
    <li>
      <div className={classes.item} id={props.id}>
        <h3>{props.title}</h3>
        {!isEditing && (
          <Button
            type="button"
            color="green"
            clickHandler={toggleEditHandler}
          >Edit</Button>
        )}
        {isEditing && actions}
      </div>
    </li>
  );
};

export default TodoItem;
