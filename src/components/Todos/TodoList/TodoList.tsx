import { useState, Fragment, useContext } from 'react';

import classes from './TodoList.module.css';
import Todo from '../../../models/todo';

import TodoItem from '../TodoItem/TodoItem';
import Button from '../../UI/Button/Button';
import ShowButton from '../../UI/ShowButton/ShowButton';
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
    items = props.items.filter(item => item.status === 'NEW');
  }

  if (props.title === 'DOING') {
    items = props.items.filter(item => item.status === 'DOING');
  }

  if (props.title === 'DONE') {
    items = props.items.filter(item => item.status === 'DONE');
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
              />
            ))}
      </ul>
      {endOfList < items.length && (
        // <Button type='button' color='green' size='small' clickHandler={showMoreItemsHandler}>Show more todos</Button>
        <ShowButton type="down" clickHandler={showMoreItemsHandler} />
      )}
      {endOfList > 3 && (
        // <Button type='button' color='green' size='small' clickHandler={showLessItemsHandler}>Show less todos</Button>
        <ShowButton type="up" clickHandler={showLessItemsHandler} />
      )}
      {props.title === 'DONE' && items.length > 0 && (
        <ShowButton type="clean" clickHandler={todosCtx.deleteDoneTodos} />
      )}
    </Fragment>
  );

  let title = <h2>{props.title}</h2>;

  const addButton = (
    <span className={classes.icon} onClick={todosCtx.toggleAddTodo}>
      <i className="fas fa-plus-circle"></i>
    </span>
  );

  return (
    <div className={classes.todolist}>
      {title}
      {props.title === 'TO DO' && addButton}
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
