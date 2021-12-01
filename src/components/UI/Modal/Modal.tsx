import { Fragment } from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.css';

import Backdrop from '../Backdrop/Backdrop';

const Modal: React.FC<{onClose: () => void}> = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose}/>,
        document.getElementById('backdrop-root')!
      )}
      {ReactDOM.createPortal(
        <div className={classes.modal}>{props.children}</div>,
        document.getElementById('modal-root')!
      )}
    </Fragment>
  );
};

export default Modal;
