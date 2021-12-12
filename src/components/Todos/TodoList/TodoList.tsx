import { useState, Fragment, useContext } from 'react';

import classes from './TodoList.module.css';
import Todo from '../../../models/todo';

import TodoItem from '../TodoItem/TodoItem';
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

  let itemsList = (
    <Fragment>
      <ul>
        {items.length > 0 &&
          items
            .slice(0, endOfList)
            .map((item) => (
              <TodoItem
                title={item.text}
                status={item.status}
                key={item.id}
                id={item.id}
                color={item.color}
              />
            ))}
      </ul>
      {items.length === 0 && (
        <p className={classes.notodos}>NO TO DOS IN THIS LIST</p>
      )}
      {endOfList < items.length && (
        <div className={classes.actions}>
          <Button
            type="button"
            action="MORE"
            tipText="SHOW MORE TO DOS"
            clickHandler={showMoreItemsHandler}
          />
        </div>
      )}
      {endOfList > 3 && (
        <div className={classes.actions}>
          <Button
            type="button"
            action="LESS"
            tipText="SHOW FEWER TO DOS"
            clickHandler={showLessItemsHandler}
          />
        </div>
      )}
      {props.title === 'DONE' && items.length > 0 && (
        <div className={classes.actions}>
          <Button
            type="button"
            action="DELETE"
            tipText="DELETE ALL DONE TO DOS"
            clickHandler={todosCtx.deleteDoneTodos}
          />
        </div>
      )}
    </Fragment>
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
        clickHandler={todosCtx.toggleAddTodo}
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

  let title = <h2>{props.title}</h2>;

  return (
    <div className={classes.todolist}>
      {title}
      {/* {props.title === 'TO DO' && addButton} */}
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
      {props.showItems && items.length > 0 && itemsList}
      {props.showItems && items.length === 0 && itemListPlaceholder}
    </div>
  );
};

export default TodoList;
