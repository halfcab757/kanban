import classes from './TodoList.module.css';

const TodoList: React.FC<{ title: string }> = (props) => {
  return (
    <div className={classes.todolist}>
      <h2>{props.title}</h2>
      <ul>
          <li key='1'>Todo 1</li>
          <li key='2'>Todo 2</li>
      </ul>
    </div>
  );
};

export default TodoList;
