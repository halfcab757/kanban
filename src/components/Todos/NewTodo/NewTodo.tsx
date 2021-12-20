import { useContext, useRef, useEffect, useState, useMemo } from 'react';

import classes from './NewTodo.module.css';

import Modal from '../../UI/Modal/Modal';

import { TodosContext } from '../../../store/todos-context';
import Todo from '../../../models/todo';

import Button from '../../UI/Button/Button';

const NewTodo: React.FC = () => {
  const todosCtx = useContext(TodosContext);
  const todoInputRef = useRef<HTMLInputElement>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    todoInputRef!.current!.focus();
  }, []);

  const todoInputMinLength = 1;

  const validateAndTransformInputText = () => {
    const todoInputText = todoInputRef.current!.value.trim();
    if (todoInputText.length < todoInputMinLength) {
      setHasError(true);
    }

    if (todoInputText.length >= todoInputMinLength) {
      setHasError(false);
    }
    return todoInputText;
  }

  const getRandomBackgroundColor = () => {
    const randomNumber = Math.random();
    let backgroundColor = '';
    if ( randomNumber < 0.33 ) {
      backgroundColor = '#ee4fc7'; 
    }
    if (randomNumber > 0.33 && randomNumber < 0.66) {
      backgroundColor = '#c7ee4f';
    }
    if (randomNumber > 0.66 ) {
      backgroundColor = '#4FC7EE';
    }

    return backgroundColor;
  }

  const submitHandler = (event: any) => {
    event.preventDefault();

    const todoInputText = validateAndTransformInputText();
    if (!todoInputText) {
      return;
    }
    const newTodo = new Todo(todoInputText, 'NEW', formAndItemBackground);
    // todosCtx.addTodo(newTodo);
    todosCtx.updateTodosHandler('ADD', newTodo, null);
    // clear form OR better close form, maybe show a green mark for a short time
    todoInputRef.current!.value = '';
    console.log('resetting updatingTodos');
    todosCtx.updatingTodosHandler(null);
  };

  let inputCssClasses = `${classes.input} ${hasError && classes.invalid}`;
  // give Input amore transparent version of the backgroundColor
  const formAndItemBackground = useMemo(() => getRandomBackgroundColor(), []);

  let errorMessageCssClasses = `${classes.errormessage} ${hasError && classes.visible}`;

  const errorMessage = (
    <p className={errorMessageCssClasses}>Write down a new to do. Thanks!</p>
  );

  return (
    <Modal onClose={todosCtx.updatingTodosHandler.bind(null, null)} background={formAndItemBackground}>
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.controls}>
            <label htmlFor="text">LET'S ADD A NEW TODO</label>
            <input
              className={inputCssClasses}
              type="text"
              ref={todoInputRef}
              id="text"
              placeholder="e.g. Call my old friend Max"
              onBlur={validateAndTransformInputText}
              onChange={validateAndTransformInputText}
            />
          </div>
          {errorMessage}
          <div className={classes.actions}>
            <Button
              type="submit"
              action="CONFIRM"
              tipText="ADD TODO"
              clickHandler={() => {}}
            >
              ADD
            </Button>
            <Button
              type="button"
              action='CANCEL-FORM'
              tipText="CANCEL ADDING"
              // clickHandler={todosCtx.toggleAddTodo}
              clickHandler={todosCtx.updatingTodosHandler.bind(null, null)}
            >
              Cancel
            </Button>
          </div>
        </form>
    </Modal>
  );
};

export default NewTodo;
