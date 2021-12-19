import { Fragment, useState } from 'react';

import classes from './Button.module.css';

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
    | 'DELETE'
    | 'CLEAR-LIST';
  tipText: string;
}> = (props) => {
  const [showTip, setShowTip] = useState(false);

  const displayTip = (event: any) => {
    if (!showTip) {
      setShowTip((prevState) => true);
    }
  };

  const hideTip = (event: any) => {
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
    case 'CLEAR-LIST':
      icon = <i className="fas fa-trash-alt"></i>;
      break;
    default:
      icon = <i className="fas fa-edit"></i>;
  }

  let buttonCssClasses = `${classes.button}`;

  if (props.action === 'START-TO-ADD') {
    buttonCssClasses = `${classes.button} ${classes.addBtn}`;
  }

  if (props.action === 'CONFIRM' || props.action === 'CANCEL-FORM') {
    buttonCssClasses = `${classes.button} ${classes.big}`;
  }

  if (
    props.action === 'SHOW-LIST' ||
    props.action === 'MORE' ||
    props.action === 'LESS' ||
    props.action === 'CLEAR-LIST'
  ) {
    buttonCssClasses = `${classes.button} ${classes.hugebtn}`;
  }

  let tipCssClasses = `${classes.tip}`;

  if (
    props.action === 'MORE' ||
    props.action === 'LESS' ||
    props.action === 'START-TO-ADD'
  ) {
    tipCssClasses = `${classes.tip} ${classes.bigtip}`;
  }

  if (props.action === 'EDIT' || props.action === 'CANCEL') {
    tipCssClasses = `${classes.tip} ${classes.edittip}`;
  }

  if (props.action === 'CONFIRM' || props.action === 'CANCEL-FORM') {
    tipCssClasses = `${classes.tip} ${classes.biggertip}`;
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
    <Fragment>
      <button
        onMouseOver={displayTip}
        onMouseLeave={hideTip}
        onClick={props.clickHandler}
        type={props.type}
        className={buttonCssClasses}
      >
        <span className={classes.icon}>{icon}</span>
        {showTip && tipBox}
        {/* {tipBox} */}
      </button>
    </Fragment>
  );
};

export default Button;
