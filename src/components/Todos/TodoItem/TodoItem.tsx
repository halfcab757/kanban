import classes from './TodoItem.module.css';

const TodoItem: React.FC<{ title: string; status: string }> = (props) => {
  let actions = (
    <div className={classes.actions}>
      <button>Set to progress</button>
      <button>Set to done</button>
      <button>Edit</button>
    </div>
  );

  if (props.status === 'progress') {
    actions = (
      <div className={classes.actions}>
        <button>Set to done</button>
        <button>Edit</button>
      </div>
    );
  }

  if (props.status === 'done') {
    actions = (
      <div className={classes.actions}>
        <button>Move to Achievementlist</button>
      </div>
    );
  }

  return (
    <li>
      <div className={classes.item}>
        <h3>{props.title}</h3>
        {actions}
      </div>
    </li>
  );
};

export default TodoItem;
