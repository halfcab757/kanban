import { useState } from 'react';

import classes from './Button.module.css';

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
    | 'ONE-STEP-BACKWARDS-TO-NEW'
    | 'TWO-STEPS-BACKWARDS-TO-NEW'
    | 'START-TO-ADD'
    | 'ADD'
    | 'CONFIRM'
    | 'CANCEL-FORM'
    | 'SHOW-LIST'
    | 'DELETE';
  tipText: string;
}> = (props) => {
  const [showTip, setShowTip] = useState(false);

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

  switch (props.action) {
    case 'EDIT':
      icon = <i className="fas fa-edit"></i>;
      break;
    case 'CANCEL':
      icon = <i className="far fa-times-circle"></i>;
      break;
    case 'FORWARDS-TO-DOING':
      icon = <i className="fas fa-hammer"></i>;
      break;
    case 'FORWARDS-TO-DONE':
      icon = <i className="fas fa-check-square"></i>;
      break;
    case 'BACKWARDS-TO-DOING':
      icon = <i className="fas fa-step-backward"></i>;
      break;
    case 'ONE-STEP-BACKWARDS-TO-NEW':
      icon = <i className="fas fa-step-backward"></i>;
      break;
    case 'TWO-STEPS-BACKWARDS-TO-NEW':
      icon = <i className="fas fa-fast-backward"></i>;
      break;
    case 'START-TO-ADD':
      icon = <i className="fas fa-plus-circle"></i>;
      break;
    case 'ADD':
      icon = <i className="fas fa-plus-circle"></i>;
      break;
    case 'DELETE':
      icon = <i className="fas fa-trash-alt"></i>;
      break;
    case 'CONFIRM':
      icon = <i className="fas fa-check-square"></i>;
      break;
    case 'CANCEL-FORM':
      icon = <i className="far fa-times-circle"></i>;
      break;
    case 'MORE':
      icon = <i className="fas fa-arrow-circle-down"></i>;
      break;
    case 'LESS':
      icon = <i className="fas fa-arrow-circle-up"></i>;
      break;
    case 'SHOW-LIST':
      icon = <i className="fas fa-arrow-circle-down"></i>;
      break;
    default:
      icon = <i className="fas fa-edit"></i>;
  }

  let divClasses = `${classes.container}`;
  let cssClasses = `${classes.button}`;

  if (props.action === 'START-TO-ADD') {
    divClasses = `${classes.addBtn}`;
  }

  if (props.action === 'CONFIRM' || props.action === 'CANCEL-FORM') {
    divClasses = `${classes.container} ${classes.big}`;
    cssClasses = `${classes.button} ${classes.bigBtn}`;
  }

  let tipCssClasses = `${classes.tip}`;

  if (props.action === 'CONFIRM' || props.action === 'CANCEL-FORM') {
    tipCssClasses = `${classes.tip} ${classes.bigtip}`;
  }

  const tipBox = (
    <div className={tipCssClasses}>
      <div className={classes['tip-arrow-border']}>
        <div className={classes['tip-arrow-background']}></div>
      </div>
      <div>{props.tipText}</div>
    </div>
  );

  return (
    <div className={divClasses}>
      <button
        onMouseOver={displayTip}
        onMouseLeave={hideTip}
        onClick={props.clickHandler}
        type={props.type}
        className={cssClasses}
      >
        <span className={classes.icon}>{icon}</span>
        {showTip && tipBox}
      </button>
    </div>
  );
};

export default Button;
