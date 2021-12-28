import { Fragment } from 'react';
import ReactDOM from 'react-dom';

import Backdrop from '../Backdrop/Backdrop';

import classes from './Modal.module.css';

const Modal: React.FC<{onClose: () => void; background: string}> = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose}/>,
        document.getElementById('backdrop-root')!
      )}
      {ReactDOM.createPortal(
        <div className={classes.modal} style={{background: props.background}}>{props.children}</div>,
        document.getElementById('modal-root')!
      )}
    </Fragment>
  );
};

export default Modal;
