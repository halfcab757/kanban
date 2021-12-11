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

  let title = <h2>{props.title}</h2>;

  // const addButton = (
  //   <Button
  //     type="button"
  //     tipText="ADD A NEW TO DO"
  //     action="START-TO-ADD"
  //     clickHandler={todosCtx.toggleAddTodo}
  //   />
  // );

  // I think i can delete this addButton

  return (
    <div className={classes.todolist}>
      {title}
      {/* {props.title === 'TO DO' && addButton} */}
      {!props.showItems && (
        <span onClick={props.onShow.bind(null, props.title)}>
          <i className="fas fa-arrow-circle-down"></i>
        </span>
      )}
      {props.showItems && itemsList}
    </div>
  );
};

export default TodoList;
