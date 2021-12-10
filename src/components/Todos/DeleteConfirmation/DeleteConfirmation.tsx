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
            tipText=""
            onEnter={() => {}}
            onLeave={() => {}}
            type="button"
            color="red"
            size="regular"
            clickHandler={todosCtx.deleteTodo.bind(
              null,
              todosCtx.selectedItem!.id
            )}
          >
            Yes, let's remove it.
          </Button>
          <Button
            tipText=""
            onEnter={() => {}}
            onLeave={() => {}}
            type="button"
            color="green"
            size="regular"
            clickHandler={todosCtx.cancelDeleteHandler}
          >
            No, let's keep it.
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmation;
