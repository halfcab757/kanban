import { Fragment, useState } from 'react';

import classes from './Button.module.css';

import Tip from '../../Todos/Tip/Tip';

// eventlistener auf todoList oder auf button - Nachteil: sehr viele Listener

const Button: React.FC<{
  type: 'button' | 'submit';
  clickHandler: (event: any) => void;
  action:
    | 'EDIT'
    | 'CANCEL'
    | 'MORE'
    | 'LESS'
    | 'FORWARDS-TO-DOING'
    | 'FORWARDS-TO-DONE'
    | 'BACKWARDS-TO-DOING'
    | 'BACKWARDS-TO-NEW'
    | 'START-TO-ADD'
    | 'ADD'
    | 'DELETE';
  tipText: string;
}> = (props) => {
  const cssClasses = `${classes.button}`;

  const [showTip, setShowTip] = useState(false);

  // use useEffect to show cancel button right from the start - mouse will be over it at start

  const displayTip = (event: any) => {
    console.log('mouse enters');
    if (!showTip) {
      setShowTip((prevState) => true);
    }
  };

  const hideTip = (event: any) => {
    console.log('mouse leaves');
    if (showTip) {
      setShowTip((prevState) => false);
    }
  };

  let icon: any;

  // Die backwards icons passen nicht ganz von der logic her

  switch (props.action) {
    case 'EDIT':
      icon = (
        <span className={classes.icon}>
          <i className="fas fa-edit"></i>
        </span>
      );
      break;
    case 'CANCEL':
      icon = (
        <span className={classes.icon}>
          <i className="far fa-times-circle"></i>
        </span>
      );
      break;
    case 'FORWARDS-TO-DOING':
      icon = (
        <span className={classes.icon}>
          <i className="fas fa-hammer"></i>
        </span>
      );
      break;
    case 'FORWARDS-TO-DONE':
      icon = (
        <span className={classes.icon}>
          <i className="fas fa-check-square"></i>
        </span>
      );
      break;
    case 'BACKWARDS-TO-DOING':
      icon = (
        <span className={classes.icon}>
          <i className="fas fa-step-backward"></i>
        </span>
      );
      break;
    case 'BACKWARDS-TO-NEW':
      icon = (
        <span className={classes.icon}>
          <i className="fas fa-fast-backward"></i>
        </span>
      );
      break;
    case 'START-TO-ADD':
      icon = (
          <span className={classes.icon}>
            <i className="fas fa-plus-circle"></i>
          </span>
      );
      break;
      case 'ADD':
        icon = (
            <span className={classes.icon}>
              <i className="fas fa-plus-circle"></i>
            </span>
        );
        break;
    case 'DELETE':
      icon = (
        <span className={classes.icon}>
          <i className="fas fa-trash-alt"></i>
        </span>
      );
      break;
    case 'MORE':
      icon = (
        <span className={classes.icon}>
          <i className="fas fa-arrow-circle-down"></i>
        </span>
      );
      break;
    case 'LESS':
      icon = (
        <span className={classes.icon}>
          <i className="fas fa-arrow-circle-up"></i>
        </span>
      );
      break;
    default:
      icon = (
        <span className={classes.icon}>
          <i className="fas fa-edit"></i>
        </span>
      );
  }

  let divClasses = `${props.action === 'START-TO-ADD' ? classes.addBtn : classes.container}`;

  return (
    <div className={divClasses}>
      <button
        // onMouseEnter={props.onEnter}
        onMouseEnter={displayTip}
        onMouseLeave={hideTip}
        onClick={props.clickHandler}
        type={props.type}
        className={cssClasses}
      >
        {icon}
        {showTip && <div className={classes.tip}>{props.tipText}</div>}
      </button>
    </div>
  );
};

export default Button;
