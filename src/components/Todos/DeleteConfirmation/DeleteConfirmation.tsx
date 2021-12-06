import { useContext } from 'react';

import Button from '../../UI/Button/Button';
import Modal from '../../UI/Modal/Modal';

import { TodosContext } from '../../../store/todos-context';

const DeleteConfirmation: React.FC = () => {
const todosCtx = useContext(TodosContext);

  return (
    <Modal onClose={todosCtx.cancelDeleteHandler}>
      <div>
        <div>
            {todosCtx.selectedItem?.text}
        </div>
        Are you sure?
        <div>
          <Button
            type="button"
            color="red"
            size='regular'
            clickHandler={todosCtx.deleteTodo.bind(null, todosCtx.selectedItem!.id)}
          >
            Yes, let's remove it.
          </Button>
          <Button
            type="button"
            color="green"
            size='regular'
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
