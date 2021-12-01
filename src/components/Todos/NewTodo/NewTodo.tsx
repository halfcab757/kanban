import { useContext } from 'react';

import classes from './NewTodo.module.css';

import Modal from '../../UI/Modal/Modal';

import { TodosContext } from '../../../store/todos-context';

const NewTodo: React.FC = () => {
  const todosCtx = useContext(TodosContext);

  return (
    <Modal onClose={todosCtx.toggleAddTodo}>
      <form className={classes.form}>
        <div className={classes.controls}>
          <label htmlFor="text">New Todo</label>
          <input
            type="text"
            minLength={3}
            id="text"
            placeholder="e.g. Call my old friend Max"
          />
        </div>
        <div className={classes.actions}>
          <button>Save new todo</button>
          <button type="button" onClick={todosCtx.toggleAddTodo}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default NewTodo;
