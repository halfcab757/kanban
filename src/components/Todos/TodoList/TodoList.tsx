import { useState, Fragment, useContext } from 'react';

import classes from './TodoList.module.css';
import Todo from '../../../models/todo';

import TodoItem from '../TodoItem/TodoItem';
import Button from '../../UI/Button/Button';
import ShowButton from '../../UI/ShowButton/ShowButton';
import { TodosContext } from '../../../store/todos-context';

const TodoList: React.FC<{ title: string; items: Todo[]; showItems: boolean; onShow: (listTitle: string) => void }> =
  (props) => {
    console.log('re-rendering list');
    const todosCtx = useContext(TodosContext);
    const [endOfList, setEndOfList] = useState(3);

    // use a parameter to combine the next two functions
    const showMoreItemsHandler = () => {
      setEndOfList((prevEnd) => prevEnd + 3);
    };

    const showLessItemsHandler = () => {
      setEndOfList(3);
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
        {endOfList < props.items.length && (
          // <Button type='button' color='green' size='small' clickHandler={showMoreItemsHandler}>Show more todos</Button>
          <ShowButton type='down' clickHandler={showMoreItemsHandler}/>
        )}
        {endOfList > 3 && (
          // <Button type='button' color='green' size='small' clickHandler={showLessItemsHandler}>Show less todos</Button>
          <ShowButton type='up' clickHandler={showLessItemsHandler}/>
        )}
        {props.title === 'DONE' && props.items.length > 0 && <ShowButton type='clean' clickHandler={todosCtx.deleteDoneTodos}/>}
      </Fragment>
    );

    return (
      <div className={classes.todolist}>
        <h2>
          {props.title}
          {!props.showItems && <span onClick={props.onShow.bind(null, props.title)}><i className='fas fa-arrow-circle-down'></i></span>}
        </h2>
        {props.showItems && itemsList}
      </div>
    );
  };

export default TodoList;
