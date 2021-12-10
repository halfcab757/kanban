import { Fragment, useState } from 'react';

import classes from './Button.module.css';

import Tip from '../../Todos/Tip/Tip';

// eventlistener auf todoList oder auf button - Nachteil: sehr viele Listener

const Button: React.FC<{
  children: string;
  type: 'button' | 'submit';
  clickHandler: (event: any) => void;
  color: 'green' | 'red';
  size: 'regular' | 'large' | 'small';
  onEnter: () => void;
  onLeave: () => void;
  tipText: string;
}> = (props) => {
  // console.log('BUTTON gets rendered');
  const cssClasses = `${classes.button} ${
    props.color === 'green' ? classes.green : classes.red
  } ${props.size === 'large' && classes.large} ${
    props.size === 'small' && classes.small
  }`;

  const [showTip, setShowTip] = useState(false);

  // use useEffect to show cancel button right from the start - mouse will be over it at start

  const displayTip = (event: any) => {
    console.log('mouse enters');
    if(!showTip) {
      setShowTip(prevState => true);
    }
    // setShowTip((prevState) => !prevState);
  };

  const hideTip = (event: any) => {
    console.log('mouse leaves');
    if(showTip) {
      setShowTip(prevState => false);
    }
  }

  return (
    <div className={classes.container}>
      <button
        // onMouseEnter={props.onEnter}
        onMouseEnter={displayTip}
        onMouseLeave={hideTip}
        onClick={props.clickHandler}
        type={props.type}
        className={cssClasses}
      >
     
        {props.children.toUpperCase() === 'EDIT' && (
          <span className={classes.icon}>
            <i className="fas fa-edit"></i>
          </span>
        )}
        {props.children.toUpperCase() === 'MOVE TO DOING' && (
          <span className={classes.icon}>
            <i className="fas fa-hammer"></i>
          </span>
        )}
        {props.children.toUpperCase() === 'MOVE TO DONE' && (
          <span className={classes.icon}>
            <i className="fas fa-check-square"></i>
          </span>
        )}
        {props.children.toUpperCase() === 'DELETE TO DO' && (
          <span className={classes.icon}>
            <i className="fas fa-trash-alt"></i>
          </span>
        )}
        {props.children.toUpperCase() === 'ADD NEW TO DO' && (
          <span className={classes.icon}>
            <i className="fas fa-plus-circle"></i>
          </span>
        )}
        {props.children.toUpperCase() === 'ONE BACK' && (
          <span className={classes.icon}>
            <i className="fas fa-step-backward"></i>
          </span>
        )}
        {props.children.toUpperCase() === 'TWO BACK' && (
          <span className={classes.icon}>
            <i className="fas fa-fast-backward"></i>
          </span>
        )}
        {/* {props.children.toUpperCase() === 'SHOW MORE TODOS' && <span className={classes.icon}><i className='fas fa-arrow-circle-down'></i></span>} */}
      </button>
      {/* {showTip && <Tip text='EDIT THIS ITEM'/>} */}
      {showTip && <div className={classes.tip}>{props.children}</div>}
    </div>
  );
};

export default Button;
