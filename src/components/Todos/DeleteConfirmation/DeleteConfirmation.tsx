import { useContext } from 'react';

import Button from '../../UI/Button/Button';
import Modal from '../../UI/Modal/Modal';

import { TodosContext } from '../../../store/todos-context';

import classes from './DeleteConfirmation.module.css';

const DeleteConfirmation: React.FC = () => {
  const todosCtx = useContext(TodosContext);

  return (
    <Modal onClose={todosCtx.cancelDeleteHandler}>
      <div className={classes.confirmation}>
        <div className={classes.item}>{todosCtx.selectedItem?.text}</div>
        <h3>DELETE THIS TO DO?</h3>
        <div className={classes.actions}>
          <Button
            tipText='YES, DELETE IT'
            type='button'
            action='CONFIRM'
            clickHandler={todosCtx.deleteTodo.bind(
              null,
              todosCtx.selectedItem!.id
            )}
          />
          <Button
            tipText='NO, I WILL KEEP IT'
            action='CANCEL-FORM'
            type="button"
            clickHandler={todosCtx.cancelDeleteHandler}
          />
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmation;
