import { useState, Fragment } from 'react';

import classes from './TodoList.module.css';
import Todo from '../../../models/todo';

import TodoItem from '../TodoItem/TodoItem';
import Button from '../../UI/Button/Button';

const TodoList: React.FC<{ title: string; items: Todo[]; showItems: boolean; onShow: (listTitle: string) => void }> =
  (props) => {
    const [endOfList, setEndOfList] = useState(3);

    const showMoreItemsHandler = () => {
      setEndOfList((prevEnd) => prevEnd + 3);
    };

    let itemsList = (
      <Fragment>
        <ul>
          {props.items.length > 0 &&
            props.items
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
        {endOfList < props.items.length - 1 && (
          <Button type='button' color='green' size='small' clickHandler={showMoreItemsHandler}>Show more edits</Button>
        )}
      </Fragment>
    );

    return (
      <div className={classes.todolist}>
        <h2>
          {props.title}
          {!props.showItems && <span onClick={props.onShow.bind(null, props.title)}>Show</span>}
        </h2>
        {props.showItems && itemsList}
        {/* <ul>
        {props.items.length > 0 && props.items.slice(0, endOfList).map(item => <TodoItem title={item.text} status={item.status} key={item.id} id={item.id}/>)}
      </ul>
      {endOfList < props.items.length -1 && <button type='button' onClick={showMoreItemsHandler}>Show more items</button>} */}
      </div>
    );
  };

export default TodoList;
