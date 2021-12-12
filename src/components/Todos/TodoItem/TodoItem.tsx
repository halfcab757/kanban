import { useState, useContext } from 'react';

import classes from './TodoItem.module.css';
import Button from '../../UI/Button/Button';

import { TodosContext } from '../../../store/todos-context';

const TodoItem: React.FC<{ title: string; status: string; id: string, color: string }> = (
  props
) => {
  const [isEditing, setIsEditing] = useState(false);
  const [doneText, setDoneText] = useState('DONE?');
  const todosCtx = useContext(TodosContext);

  const toggleEditHandler = () => {
    setIsEditing((prevState) => {
      return !prevState;
    });
  };

  const toggleDoneText = () => {
    console.log('toggling text');
    if (doneText === 'DONE?') {
      setDoneText('DONE!');
    }

    if (doneText === 'DONE!') {
      setDoneText('DONE?');
    }
  };

  let editActions = (
    <div className={classes.editactions}>
      <Button
        tipText="MOVE TO DOING"
        type="button"
        action="FORWARDS-TO-DOING"
        clickHandler={todosCtx.moveItem.bind(null, props.id, 'DOING')}
      />
      <Button
        tipText="MOVE TO DONE"
        action="FORWARDS-TO-DONE"
        type="button"
        clickHandler={todosCtx.moveItem.bind(null, props.id, 'DONE')}
      />
      {/* <button onMouseOver={toggleDoneText} onMouseLeave={toggleDoneText}>{doneText}</button> */}
      <Button
        tipText="DELETE THIS TO DO"
        type="button"
        action="DELETE"
        // clickHandler={todosCtx.deleteTodo.bind(null, props.id)}
        clickHandler={todosCtx.startDeleteHandler.bind(
          null,
          props.id,
          props.title
        )}
      />
    </div>
  );

  if (props.status === 'DOING') {
    editActions = (
      <div className={classes.editactions}>
        <Button
          tipText="MOVE BACK TO TO DO"
          type="button"
          action='ONE-STEP-BACKWARDS-TO-NEW'
          clickHandler={todosCtx.moveItem.bind(null, props.id, 'NEW')}
        />
        <Button
          tipText="MOVE TO DONE"
          type="button"
          action="FORWARDS-TO-DONE"
          clickHandler={todosCtx.moveItem.bind(null, props.id, 'DONE')}
        />
        <Button
          tipText="DELETE TO DO"
          type="button"
          action="DELETE"
          clickHandler={todosCtx.startDeleteHandler.bind(
            null,
            props.id,
            props.title
          )}
        />
      </div>
    );
  }

  if (props.status === 'DONE') {
    editActions = (
      <div className={classes.editactions}>
        <Button
          tipText="MOVE BACK TO DOING"
          type="button"
          action="BACKWARDS-TO-DOING"
          clickHandler={todosCtx.moveItem.bind(null, props.id, 'DOING')}
        />
        <Button
          tipText="MOVE BACK TO TO DO"
          action='TWO-STEPS-BACKWARDS-TO-NEW'
          type="button"
          clickHandler={todosCtx.moveItem.bind(null, props.id, 'NEW')}
        />
        <Button
          tipText="DELETE TO DO"
          action="DELETE"
          type="button"
          // clickHandler={todosCtx.deleteTodo.bind(null, props.id)}
          clickHandler={todosCtx.startDeleteHandler.bind(
            null,
            props.id,
            props.title
          )}
        />
      </div>
    );
  }

  return (
    <li>
      <div className={classes.item} id={props.id} style={{background: props.color}}>
        <h3>{props.title}</h3>
        {!isEditing && (
          <div className={classes.actions}>
            <Button
              tipText="EDIT THIS TO DO"
              type="button"
              action="EDIT"
              clickHandler={toggleEditHandler}
            />
          </div>
        )}

        {/* show tip like on asana */}
        {isEditing && (
          <div className={classes.actions}>
            <Button
              type="button"
              tipText="CANCEL EDITING"
              action="CANCEL"
              clickHandler={toggleEditHandler}
            />
          </div>
        )}
        {isEditing && editActions}
      </div>
    </li>
  );
};

export default TodoItem;
