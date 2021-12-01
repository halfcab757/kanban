import classes from './TodoList.module.css';
import Todo from '../../../models/todo';

import TodoItem from '../TodoItem/TodoItem';

const TodoList: React.FC<{ title: string; items: Todo[] }> = (props) => {
  return (
    <div className={classes.todolist}>
      <h2>{props.title}</h2>
      <ul>
        {props.items.length > 0 && props.items.map(item => <TodoItem title={item.text} status={item.status} key={item.id} id={item.id}/>)}
      </ul>
    </div>
  );
};

export default TodoList;
