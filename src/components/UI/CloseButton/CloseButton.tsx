import classes from './CloseButton.module.css';

const CloseButton: React.FC<{clickHandler: () => void}> = (props) => {
    return (
        <div className={classes.container}>
            {/* <div className={classes.close} onClick={props.clickHandler}></div> */}
            <i className="far fa-times-circle"></i>
        </div>
    );
}

export default CloseButton;
