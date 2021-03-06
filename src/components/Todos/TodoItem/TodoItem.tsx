import { useContext } from 'react';

import Button from '../../UI/Button/Button';

import { TodosContext } from '../../../store/todos-context';

import classes from './TodoItem.module.css';

const TodoItem: React.FC<{ title: string; status: string; id: string, color: string }> = (
  props
) => {
  const todosCtx = useContext(TodosContext);

  let editActions = (
    <div className={`${classes.actions} ${classes['actions-edit']}`}>
      <Button
        tipText="MOVE TO 'DOING'"
        type="button"
        action="FORWARDS-TO-DOING"
        clickHandler={todosCtx.updateTodosHandler.bind(null, 'EDIT', null, 'DOING')}
      />
      <Button
        tipText="MOVE TO 'DONE'"
        action="FORWARDS-TO-DONE"
        type="button"
        clickHandler={todosCtx.updateTodosHandler.bind(null, 'EDIT', null, 'DONE')}
      />
      <Button
        tipText="DELETE TODO"
        type="button"
        action="DELETE"
        clickHandler={todosCtx.updatingTodosHandler.bind(
          null,
          'DELETE'
        )}
      />
    </div>
  );

  if (props.status === 'DOING') {
    editActions = (
      <div className={`${classes.actions} ${classes['actions-edit']}`}>
        <Button
          tipText="MOVE TO 'TODO'"
          type="button"
          action='ONE-STEP-BACKWARDS-TO-NEW'
          clickHandler={todosCtx.updateTodosHandler.bind(null, 'EDIT', null, 'NEW')}
        />
        <Button
          tipText="MOVE TO 'DONE'"
          type="button"
          action="FORWARDS-TO-DONE"
          clickHandler={todosCtx.updateTodosHandler.bind(null, 'EDIT', null, 'DONE')}
        />
        <Button
          tipText="DELETE TODO"
          type="button"
          action="DELETE"
          clickHandler={todosCtx.updatingTodosHandler.bind(
            null,
            'DELETE'
          )}
        />
      </div>
    );
  }

  if (props.status === 'DONE') {
    editActions = (
      <div className={`${classes.actions} ${classes['actions-edit']}`}>
        <Button
          tipText="MOVE TO 'DOING'"
          type="button"
          action="BACKWARDS-TO-DOING"
          clickHandler={todosCtx.updateTodosHandler.bind(null, 'EDIT', null, 'DOING')}
        />
        <Button
          tipText="MOVE TO 'TO DO'"
          action='TWO-STEPS-BACKWARDS-TO-NEW'
          type="button"
          clickHandler={todosCtx.updateTodosHandler.bind(null, 'EDIT', null, 'NEW')}
        />
        <Button
          tipText="DELETE TODO"
          action="DELETE"
          type="button"
          clickHandler={todosCtx.updatingTodosHandler.bind(null, 'DELETE')}
        />
      </div>
    );
  }

  return (
      <div className={classes.item} id={props.id} style={{background: props.color}}>
        <h3 className={classes.item__title}>{props.title}</h3>
        {(!todosCtx.selectedItem || todosCtx.selectedItem.id !== props.id) && (
          <div className={classes.actions}>
            <Button
              tipText="EDIT TODO"
              type="button"
              action="EDIT"
              clickHandler={todosCtx.startEditingHandler.bind(null, props.id)}
            />
          </div>
        )}
        {todosCtx.selectedItem && todosCtx.selectedItem.id === props.id && (
          <div className={classes.actions}>
            <Button
              type="button"
              tipText="CANCEL EDITING"
              action="CANCEL"
              clickHandler={todosCtx.cancelEditingHandler}
            />
          </div>
        )}
        {todosCtx.selectedItem && todosCtx.selectedItem.id === props.id && editActions}
      </div>
  );
};

export default TodoItem;
