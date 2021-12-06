import classes from './Button.module.css';

// eventlistener auf todoList oder auf button - Nachteil: sehr viele Listener

const Button: React.FC<{ children: string; type: 'button' | 'submit'; clickHandler: (event: any) => void; color: 'green' | 'red'; size: 'regular' | 'large' | 'small' }> =
  (props) => {
    // console.log('BUTTON gets rendered');
    const cssClasses = `${classes.button} ${props.color === 'green' ? classes.green : classes.red} ${props.size === 'large' && classes.large} ${props.size === 'small' && classes.small}`

    return (
      <button onClick={props.clickHandler} type={props.type} className={cssClasses}>
        {props.children.toUpperCase()}
      </button>
    );
  };

export default Button;
