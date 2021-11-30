import classes from './Button.module.css';

// eventlistener auf todoList oder auf button - Nachteil: sehr viele Listener

const Button: React.FC<{ type: 'button' | 'submit'; clickHandler: (event: any) => void; color: 'green' | 'red' }> =
  (props) => {

    const cssClasses = `${classes.button} ${props.color === 'green' ? classes.green : classes.red}`

    return (
      <button onClick={props.clickHandler} type={props.type} className={cssClasses}>
        {props.children}
      </button>
    );
  };

export default Button;
