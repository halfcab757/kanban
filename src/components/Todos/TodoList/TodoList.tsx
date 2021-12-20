import { useState, Fragment, useContext } from 'react';

import classes from './TodoList.module.css';
import Todo from '../../../models/todo';

import TodoItem from '../TodoItem/TodoItem';
// import DeleteConfirmation from '../DeleteConfirmation/DeleteConfirmation';
import Button from '../../UI/Button/Button';
import { TodosContext } from '../../../store/todos-context';

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

  const clearFinsishedTodosElement = (
    <div className={classes.actions}>
      <Button
        type="button"
        action="CLEAR-LIST"
        tipText="DELETE ALL DONE TO DOS"
        // clickHandler={todosCtx.toggleClearingTodos}
        clickHandler={todosCtx.updatingTodosHandler.bind(null, 'CLEAR')}
      />
    </div>
  );

  let itemsList = (
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
        tipText="SHOW MORE TO DOS"
        clickHandler={showMoreItemsHandler}
      />
    </div>
  );

  const ShowLessButton = (
    <div className={classes.actions}>
      <Button
        type="button"
        action="LESS"
        tipText="SHOW FEWER TO DOS"
        clickHandler={showLessItemsHandler}
      />
    </div>
  );

  let itemListPlaceholder = (
    <div className={classes.placeholder}>
      <p>
        THIS LIST IS EMPTY RIGHT NOW.
        <br /> ADD A NEW TODO
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
    itemListPlaceholder = (
      <div className={classes.placeholder}>
        <p>
          THIS LIST IS EMPTY RIGHT NOW.
          <br /> KEEP WORKING ON YOUR TODOS
        </p>
      </div>
    );
  }

  const listCssClasses = `${classes.scrollable} ${
    (!props.showItems || items.length === 0) && classes.notvisible
  }`;

  return (
    <div className={classes.todolist}>
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
      <div className={listCssClasses}>
        {/* maybe find a solution with whole list scolling */}
        {props.showItems && items.length > 0 && itemsList}
      </div>

      {props.title === 'DONE' && items.length > 0 && clearFinsishedTodosElement}
      {props.showItems && endOfList < items.length && showMoreButton}
      {props.showItems && endOfList > 3 && ShowLessButton}
      {props.showItems && items.length === 0 && itemListPlaceholder}
      {/* {isClearingTodos && <DeleteConfirmation type='clear-items'/>} */}
    </div>
  );
};

export default TodoList;
