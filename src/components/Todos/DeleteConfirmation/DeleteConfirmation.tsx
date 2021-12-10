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
        <h3>Delete this todo?</h3>
        <div className={classes.item}>{todosCtx.selectedItem?.text}</div>
        
        <div className={classes.actions}>
          <Button
            tipText='DELETE TO DO'
            type='button'
            action='DELETE'
            clickHandler={todosCtx.deleteTodo.bind(
              null,
              todosCtx.selectedItem!.id
            )}
          />
          <Button
            tipText='CANCEL AND KEEP TO DO'
            action='CANCEL'
            type="button"
            clickHandler={todosCtx.cancelDeleteHandler}
          />
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmation;
