import { Fragment, useContext } from 'react';

import Button from '../../UI/Button/Button';
import Modal from '../../UI/Modal/Modal';

import { TodosContext } from '../../../store/todos-context';

import classes from './DeleteConfirmation.module.css';

const DeleteConfirmation: React.FC<{ type: 'single-item' | 'clear-items' }> = (
  props
) => {
  const todosCtx = useContext(TodosContext);

  let confirmationContent: any;

  if (props.type === 'single-item') {
    confirmationContent = (
      <Fragment>
        <div className={classes.confirmation__item}>{todosCtx.selectedItem?.text}</div>
        <h3 className={classes.confirmation__title} >DELETE THIS TO DO?</h3>
        <div className={classes.confirmation__actions}>
          <Button
            tipText="YES, DELETE IT"
            type="button"
            action="CONFIRM"
            // clickHandler={todosCtx.deleteTodo.bind(
            //   null,
            //   todosCtx.selectedItem!.id
            // )}
            clickHandler={todosCtx.updateTodosHandler.bind(null, 'DELETE', null, null)}
          />
          <Button
            tipText="NO, I WILL KEEP IT"
            action="CANCEL-FORM"
            type="button"
            // clickHandler={todosCtx.cancelEditingHandler}
            clickHandler={todosCtx.updatingTodosHandler.bind(null, null)}
          />
        </div>
      </Fragment>
    );
  }

  if (props.type === 'clear-items') {
    confirmationContent = (
      <Fragment>
        <h3 className={classes.confirmation__title}>DELETE ALL FINISHED TO DOS?</h3>
        <div className={classes.confirmation__actions}>
          <Button
            tipText="YES, DELETE THEM"
            type="button"
            action="CONFIRM"
            // clickHandler={todosCtx.deleteDoneTodos}
            clickHandler={todosCtx.updateTodosHandler.bind(null, 'CLEAR', null, null)}
          />
          <Button
            tipText="NO, I WILL KEEP THEM"
            action="CANCEL-FORM"
            type="button"
            // clickHandler={todosCtx.toggleClearingTodos}
            clickHandler={todosCtx.updatingTodosHandler.bind(null, null)}
          />
        </div>
      </Fragment>
    );
  }

  return (
    <Modal
      onClose={todosCtx.cancelEditingHandler}
      background={todosCtx.selectedItem && todosCtx.selectedItem.color}
    >
      {confirmationContent}
    </Modal>
  );
};

export default DeleteConfirmation;
