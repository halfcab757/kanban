import { useState, Fragment, useContext } from 'react';

import TodoItem from '../TodoItem/TodoItem';
import Button from '../../UI/Button/Button';
import Todo from '../../../models/todo';

import { TodosContext } from '../../../store/todos-context';

import classes from './TodoList.module.css';

const TodoList: React.FC<{
  title: string;
  items: Todo[];
  showItems: boolean;
  onShow: (listTitle: string) => void;
}> = (props) => {
  const todosCtx = useContext(TodosContext);
  const [endOfList, setEndOfList] = useState(3);

  const showMoreItemsHandler = () => {
    setEndOfList((prevEnd) => prevEnd + 3);
  };

  const showLessItemsHandler = () => {
    setEndOfList(3);
  };

  let items: Todo[] = [];

  if (props.title === 'TO DO') {
    items = props.items.filter((item) => item.status === 'NEW');
  }

  if (props.title === 'DOING') {
    items = props.items.filter((item) => item.status === 'DOING');
  }

  if (props.title === 'DONE') {
    items = props.items.filter((item) => item.status === 'DONE');
  }

  let todosList = (
    <Fragment>
      <ul className={classes.todolist__list}>
        {items.length > 0 &&
          items.slice(0, endOfList).map((item) => (
            <li className={classes.todolist__listitem} key={item.id}>
              <TodoItem
                title={item.text}
                status={item.status}
                id={item.id}
                color={item.color}
              />
            </li>
          ))}
      </ul>
    </Fragment>
  );

  const showMoreButton = (
    <div className={classes.actions}>
      <Button
        type="button"
        action="MORE"
        tipText="SHOW MORE"
        clickHandler={showMoreItemsHandler}
      />
    </div>
  );

  const showLessButton = (
    <div className={classes.actions}>
      <Button
        type="button"
        action="LESS"
        tipText="SHOW LESS"
        clickHandler={showLessItemsHandler}
      />
    </div>
  );

  const clearFinsishedTodosElement = (
    <div className={[classes.actions, classes.clear].join(' ')}>
      <Button
        type="button"
        action="CLEAR-LIST"
        tipText="CLEAR LIST"
        clickHandler={todosCtx.updatingTodosHandler.bind(null, 'CLEAR')}
      />
      {endOfList < items.length && (
              <Button
              type="button"
              action="MORE"
              tipText="SHOW MORE"
              clickHandler={showMoreItemsHandler}
            />
      )}
      {endOfList > 3 && (
              <Button
              type="button"
              action="LESS"
              tipText="SHOW LESS"
              clickHandler={showLessItemsHandler}
            />
      )}
    </div>
  );

  let todosListPlaceholder = (
    <div className={classes.placeholder}>
      <p>
        This list is currently empty.
        <br /> Add a new TODO.
      </p>
      <Button
        type="submit"
        action="CONFIRM"
        tipText="ADD TODO"
        clickHandler={todosCtx.updatingTodosHandler.bind(null, 'ADD')}
      >
        ADD
      </Button>
    </div>
  );

  if (props.title === 'DOING' || props.title === 'DONE') {
    todosListPlaceholder = (
      <div className={classes.placeholder}>
        <p>
          This list is currently empty.
          <br /> Keep working on your TODOs.
        </p>
      </div>
    );
  }

  const todosListContainer =
    props.showItems && items.length > 0 ? (
      <div className={classes.scrollable}>
        {props.showItems && items.length > 0 && todosList}
      </div>
    ) : null;

    const todolistCssClasses = `${classes.todolist} ${props.showItems && props.title === 'DONE' && props.items.length > 0 && classes.finished}`;

  return (
    <div className={todolistCssClasses}>
      <h2 className={classes.todolist__title}>{props.title}</h2>
      {!props.showItems && (
        <div className={classes.actions}>
          <Button
            type="button"
            action="MORE"
            tipText="SHOW THIS LIST"
            clickHandler={props.onShow.bind(null, props.title)}
          />
        </div>
      )}
      {todosListContainer}
      {props.showItems &&
        props.title === 'DONE' &&
        items.length > 0 &&
        clearFinsishedTodosElement}
      {props.showItems && props.title !== 'DONE' && endOfList < items.length && showMoreButton}
      {props.showItems && props.title !== 'DONE' && endOfList > 3 && showLessButton}
      {props.showItems && items.length === 0 && todosListPlaceholder}
    </div>
  );
};

export default TodoList;
