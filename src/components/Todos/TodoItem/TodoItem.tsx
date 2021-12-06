import { Fragment, useState, useContext } from 'react';

import classes from './TodoItem.module.css';
import Button from '../../UI/Button/Button';
import { TodosContext } from '../../../store/todos-context';

const TodoItem: React.FC<{ title: string; status: string; id: string }> = (
  props
) => {
  const [isEditing, setIsEditing] = useState(false);
  const [doneText, setDoneText] = useState('DONE?');  // const [isDeleting, setIsDeleting] = useState(false);
  const todosCtx = useContext(TodosContext);

  const toggleEditHandler = () => {
    setIsEditing((prevState) => {
      return !prevState;
    });
  };

  // const startDeleteHandler = () => {
  //   setIsDeleting(true);
  // }

  // const cancelDeleteHandler = () => {
  //   setIsDeleting(false);
  // }

  const toggleDoneText = () => {
    console.log('toggling text');
    if (doneText === 'DONE?') {
      setDoneText('DONE!');
    }

    if (doneText === 'DONE!') {
      setDoneText('DONE?');
    }
  }

  let actions = (
    <Fragment>
      <Button type="button" color="green" clickHandler={todosCtx.moveItem.bind(null, props.id)}>
        MOVE TO DOING
      </Button>
      <Button type="button" color="green" clickHandler={todosCtx.moveItemStraightToDone.bind(null, props.id)}>
        MOVE TO DONE
      </Button>
      {/* <button onMouseOver={toggleDoneText} onMouseLeave={toggleDoneText}>{doneText}</button> */}
      <Button
        type="button"
        color="red"
        // clickHandler={todosCtx.deleteTodo.bind(null, props.id)}
        clickHandler={todosCtx.startDeleteHandler.bind(null, props.id, props.title)}
      >
        DELETE TO DO
      </Button>
      <Button type="button" color="red" clickHandler={toggleEditHandler}>
        CANCEL EDITING
      </Button>
    </Fragment>
  );

  if (props.status === 'PROGRESS') {
    actions = (
      <Fragment>
        <Button type="button" color="green" clickHandler={todosCtx.moveItem.bind(null, props.id)}>
          DONE?
        </Button>
        <Button
          type="button"
          color="red"
          clickHandler={todosCtx.deleteTodo.bind(null, props.id)}
        >
          DELETE TO DO
        </Button>
        <Button type="button" color="red" clickHandler={toggleEditHandler}>
          CANCEL EDITING
        </Button>
      </Fragment>
    );
  }

  if (props.status === 'DONE') {
    actions = (
      <Fragment>
        <Button type="button" color="green" clickHandler={todosCtx.moveItem.bind(null, props.id)}>
          Move to achievement list
        </Button>
        <Button type="button" color="red" clickHandler={toggleEditHandler}>
          Cancel
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
