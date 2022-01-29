import { useContext, useRef, useEffect, useState, useMemo } from 'react';

import Modal from '../../UI/Modal/Modal';
import Button from '../../UI/Button/Button';
import Todo from '../../../models/todo';

import { TodosContext } from '../../../store/todos-context';

import classes from './NewTodo.module.css';

const NewTodo: React.FC = () => {
  const todosCtx = useContext(TodosContext);
  const todoInputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState('Please write down a todo.');
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    todoInputRef!.current!.focus();
  }, []);

  const todoInputMinLength = 1;
  const todoInputMaxLength = 20;

  const validateAndTransformInputText = () => {
    const todoInputText = todoInputRef.current!.value.trim();
    if (todoInputText.length < todoInputMinLength) {
      setHasError(true);
      return '';
    }

    if (todoInputText.length > todoInputMaxLength) {
      setErrorMessage('Please describe your TODO shorter.');
      setHasError(true);
      return '';
    }
    setHasError(false);
    return todoInputText;
  };

  const getRandomBackgroundColor = () => {
    const randomNumber = Math.random();
    let backgroundColor = '';
    if (randomNumber < 0.33) {
      backgroundColor = '#ee4fc7';
    }
    if (randomNumber > 0.33 && randomNumber < 0.66) {
      backgroundColor = '#c7ee4f';
    }
    if (randomNumber > 0.66) {
      backgroundColor = '#4FC7EE';
    }

    return backgroundColor;
  };

  const formAndItemBackground = useMemo(() => getRandomBackgroundColor(), []);

  const createAndStoreNewTodo = (todoText: string) => {
    const newTodo = new Todo(todoText, 'NEW', formAndItemBackground);
    todosCtx.updateTodosHandler('ADD', newTodo, null);
    todosCtx.updatingTodosHandler(null);
  };

  const submitHandler = (event: any) => {
    event.preventDefault();

    const todoInputText = validateAndTransformInputText();
    if (!todoInputText) {
      return;
    }

    createAndStoreNewTodo(todoInputText);
    todoInputRef.current!.value = '';
  };

  let inputCssClasses = `${classes.input} ${hasError && classes.invalid}`;
  
  let errorMessageCssClasses = `${classes['error-message']} ${
    hasError && classes.visible
  }`;

  const errorMessageElement = (
    <p className={errorMessageCssClasses}>{errorMessage}</p>
  );

  return (
    <Modal
      onClose={todosCtx.updatingTodosHandler.bind(null, null)}
      background={formAndItemBackground}
    >
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.form__controls}>
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
        {errorMessageElement}
        <div className={classes.form__actions}>
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
            action="CANCEL-FORM"
            tipText="CANCEL ADDING"
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
