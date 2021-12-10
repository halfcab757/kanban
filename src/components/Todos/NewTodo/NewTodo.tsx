import { useContext, useRef, useEffect } from 'react';

import classes from './NewTodo.module.css';

import Modal from '../../UI/Modal/Modal';

import { TodosContext } from '../../../store/todos-context';
import Todo from '../../../models/todo';

import Button from '../../UI/Button/Button';

const NewTodo: React.FC = () => {
  const todosCtx = useContext(TodosContext);
  const todoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    todoInputRef!.current!.focus();
  }, []);

  const submitHandler = (event: any) => {
    event.preventDefault();
    const todoInput = todoInputRef.current!.value.trim();
    console.log('submit handler fires');
    if (todoInput.length < 3) {
      // throw error;
      console.log('input is too short');
      return;
    }
    const newTodo = new Todo(todoInput, 'NEW');
    // via ctx newTodo wirklich adden
    todosCtx.addTodo(newTodo);
    // clear form OR better close form, maybe show a green mark for a short time
    todoInputRef.current!.value = '';
  };

  return (
    <Modal onClose={todosCtx.toggleAddTodo}>
      <h3 className={classes.title}>Let's add a new todo</h3>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.controls}>
          <label htmlFor="text">New Todo</label>
          <input
            type="text"
            ref={todoInputRef}
            minLength={3}
            required
            id="text"
            placeholder="e.g. Call my old friend Max"
          />
        </div>
        <div className={classes.actions}>
          <Button
            type='submit'
            action='ADD'
            tipText='ADD TODO'
            clickHandler={() => {}}  
          >
            ADD
          </Button>
          <Button
            type='button'
            action='CANCEL'
            tipText='CANCEL ADDING'
            clickHandler={todosCtx.toggleAddTodo}  
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default NewTodo;
