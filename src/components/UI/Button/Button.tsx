import classes from './Button.module.css';

// eventlistener auf todoList oder auf button - Nachteil: sehr viele Listener

const Button: React.FC<{ children: string; type: 'button' | 'submit'; clickHandler: (event: any) => void; color: 'green' | 'red'; size: 'regular' | 'large' | 'small' }> =
  (props) => {
    // console.log('BUTTON gets rendered');
    const cssClasses = `${classes.button} ${props.color === 'green' ? classes.green : classes.red} ${props.size === 'large' && classes.large} ${props.size === 'small' && classes.small}`

    return (
      <button onClick={props.clickHandler} type={props.type} className={cssClasses}>
        {/* {props.children.toUpperCase()} */}
        {/* {props.children.toUpperCase() === 'EDIT' || props.children.toUpperCase() === 'DELETE TO DO' ? null : props.children.toUpperCase()}  */}
        {/* {props.children.toUpperCase() === 'DELETE TO DO' ? null : props.children.toUpperCase()}  */}
        {props.children.toUpperCase() === 'EDIT' && <span className={classes.icon}><i className='fas fa-edit'></i></span>}
        {props.children.toUpperCase() === 'MOVE TO DOING' && <span className={classes.icon}><i className="fas fa-hammer"></i></span>}
        {props.children.toUpperCase() === 'MOVE TO DONE' && <span className={classes.icon}><i className="fas fa-check-square"></i></span>}
        {props.children.toUpperCase() === 'DELETE TO DO' && <span className={classes.icon}><i className="fas fa-trash-alt"></i></span>}
        {props.children.toUpperCase() === 'ADD NEW TO DO' && <span className={classes.icon}><i className='fas fa-plus-circle'></i></span>}
        {/* {props.children.toUpperCase() === 'SHOW MORE TODOS' && <span className={classes.icon}><i className='fas fa-arrow-circle-down'></i></span>} */}
      </button>
    );
  };

export default Button;
