import classes from './CloseButton.module.css';

const CloseButton: React.FC<{clickHandler: () => void; onEnter: () => void; onLeave: () => void}> = (props) => {
    return (
        <div className={classes.container} onClick={props.clickHandler} onMouseEnter={props.onEnter} onMouseLeave={props.onLeave}>
            {/* <div className={classes.close} onClick={props.clickHandler}></div> */}
            <i className="far fa-times-circle"></i>
        </div>
    );
}

export default CloseButton;
