import classes from './Backdrop.module.css';

const Overlay: React.FC<{onClose: () => void}> = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

export default Overlay;
